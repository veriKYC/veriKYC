package com.verikyc.backend.dto;

import com.verikyc.backend.enums.RolesEnum;

import java.time.LocalDateTime;

public record UserResponse(
        String id,
        String email,
        RolesEnum role,
        LocalDateTime createdAt
) {
}
