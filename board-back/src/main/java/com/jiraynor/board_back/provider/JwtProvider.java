package com.jiraynor.board_back.provider;

import java.time.temporal.ChronoUnit; // 추가하기
import java.time.Instant; // 추가하기
import java.util.Date; // 추가하기

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims; // 추가하기 
import io.jsonwebtoken.Jwts; // 추가하기 
import io.jsonwebtoken.SignatureAlgorithm; // 추가하기 

@Component
public class JwtProvider {

    @Value("${secret-key}")
    private String secretKey;

    // jwt 생성 메서드
    public String create(String email) {

        Date expiredDate = Date.from(Instant.now().plus(100, ChronoUnit.HOURS));

        String jwt = Jwts.builder()
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .setSubject(email).setIssuedAt(new Date()).setExpiration(expiredDate)
                .compact();

        return jwt;

    }

    // jwt 검증 메서드
    public String validate(String jwt) {
        Claims claims = null;

        try {
            claims = Jwts.parser().setSigningKey(secretKey)
                    .parseClaimsJws(jwt).getBody();
        } catch (Exception exception) {
            System.out.println("JWT validation failed: " + exception.getMessage());
            exception.printStackTrace();
            return null;
        }

        return claims.getSubject();
    }

}
