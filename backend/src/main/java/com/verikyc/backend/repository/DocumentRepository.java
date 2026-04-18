package com.verikyc.backend.repository;

import com.verikyc.backend.entity.DocumentEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DocumentRepository extends JpaRepository<DocumentEntity, String> {

    Page<DocumentEntity> findByOwnerId(String ownerId, Pageable pageable);
}