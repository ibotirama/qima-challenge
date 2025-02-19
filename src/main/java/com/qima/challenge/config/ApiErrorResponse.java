package com.qima.challenge.config;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "API Error Response")
public class ApiErrorResponse {
    @Schema(description = "HTTP status code", example = "400")
    private HttpStatus status;
    @Schema(description = "Error message", example = "Validation failed")
    private String message;
    @Schema(description = "List of specific error details")
    private List<String> errors;
    @Schema(description = "Timestamp of the error", example = "2023-06-15T10:30:15.123Z")
    private LocalDateTime timestamp;

    public ApiErrorResponse(HttpStatus status, String message) {
        this.status = status;
        this.message = message;
        this.timestamp = LocalDateTime.now();
    }

    public ApiErrorResponse(HttpStatus status, String message, List<String> errors) {
        this.status = status;
        this.message = message;
        this.errors = errors;
        this.timestamp = LocalDateTime.now();
    }
}
