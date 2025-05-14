package com.paf.api.auth.controller;

import com.paf.api.auth.dto.GetUsersResponse;
import com.paf.api.auth.dto.UserRequest;
import com.paf.api.auth.model.User;
import com.paf.api.auth.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin
public class UserController {

    private final UserService userService;

    @GetMapping("/user")
    public GetUsersResponse getUsers(){
        return userService.getUsers();
    }

    @PostMapping("/user")
    public User registerUser(@RequestBody UserRequest userRequest) throws Exception {
        return userService.registerUser(userRequest);
    }

    @GetMapping("/user/{userId}")
    public User getUserById(@PathVariable("userId") Integer id) throws Exception {
        return userService.getUserById(id);
    }

    @PutMapping("/user/{userId}")
    public User editUser(@RequestBody User user, @PathVariable("userId") Integer id) throws Exception {
        return userService.editUser(user, id);
    }

    @PutMapping("/user/{userId}/follow/{targetId}")
    public User toggleFollow(@PathVariable Integer userId, @PathVariable Integer targetId) throws Exception {
        return userService.toggleFollow(userId, targetId);
    }

    @GetMapping("/user/{userId}/follows/{targetId}")
    public boolean isFollowing(@PathVariable Integer userId, @PathVariable Integer targetId) throws Exception {
        return userService.getUserById(userId).getFollowings().contains(targetId);
    }

    @GetMapping("/user/search")
    public List<User> searchUsers(@RequestParam("query") String query) {
        return userService.searchUsers(query);
    }

    @DeleteMapping("/user/{userId}")
    public String deleteUser(@PathVariable("userId") Integer id) throws Exception {
        return userService.deleteUser(id);
    }



}
