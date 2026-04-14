package com.verikyc.backend.dto;

import lombok.Builder;

public record AuthResponse (
        String accessToken,
        String tokenType,
        long expiresInSeconds,
        UserResponse user
){
}
