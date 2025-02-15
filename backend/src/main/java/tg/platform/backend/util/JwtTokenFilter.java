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
        System.out.println("Request Headers:");
        Enumeration<String> headerNames = request.getHeaderNames();
        while (headerNames.hasMoreElements()) {
            String headerName = headerNames.nextElement();
            String headerValue = request.getHeader(headerName);
            System.out.println(headerName + ": " + headerValue);
        }
        String token = request.getHeader("Authorization");
        System.out.println(token);

        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring("Bearer ".length()); // Убираем "Bearer "
            System.out.println("token with bearer");
            if (jwtUtil.getUsername(token) != null && !jwtUtil.isTokenExpired(token)) {
                // Устанавливаем аутентификацию в SecurityContext
                SecurityContextHolder.getContext().setAuthentication(
                        new JwtAuthenticationToken(jwtUtil.getUsername(token))
                );
            }
        }

        filterChain.doFilter(request, response);
    }


}