package com.verikyc.backend.controller;

import com.verikyc.backend.dto.DocumentDetailResponse;
import com.verikyc.backend.dto.DocumentSummaryResponse;
import com.verikyc.backend.dto.PageResponse;
import com.verikyc.backend.dto.VerificationResultResponse;
import com.verikyc.backend.service.DocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/documents")
@RequiredArgsConstructor
public class DocumentController {

    private final DocumentService documentService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<DocumentSummaryResponse> uploadDocument(
            @RequestPart("document") MultipartFile document,
            @RequestPart(value = "selfie", required = false) MultipartFile selfie,
            @AuthenticationPrincipal UserDetails userDetails) throws IOException {

        DocumentSummaryResponse response = documentService.upload(document, selfie, userDetails.getUsername());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<PageResponse<DocumentSummaryResponse>> listDocuments(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @AuthenticationPrincipal UserDetails userDetails) {

        boolean isAdmin = userDetails.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        return ResponseEntity.ok(documentService.listDocuments(userDetails.getUsername(), isAdmin, page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DocumentDetailResponse> getDocumentById(
            @PathVariable String id,
            @AuthenticationPrincipal UserDetails userDetails) {

        boolean isAdmin = userDetails.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        return ResponseEntity.ok(documentService.getDocumentById(id, userDetails.getUsername(), isAdmin));
    }

    @GetMapping("/{id}/results")
    public ResponseEntity<VerificationResultResponse> getVerificationResults(
            @PathVariable String id,
            @AuthenticationPrincipal UserDetails userDetails) {

        boolean isAdmin = userDetails.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        return ResponseEntity.ok(documentService.getVerificationResults(id, userDetails.getUsername(), isAdmin));
    }
}