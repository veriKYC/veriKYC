package com.verikyc.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Map;

public record VerificationResultResponse(
        String id,
        String documentId,
        Map<String, Object> extractedFields,
        Map<String, BigDecimal> confidenceScores,
        BigDecimal qualityScore,
        BigDecimal faceMatchScore,
        BigDecimal tamperScore,
        LocalDateTime createdAt
) {
}