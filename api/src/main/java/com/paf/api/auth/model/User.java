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
    @CollectionTable(name = "user_followers", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "follower_id")
    @OrderColumn(name = "order_index")
    private List<Integer> followers;

    @ElementCollection
    @CollectionTable(name = "user_followings", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "following_id")
    @OrderColumn(name = "order_index")
    private List<Integer> followings;

    public User(){
        this.isAdmin = false;
    }
}
