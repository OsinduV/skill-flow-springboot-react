package com.paf.api.skillPost.repository;

import com.paf.api.skillPost.model.SkillPost;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SkillPostRepository extends JpaRepository<SkillPost, Long> {
    List<SkillPost> findByUserIdOrderByCreatedAtDesc(Integer userId);
}