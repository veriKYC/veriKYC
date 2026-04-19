package com.verikyc.backend.service;

import com.verikyc.backend.dto.DocumentSummaryResponse;
import com.verikyc.backend.entity.DocumentEntity;
import com.verikyc.backend.entity.UserEntity;
import com.verikyc.backend.repository.DocumentRepository;
import com.verikyc.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class DocumentService {

    private final DocumentRepository documentRepository;
    private final UserRepository userRepository;
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

        return new DocumentSummaryResponse(
                saved.getId(),
                saved.getDocumentType(),
                saved.getStatus(),
                saved.getCreatedAt(),
                saved.getUpdatedAt()
        );
    }
}