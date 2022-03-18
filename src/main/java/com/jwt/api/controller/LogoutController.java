package com.jwt.api.controller;

import com.jwt.api.model.User;
import com.jwt.api.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/disconect")
public class LogoutController {
    final UserRepository userRepository;

    public LogoutController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public Map<String, Object> logout() {
        System.out.println("logout ");
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userRepository.findUserByUsername(username);
        user.setAgent("");
        userRepository.save(user);
        //TODO при логауте надо удалять jwtTOken

        Map<String, Object> userMap = new HashMap<>();
        userMap.put("username", "NoHave");
        userMap.put("error", false);
        return userMap;
    }
}
