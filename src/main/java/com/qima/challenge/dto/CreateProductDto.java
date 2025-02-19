package com.qima.challenge.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

@Schema(description = "Product Data Transfer Object")
public class CreateProductDto {
    @Schema(description = "Unique identifier of the product", example = "1")
    private Long id;

    @Schema(description = "Name of the product", required = true, example = "MacBook Pro")
    @NotNull(message = "Name cannot be null")
    @Size(min = 2, max = 255, message = "Name must be between 2 and 255 characters")
    private String name;

    @Schema(description = "Product description", example = "High-performance laptop")
    @Size(max = 1000, message = "Description cannot exceed 1000 characters")
    private String description;

    @Schema(description = "Price of the product", required = true, example = "1999.99")
    @NotNull(message = "Price cannot be null")
    @DecimalMin(value = "0.0", message = "Price must be positive")
    private BigDecimal price;

    @Schema(description = "Product availability status", example = "true")
    private Boolean available;

    @Schema(description = "Unique Stock Keeping Unit", example = "APPLE-MBP-001")
    @Pattern(regexp = "^[A-Z]{3,5}-[A-Z]{2,3}-\\d{3,4}$",
            message = "SKU must be in format XXX-YY-123")
    private String sku;
}