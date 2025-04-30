package com.paf.api.auth.service;

import com.paf.api.auth.model.User;
import com.paf.api.auth.model.UserPrincipal;
import com.paf.api.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        Optional<User> optionalUser = userRepository.findByEmail(email);

        User user;

        if (optionalUser.isPresent()) {
            user = optionalUser.get();
        } else {
            throw new UsernameNotFoundException("User with ID " + email + " not found");
        }

        return new UserPrincipal(user);
    }
}
