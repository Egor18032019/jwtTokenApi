package com.jwt.api.controller;

import com.jwt.api.model.User;
import com.jwt.api.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {
    final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public Map<String, Object> getUserName(HttpServletRequest request) {
        System.out.println("          getUserName ");
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        final String userAgentHeader = request.getHeader("User-Agent");

        User user = userRepository.findUserByUsername(username);
        System.out.println("userAgentHeader " + userAgentHeader);


        Map<String, Object> userMap = new HashMap<>();
        boolean isSameUser = user.getAgent().equals(userAgentHeader);
        if (isSameUser) {
            userMap.put("username", username);
            userMap.put("error", false);
        } else {
            //TODO при несовпадение jwt токена и UserAgenta удаляем jwtToken
            user.setAgent("");
            userRepository.save(user);
            userMap.put("username", "Ты не пройдешь !");
            userMap.put("error", true);
        }

        return userMap;
    }
}