package com.paf.api.dto;

import java.util.List;

public record GetUsersResponse(List<UserResponse> users, long totalUsers) {
}
