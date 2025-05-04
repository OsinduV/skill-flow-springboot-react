package com.paf.api.auth.dto;

import java.util.List;

public record GetUsersResponse(List<UserResponse> users, long totalUsers) {
}
