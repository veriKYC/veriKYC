package com.verikyc.backend.service;

import com.verikyc.backend.dto.DocumentDetailResponse;
import com.verikyc.backend.dto.DocumentSummaryResponse;
import com.verikyc.backend.dto.PageResponse;
import com.verikyc.backend.dto.VerificationResultResponse;
import com.verikyc.backend.entity.DocumentEntity;
import com.verikyc.backend.entity.UserEntity;
import com.verikyc.backend.entity.VerificationResultEntity;
import com.verikyc.backend.exception.DocumentNotFoundException;
import com.verikyc.backend.repository.DocumentRepository;
import com.verikyc.backend.repository.UserRepository;
import com.verikyc.backend.repository.VerificationResultRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DocumentService {

    private final DocumentRepository documentRepository;
    private final UserRepository userRepository;
    private final VerificationResultRepository verificationResultRepository;
    private final StorageService storageService;

    public DocumentSummaryResponse upload(MultipartFile document, MultipartFile selfie, String ownerEmail) throws IOException {
        UserEntity owner = userRepository.findByEmail(ownerEmail);
        if (owner == null) {
            throw new UsernameNotFoundException("User not found: " + ownerEmail);
        }

        String imageUrl = storageService.store(document);
        String selfieUrl = (selfie != null && !selfie.isEmpty()) ? storageService.store(selfie) : null;

        LocalDateTime now = LocalDateTime.now();
        DocumentEntity entity = DocumentEntity.builder()
                .owner(owner)
                .imageUrl(imageUrl)
                .selfieUrl(selfieUrl)
                .createdAt(now)
                .updatedAt(now)
                .build();

        DocumentEntity saved = documentRepository.save(entity);

        return toSummary(saved);
    }

    @Transactional(readOnly = true)
    public PageResponse<DocumentSummaryResponse> listDocuments(String ownerEmail, boolean isAdmin, int page, int size) {
        PageRequest pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));

        Page<DocumentEntity> resultPage;
        if (isAdmin) {
            resultPage = documentRepository.findAll(pageable);
        } else {
            UserEntity owner = userRepository.findByEmail(ownerEmail);
            if (owner == null) throw new UsernameNotFoundException("User not found: " + ownerEmail);
            resultPage = documentRepository.findByOwnerId(owner.getId(), pageable);
        }

        List<DocumentSummaryResponse> content = resultPage.getContent().stream()
                .map(this::toSummary)
                .toList();

        return new PageResponse<>(content, resultPage.getNumber(), resultPage.getSize(),
                resultPage.getTotalElements(), resultPage.getTotalPages());
    }

    @Transactional(readOnly = true)
    public DocumentDetailResponse getDocumentById(String id, String ownerEmail, boolean isAdmin) {
        DocumentEntity doc = documentRepository.findById(id)
                .orElseThrow(() -> new DocumentNotFoundException("Document not found: " + id));

        if (!isAdmin && !doc.getOwner().getEmail().equals(ownerEmail)) {
            throw new AccessDeniedException("Access denied");
        }

        return toDetail(doc);
    }

    @Transactional(readOnly = true)
    public VerificationResultResponse getVerificationResults(String id, String ownerEmail, boolean isAdmin) {
        DocumentEntity doc = documentRepository.findById(id)
                .orElseThrow(() -> new DocumentNotFoundException("Document not found: " + id));

        if (!isAdmin && !doc.getOwner().getEmail().equals(ownerEmail)) {
            throw new AccessDeniedException("Access denied");
        }

        VerificationResultEntity result = verificationResultRepository.findByDocumentId(id)
                .orElseThrow(() -> new DocumentNotFoundException("Results not yet available for document: " + id));

        return new VerificationResultResponse(
                result.getId(),
                doc.getId(),
                result.getExtractedFields(),
                result.getConfidenceScores(),
                result.getQualityScore(),
                result.getFaceMatchScore(),
                result.getTamperScore(),
                result.getCreatedAt()
        );
    }

    private DocumentSummaryResponse toSummary(DocumentEntity doc) {
        return new DocumentSummaryResponse(doc.getId(), doc.getDocumentType(),
                doc.getStatus(), doc.getCreatedAt(), doc.getUpdatedAt());
    }

    private DocumentDetailResponse toDetail(DocumentEntity doc) {
        return new DocumentDetailResponse(doc.getId(), doc.getDocumentType(),
                doc.getStatus(), doc.getImageUrl(), doc.getSelfieUrl(),
                doc.getCreatedAt(), doc.getUpdatedAt());
    }
}
