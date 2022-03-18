package com.jwt.api.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("users")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    private String userName;

    private String firstName;
    private String lastName;
    @Indexed(unique = true)
    private String email;
    private String password;
    private String role;
    private String agent;

    @Override
    public String toString() {
        return "User{" +
                "userName='" + userName + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", agent='" + agent + '\'' +
                ", role='" + role + '\'' +
                '}';
    }
}
