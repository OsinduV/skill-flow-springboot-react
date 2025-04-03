package com.paf.api.dto;

public record UserRequest(int id, String firstName, String lastName, String gender, String email, String password, String profilePicture) {
}
