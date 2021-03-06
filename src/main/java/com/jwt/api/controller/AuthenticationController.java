package com.jwt.api.controller;

import com.jwt.api.model.User;
import com.jwt.api.repository.UserRepository;
import com.jwt.api.service.JwtUserDetailsService;
import com.jwt.api.util.JwtTokenUtil;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    protected final Log logger = LogFactory.getLog(getClass());

    final UserRepository userRepository;
    final AuthenticationManager authenticationManager;
    final JwtUserDetailsService userDetailsService;
    final JwtTokenUtil jwtTokenUtil;

    public AuthenticationController(UserRepository userRepository,
                                    AuthenticationManager authenticationManager,
                                    JwtUserDetailsService userDetailsService,
                                    JwtTokenUtil jwtTokenUtil) {
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(HttpServletRequest request,
            @RequestParam("user_name") String username,
                                       @RequestParam("password") String password) {
        Map<String, Object> responseMap = new HashMap<>();
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            username, password
                    ));
            if (auth.isAuthenticated()) {
                logger.info("Logged In");
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                User user = userRepository.findUserByUsername(username);
                final String userAgentHeader = request.getHeader("User-Agent");
                final String remoteAddr = request.getHeader("X-FORWARDED-FOR");
                System.out.println("userAgentHeader "+ userAgentHeader + "  remoteAddr  " + remoteAddr);
                user.setAgent(userAgentHeader);
                userRepository.save(user);
                String token = jwtTokenUtil.generateToken(userDetails);
                responseMap.put("error", false);
                responseMap.put("message", "Logged In");
                responseMap.put("token", token);
                return ResponseEntity.ok(responseMap);
            } else {
                responseMap.put("error", true);
                responseMap.put("message", "Invalid Credentials");
                return ResponseEntity.status(401).body(responseMap);
            }
        } catch (DisabledException e) {
            e.printStackTrace();
            responseMap.put("error", true);
            responseMap.put("message", "User is disabled");
            return ResponseEntity.status(500).body(responseMap);
        } catch (BadCredentialsException e) {
            responseMap.put("error", true);
            responseMap.put("message", "Invalid Credentials");
            return ResponseEntity.status(401).body(responseMap);
        } catch (Exception e) {
            e.printStackTrace();
            responseMap.put("error", true);
            responseMap.put("message", "Something went wrong");
            return ResponseEntity.status(500).body(responseMap);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> saveUser(@RequestParam("first_name") String firstName,
                                      @RequestParam("last_name") String lastName,
                                      @RequestParam("user_name") String userName, @RequestParam("email") String email
            , @RequestParam("password") String password) {
        System.out.println("first_name " + firstName + " lastName " + lastName + " userName " + userName + " email " + email + " password " + password);
        // TODO ?????????????????? ?????????? ?????? ???????????? ?
        Map<String, Object> responseMap = new HashMap<>();
        boolean isNewUser = userRepository.existsById(userName);
        if (!isNewUser) {
            User user = new User();
            user.setFirstName(firstName);
            user.setLastName(lastName);
            user.setEmail(email);
            user.setPassword(new BCryptPasswordEncoder().encode(password));
            user.setRole("USER");
            user.setUserName(userName);

            UserDetails userDetails = userDetailsService.createUserDetails(userName, user.getPassword());
            String token = jwtTokenUtil.generateToken(userDetails);

            userRepository.save(user);
            System.out.println("save? " + userRepository.save(user));


            responseMap.put("error", false);
            responseMap.put("username", userName);
            responseMap.put("message", "Account created successfully");
            responseMap.put("token", token);
            return ResponseEntity.status(200).body(responseMap);
        } else {
            responseMap.put("error", true);
            responseMap.put("username", userName);
            responseMap.put("message", "Already have this username.");
            responseMap.put("token", null);
            return ResponseEntity.status(401).body(responseMap);
        }


    }
}