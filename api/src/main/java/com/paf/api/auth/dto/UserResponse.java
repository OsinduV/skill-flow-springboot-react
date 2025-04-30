package com.paf.api.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private Integer id;
    private String firstName;
    private String lastName;
    private String gender;
    private String email;
    private String profilePicture;
    private List<Integer> followers;
    private List<Integer> followings;
    private boolean isAdmin;
}
