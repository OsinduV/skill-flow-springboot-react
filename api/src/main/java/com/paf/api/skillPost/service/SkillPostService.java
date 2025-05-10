package com.paf.api.skillPost.service;

import com.paf.api.skillPost.dto.SkillPostRequest;
import com.paf.api.skillPost.dto.SkillPostResponse;

import java.util.List;

public interface SkillPostService {
    SkillPostResponse createPost(SkillPostRequest request);
    List<SkillPostResponse> getPostsByUser(Integer userId);
    SkillPostResponse getById(Long id);
    void deletePost(Long id);
}
