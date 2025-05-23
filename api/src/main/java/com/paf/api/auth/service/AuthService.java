package com.paf.api.auth.service;

import com.paf.api.auth.dto.AuthResponse;
import com.paf.api.auth.dto.LoginRequest;
import com.paf.api.auth.dto.UserRequest;
import com.paf.api.auth.model.User;
import com.paf.api.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JWTService jwtService;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(10);

    public AuthResponse login(LoginRequest loginRequest){

        Authentication authentication =
                authManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.email(), loginRequest.password()));

        if(authentication.isAuthenticated()){
            String token = jwtService.generateToken(loginRequest.email());

            Optional<User> opUser = userRepository.findByEmail(loginRequest.email());
            User authUser = new User();
            authUser.setId(opUser.get().getId());
            authUser.setFirstName(opUser.get().getFirstName());
            authUser.setLastName(opUser.get().getLastName());
            authUser.setGender(opUser.get().getGender());
            authUser.setEmail(opUser.get().getEmail());
            authUser.setProfilePicture(opUser.get().getProfilePicture());
            authUser.setFollowers(opUser.get().getFollowers());
            authUser.setFollowings(opUser.get().getFollowings());
            authUser.setAdmin(opUser.get().isAdmin());


            return new AuthResponse(token, "Authentication successful", authUser);
        }

        return new AuthResponse(null, "Authentication failed", null);
    }

    public AuthResponse registerUser(UserRequest userRequest) throws Exception {

        Optional<User> isExist = userRepository.findByEmail(userRequest.email());

        if(isExist.isPresent()){
            throw new Exception("User with email " + userRequest.email() + " already exists");
        }

        User newUser = new User();
        newUser.setFirstName(userRequest.firstName());
        newUser.setLastName(userRequest.lastName());
        newUser.setGender(userRequest.gender());
        newUser.setEmail(userRequest.email());

        newUser.setPassword(encoder.encode(userRequest.password()));

        User savedUser = userRepository.save(newUser);

        Authentication authentication =
                authManager.authenticate(new UsernamePasswordAuthenticationToken(savedUser.getEmail(), userRequest.password()));

        String token = null;
        if(authentication.isAuthenticated())
            token = jwtService.generateToken(savedUser.getEmail());
        else
            throw new Exception("Authentication failed in user registration");

        User authUser = new User();
        authUser.setId(savedUser.getId());
        authUser.setFirstName(savedUser.getFirstName());
        authUser.setLastName(savedUser.getLastName());
        authUser.setGender(savedUser.getGender());
        authUser.setEmail(savedUser.getEmail());
        authUser.setAdmin(savedUser.isAdmin());

        AuthResponse res = new AuthResponse(token, "Registration successful", authUser);

        return res;
    }

    public AuthResponse loginWithGoogle(UserRequest userRequest) {
        Optional<User> existingUser = userRepository.findByEmail(userRequest.email());
        User user;

        if (existingUser.isPresent()) {
            user = existingUser.get();
        } else {
            // Create a new user with default values from Google
            user = new User();
            user.setFirstName(userRequest.firstName()); // set full name into firstName
            user.setLastName(""); // optional: split name if needed
            user.setEmail(userRequest.email());
            user.setProfilePicture(userRequest.profilePicture());
            user = userRepository.save(user);
        }

        // Generate token
        String token = jwtService.generateToken(user.getEmail());

        return new AuthResponse(token, "Google OAuth successful", user);
    }

}
