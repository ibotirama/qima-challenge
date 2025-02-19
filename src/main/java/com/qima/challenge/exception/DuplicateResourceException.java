package com.qima.challenge.exception;

public class DuplicateResourceException extends RuntimeException {
    public DuplicateResourceException(String message) {
        super(message);
    }

    public DuplicateResourceException(String resourceName, String identifier) {
        super(String.format("%s already exists with identifier: %s", resourceName, identifier));
    }
}
