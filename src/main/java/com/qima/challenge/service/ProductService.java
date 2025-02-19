package com.qima.challenge.service;

import com.qima.challenge.domain.Product;
import com.qima.challenge.dto.ProductDto;
import com.qima.challenge.dto.ProductFilter;
import com.qima.challenge.exception.DuplicateResourceException;
import com.qima.challenge.exception.ResourceNotFoundException;
import com.qima.challenge.repository.ProductRepository;
import com.qima.challenge.specification.ProductSpecification;
import com.qima.challenge.util.ValidationUtil;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final ProductSpecification productSpecification;
    private final ModelMapper modelMapper = new ModelMapper();

    public Page<ProductDto> findProducts(
            ProductFilter filter,
            Pageable pageable
    ) {
        Specification<Product> spec = productSpecification.filterProducts(filter);

        Page<Product> productPage = productRepository.findAll(spec, pageable);

        return productPage.map(product ->
                modelMapper.map(product, ProductDto.class)
        );
    }

    public ProductDto findById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Product",
                        id
                ));

        return modelMapper.map(product, ProductDto.class);
    }

    public ProductDto createProduct(ProductDto productDto) {
        // Validate input
        ValidationUtil.validateInput(productDto);

        // Check for duplicate SKU
        if (productRepository.findBySku(productDto.getSku()).isPresent()) {
            throw new DuplicateResourceException(
                    "Product",
                    "SKU " + productDto.getSku()
            );
        }

        Product product = modelMapper.map(productDto, Product.class);
        Product savedProduct = productRepository.save(product);

        return modelMapper.map(savedProduct, ProductDto.class);
    }

    public ProductDto updateProduct(Long id, ProductDto productDto) {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        // Update fields
        modelMapper.map(productDto, existingProduct);

        Product updatedProduct = productRepository.save(existingProduct);

        return modelMapper.map(updatedProduct, ProductDto.class);
    }

    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        productRepository.delete(product);
    }
}

