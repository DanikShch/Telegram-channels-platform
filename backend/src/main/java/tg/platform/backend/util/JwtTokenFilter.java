package tg.platform.backend.util;

import tg.platform.backend.util.JwtUtil;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Enumeration;

public class JwtTokenFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    public JwtTokenFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        System.out.println("Request URL: " + request.getRequestURL());
        System.out.println("Request Method: " + request.getMethod());

        // Логируем ВСЕ заголовки
        System.out.println("Request Headers:");
        Enumeration<String> headerNames = request.getHeaderNames();
        while (headerNames.hasMoreElements()) {
            String headerName = headerNames.nextElement();
            String headerValue = request.getHeader(headerName);
            System.out.println(headerName + ": " + headerValue);
        }

        // Получаем Authorization заголовок
        String token = request.getHeader("Authorization");

        if (token == null || !token.startsWith("Bearer ")) {
            System.out.println("No valid Authorization header found");
        } else {
            token = token.substring("Bearer ".length());
            System.out.println("Extracted token: " + token);

            if (jwtUtil.getUserId(token) != null && !jwtUtil.isTokenExpired(token)) {
                System.out.println("Token is valid for user: " + jwtUtil.getUserId(token));
                SecurityContextHolder.getContext().setAuthentication(
                        new JwtAuthenticationToken(jwtUtil.getUserId(token))
                );
            } else {
                System.out.println("Token is invalid or expired");
            }
        }

        filterChain.doFilter(request, response);
    }

}