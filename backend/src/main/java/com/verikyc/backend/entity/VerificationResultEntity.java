package com.verikyc.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Map;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "verification_results")
public class VerificationResultEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @NotNull
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "document_id", nullable = false, unique = true)
    private DocumentEntity document;

    @NotNull
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "extracted_fields", nullable = false, columnDefinition = "jsonb")
    @Builder.Default
    private Map<String, Object> extractedFields = new java.util.HashMap<>();

    @NotNull
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "confidence_scores", nullable = false, columnDefinition = "jsonb")
    @Builder.Default
    private Map<String, BigDecimal> confidenceScores = new java.util.HashMap<>();

    @Column(name = "quality_score", precision = 5, scale = 4)
    private BigDecimal qualityScore;

    @Column(name = "face_match_score", precision = 5, scale = 4)
    private BigDecimal faceMatchScore;

    @Column(name = "tamper_score", precision = 5, scale = 4)
    private BigDecimal tamperScore;

    @NotNull
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
}