package com.qima.challenge.specification;

import com.qima.challenge.domain.Product;
import com.qima.challenge.dto.ProductFilter;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ProductSpecification {
    public Specification<Product> filterProducts(ProductFilter filter) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (filter.getName() != null && !filter.getName().isEmpty()) {
                predicates.add(criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("name")),
                        "%" + filter.getName().toLowerCase() + "%"
                ));
            }

            if (filter.getMinPrice() != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(
                        root.get("price"), filter.getMinPrice()
                ));
            }

            if (filter.getMaxPrice() != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(
                        root.get("price"), filter.getMaxPrice()
                ));
            }

            if (filter.getCategoryId() != null) {
                predicates.add(criteriaBuilder.equal(
                        root.get("category").get("id"), filter.getCategoryId()
                ));
            }

            if (filter.getAvailable() != null) {
                predicates.add(criteriaBuilder.equal(
                        root.get("available"), filter.getAvailable()
                ));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
