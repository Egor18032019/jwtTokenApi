package com.jwt.api.service;



import com.jwt.api.model.User;
import com.jwt.api.repository.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    final UserRepository userRepository;

    public JwtUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("username " + username);
        User user = userRepository.findUserByUsername(username);
        System.out.println(" user" + user.toString());
        List<GrantedAuthority> authorityList = new ArrayList<>();
        authorityList.add(new SimpleGrantedAuthority("USER_ROLE"));
        // !!! Создаем нашего юзера, отдаем секретного.
        return new org.springframework.security.core.userdetails.User(
                user.getUserName(),
                user.getPassword(),
                authorityList
        );
    }

    public UserDetails createUserDetails(String username, String password) {
        List<GrantedAuthority> authorityList = new ArrayList<>();
        authorityList.add(new SimpleGrantedAuthority("USER_ROLE"));
        return new org.springframework.security.core.userdetails.User(username, password, authorityList);
    }
}