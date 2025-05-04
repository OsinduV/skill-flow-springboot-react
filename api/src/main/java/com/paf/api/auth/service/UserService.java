package com.paf.api.auth.service;

import com.paf.api.auth.dto.GetUsersResponse;
import com.paf.api.auth.dto.UserRequest;
import com.paf.api.auth.model.User;

import java.util.List;

public interface UserService {

    public GetUsersResponse getUsers();

    public User registerUser(UserRequest userRequest) throws Exception;

    public User getUserById(Integer id) throws Exception;

    public User getUserByEmail(String email) throws Exception;

    public User followUser(Integer userId, Integer followerId) throws Exception;

    public User editUser(User user, Integer userId) throws Exception;

    public List<User> searchUsers(String query);

    public String deleteUser(Integer id) throws Exception;

}
