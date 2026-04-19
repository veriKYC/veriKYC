package com.verikyc.backend.dto;

import com.verikyc.backend.enums.DocumentStatusEnum;
import com.verikyc.backend.enums.DocumentTypeEnum;

import java.time.LocalDateTime;

public record DocumentDetailResponse(
        String id,
        DocumentTypeEnum documentType,
        DocumentStatusEnum status,
        String imageUrl,
        String selfieUrl,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}