package com.verikyc.backend.service;

import com.verikyc.backend.dto.AuthResponse;
import com.verikyc.backend.dto.LoginRequest;
import com.verikyc.backend.dto.RegisterRequest;
import com.verikyc.backend.dto.UserResponse;
import com.verikyc.backend.entity.UserEntity;
import com.verikyc.backend.enums.RolesEnum;
import com.verikyc.backend.exception.EmailAlreadyExistsException;
import com.verikyc.backend.exception.InvalidCredentialsException;
import com.verikyc.backend.repository.UserRepository;
import com.verikyc.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Value("${jwt.expiry-seconds}")
    private long jwtExpirySecond;

    public AuthResponse register(RegisterRequest registerRequest) {
        // todo
        UserEntity entity = userRepository.findByEmail(registerRequest.email());
        if(entity != null){
           throw new EmailAlreadyExistsException("User already exist with email id: " + registerRequest.email());
        }
        String passwordHash = passwordEncoder.encode(registerRequest.password());

        entity = UserEntity.builder()
                .email(registerRequest.email())
                .passwordHash(passwordHash)
                .role(RolesEnum.USER)
                .createdAt(LocalDateTime.now())
                .build();

        UserEntity savedEntity = userRepository.save(entity);

        String token = jwtUtil.generateToken(savedEntity);

        return new AuthResponse(
            token,
            "Bearer",
            jwtExpirySecond,
            new UserResponse(
            savedEntity.getId(),
            savedEntity.getEmail(),
            savedEntity.getRole(),
            savedEntity.getCreatedAt()
            )
        );

    }

    public AuthResponse loginUser(LoginRequest loginRequest) {
        // todo
        UserEntity entity = userRepository.findByEmail(loginRequest.email());
        if(entity == null){
            throw  new InvalidCredentialsException("User not found with email " + loginRequest.email());
        }
        if(!passwordEncoder.matches(loginRequest.password(), entity.getPasswordHash())){
            throw   new InvalidCredentialsException("Invalid password");
        }

        return new AuthResponse(
                jwtUtil.generateToken(entity),
                "Bearer",
                jwtExpirySecond,
                new UserResponse(
                        entity.getId(),
                        entity.getEmail(),
                        entity.getRole(),
                        entity.getCreatedAt()
                )
        );
    }
}
