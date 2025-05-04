package com.paf.api.learningPlan.repository;

import com.paf.api.learningPlan.model.LearningPlanItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LearningPlanItemRepository extends JpaRepository<LearningPlanItem, Long> {
    List<LearningPlanItem> findByLearningPlanId(Long planId); // Get all items under a specific plan
}
