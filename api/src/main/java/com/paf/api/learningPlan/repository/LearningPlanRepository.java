package com.paf.api.learningPlan.repository;

import com.paf.api.learningPlan.model.LearningPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LearningPlanRepository extends JpaRepository<LearningPlan, Long> {
    List<LearningPlan> findByUserId(Long userId); // Get all plans created by a specific user
}
