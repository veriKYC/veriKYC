package com.verikyc.backend.repository;

import com.verikyc.backend.entity.VerificationResultEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VerificationResultRepository extends JpaRepository<VerificationResultEntity, String> {

    Optional<VerificationResultEntity> findByDocumentId(String documentId);
}