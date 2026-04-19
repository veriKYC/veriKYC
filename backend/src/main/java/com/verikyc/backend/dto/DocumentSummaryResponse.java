package com.verikyc.backend.dto;

import com.verikyc.backend.enums.DocumentStatusEnum;
import com.verikyc.backend.enums.DocumentTypeEnum;

import java.time.LocalDateTime;

public record DocumentSummaryResponse(
        String id,
        DocumentTypeEnum documentType,
        DocumentStatusEnum status,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}