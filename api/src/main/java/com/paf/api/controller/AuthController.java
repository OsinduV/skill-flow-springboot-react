package com.paf.api.controller;

import com.paf.api.dto.AuthResponse;
import com.paf.api.dto.LoginRequest;
import com.paf.api.dto.UserRequest;
import com.paf.api.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public AuthResponse loginUser(@RequestBody LoginRequest loginRequest) {
        return authService.login(loginRequest);
    }

    @PostMapping("/signup")
    public AuthResponse registerUser(@RequestBody UserRequest userRequest) throws Exception {
        return authService.registerUser(userRequest);
    }
}
