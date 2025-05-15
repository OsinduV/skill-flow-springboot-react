package com.paf.api.auth.service;

import com.paf.api.auth.dto.GetUsersResponse;
import com.paf.api.auth.dto.UserRequest;
import com.paf.api.auth.dto.UserResponse;
import com.paf.api.auth.model.User;
import com.paf.api.auth.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(10);

    @Override
    public GetUsersResponse getUsers(){
        long totUserCount = userRepository.count();

        List<UserResponse> allUsers = userRepository.findAll().stream().map(user -> {
            UserResponse userResponse = new UserResponse();
            userResponse.setId(user.getId());
            userResponse.setFirstName(user.getFirstName());
            userResponse.setLastName(user.getLastName());
            userResponse.setGender(user.getGender());
            userResponse.setEmail(user.getEmail());
            userResponse.setProfilePicture(user.getProfilePicture());
            userResponse.setFollowers(user.getFollowers());
            userResponse.setFollowings(user.getFollowings());
            userResponse.setAdmin(user.isAdmin());
            return userResponse;
        }).collect(Collectors.toList());

        return new GetUsersResponse(allUsers, totUserCount);
    }

    @Override
    public User registerUser(UserRequest userRequest) throws Exception {

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

        return userRepository.save(newUser);
    }

    @Override
    public User getUserById(Integer id) throws Exception {
        Optional<User> user = userRepository.findById(id);

        if (user.isPresent()) {
            return user.get();
        } else {
            throw new Exception("User with ID " + id + " not found");
        }

    }

    @Override
    public User getUserByEmail(String email) throws Exception {
        Optional<User> user = userRepository.findByEmail(email);

        if (user.isPresent()) {
            return user.get();
        } else {
            throw new Exception("User with ID " + email + " not found");
        }
    }

    @Override
    @Transactional
    public User toggleFollow(Integer userId, Integer targetId) throws Exception {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new Exception("User not found"));
        User target = userRepository.findById(targetId)
                .orElseThrow(() -> new Exception("Target user not found"));

        if (user.getFollowings().contains(targetId)) {
            // Unfollow
            user.getFollowings().remove(targetId);
            target.getFollowers().remove(userId);
        } else {
            // Follow
            user.getFollowings().add(targetId);
            target.getFollowers().add(userId);
        }

        userRepository.save(user);
        userRepository.save(target);

        return user;
    }

    @Override
    public User editUser(User userRequest, Integer userId) throws Exception {
        Optional<User> optionalUser = userRepository.findById(userId);

        if (optionalUser.isEmpty()) {
            throw new Exception("User with ID " + userId + " not found");
        }

        User user = optionalUser.get();

        if(userRequest.getFirstName()!= null){
            user.setFirstName(userRequest.getFirstName());
        }
        if(userRequest.getLastName() != null){
            user.setLastName(userRequest.getLastName());
        }
        if(userRequest.getGender() != null){
            user.setGender(userRequest.getGender());
        }
        if(userRequest.getEmail() != null){
            user.setEmail(userRequest.getEmail());
        }
        if(userRequest.getPassword() != null){
            user.setPassword(encoder.encode(userRequest.getPassword()));
        }
        if(userRequest.getProfilePicture() != null){
            user.setProfilePicture(userRequest.getProfilePicture());
        }

        return userRepository.save(user);
    }

    @Override
    public List<User> searchUsers(String query) {
        return userRepository.searchUser(query);
    }

    @Override
    public String deleteUser(Integer id) throws Exception {
        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isEmpty()) {
            throw new Exception("User with ID " + id + " not found");
        }

        userRepository.delete(optionalUser.get());

        return "User with ID " + id + " deleted successfully";
    }


}
