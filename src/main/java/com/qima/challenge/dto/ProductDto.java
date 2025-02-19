package com.qima.challenge.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {
    private Long id;
    @NotNull(message = "Name cannot be null")
    @Size(min = 2, max = 255, message = "Name must be between 2 and 255 characters")
    private String name;
    @Size(max = 1000, message = "Description cannot exceed 1000 characters")
    private String description;
    @NotNull(message = "Price cannot be null")
    @DecimalMin(value = "0.0", message = "Price must be positive")
    private BigDecimal price;
    private CategoryDto category;
    @Pattern(regexp = "^[A-Z]{3}-\\d{3,4}$", message = "SKU must be in format XXX-123")
    private String sku;
    @Min(value = 0, message = "Stock quantity cannot be negative")
    private Integer stockQuantity;
    private Boolean available;
    private String imageUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
