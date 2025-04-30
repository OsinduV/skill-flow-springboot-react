package com.paf.api.auth.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;


@Entity
@Table(name = "users")
@Getter
@Setter
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String firstName;
    private String lastName;
    private String gender;
    private String email;
    private String password;
    private String profilePicture;
    private boolean isAdmin;

    @ElementCollection
    private List<Integer> followers;

    @ElementCollection
    private List<Integer> followings;

    public User(){
        this.isAdmin = false;
    }
}
