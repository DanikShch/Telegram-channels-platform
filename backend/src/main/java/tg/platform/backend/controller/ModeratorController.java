package tg.platform.backend.controller;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonWriter;
import jakarta.servlet.http.HttpServletResponse;


import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import tg.platform.backend.dto.PasswordRequest;

@RestController
@RequestMapping("/api")
public class ModeratorController {

  private static final String MODERATOR_PASSWORD = "supersecretpassword"; // можешь потом вынести в .properties

  @PostMapping("/verify-moderator-password")
  public void verifyModeratorPassword(@RequestBody PasswordRequest passwordRequest,
                                      HttpServletResponse response) throws IOException {
    String password = passwordRequest.getPassword();

    if (MODERATOR_PASSWORD.equals(password)) {
      response.setStatus(HttpStatus.OK.value());

      JsonObject json = Json.createObjectBuilder()
              .add("moderator", true)
              .build();

      try (JsonWriter writer = Json.createWriter(response.getWriter())) {
        writer.write(json);
      }
    } else {
      response.setStatus(HttpStatus.FORBIDDEN.value());

      JsonObject json = Json.createObjectBuilder()
              .add("error", "Invalid password")
              .build();

      try (JsonWriter writer = Json.createWriter(response.getWriter())) {
        writer.write(json);
      }
    }
  }
}

