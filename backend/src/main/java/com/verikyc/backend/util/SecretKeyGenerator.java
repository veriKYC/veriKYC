package com.verikyc.backend.util;

import java.util.Base64;
import java.security.SecureRandom;

public class SecretKeyGenerator {

    public static void main(String[] args) {
        // 1. Generate a secure random 32-byte key (256 bits)
        SecureRandom random = new SecureRandom();
        byte[] keyBytes = new byte[32];
        random.nextBytes(keyBytes);

        // 2. Encode the byte array into a Base64 string
        String encodedKey = Base64.getEncoder().encodeToString(keyBytes);

        // 3. Print the key
        System.out.println("Generated Base64 Encoded Secret Key:");
        System.out.println(encodedKey);
        System.out.println("\nCopy this key and paste it into your application.yml or application.properties as 'jwt.secret'");
    }
}
