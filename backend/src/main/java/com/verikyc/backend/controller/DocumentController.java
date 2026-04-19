package com.verikyc.backend.controller;

import com.verikyc.backend.dto.DocumentSummaryResponse;
import com.verikyc.backend.service.DocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
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
}