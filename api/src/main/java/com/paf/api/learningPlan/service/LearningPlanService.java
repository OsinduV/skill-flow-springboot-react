package com.paf.api.learningPlan.service;

import com.paf.api.learningPlan.dto.LearningPlanCreateRequest;
import com.paf.api.learningPlan.model.LearningPlan;
import com.paf.api.learningPlan.model.LearningPlanItem;
import com.paf.api.learningPlan.repository.LearningPlanItemRepository;
import com.paf.api.learningPlan.repository.LearningPlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class LearningPlanService {

    private final LearningPlanRepository learningPlanRepository;
    private final LearningPlanItemRepository learningPlanItemRepository;

    // ---------------- Learning Plan Operations ----------------

    public LearningPlan createLearningPlan(LearningPlan plan) {
        return learningPlanRepository.save(plan);
    }

    public LearningPlan createPlanWithItems(LearningPlanCreateRequest request) {
        LearningPlan plan = LearningPlan.builder()
                .userId(request.getUserId())
                .title(request.getTitle())
                .description(request.getDescription())
                .dueDate(request.getDueDate())
                .resources(request.getResources())
                .progress(0.0)
                .build();

        LearningPlan savedPlan = learningPlanRepository.save(plan);

        if (request.getItems() != null && !request.getItems().isEmpty()) {
            for (LearningPlanCreateRequest.LearningPlanItemRequest itemRequest : request.getItems()) {
                LearningPlanItem item = LearningPlanItem.builder()
                        .title(itemRequest.getTitle())
                        .resourceLink(itemRequest.getResourceLink())
                        .dueDate(itemRequest.getDueDate())
                        .isCompleted(itemRequest.getIsCompleted() != null ? itemRequest.getIsCompleted() : false)
                        .learningPlan(savedPlan)
                        .build();
                learningPlanItemRepository.save(item);
            }
            // After adding all items, update the progress
            updatePlanProgress(savedPlan.getId());
        }

        return learningPlanRepository.findById(savedPlan.getId()).orElseThrow();
    }

    public LearningPlan updateLearningPlan(Long planId, LearningPlan updatedPlan) {
        LearningPlan plan = learningPlanRepository.findById(planId)
                .orElseThrow(() -> new RuntimeException("Learning Plan not found"));

        plan.setTitle(updatedPlan.getTitle());
        plan.setDescription(updatedPlan.getDescription());
        plan.setDueDate(updatedPlan.getDueDate());
        plan.setResources(updatedPlan.getResources());
        plan.setUpdatedAt(java.time.LocalDateTime.now());

        return learningPlanRepository.save(plan);
    }

    public void deleteLearningPlan(Long planId) {
        learningPlanRepository.deleteById(planId);
    }

    public LearningPlan getLearningPlanById(Long planId) {
        return learningPlanRepository.findById(planId)
                .orElseThrow(() -> new RuntimeException("Learning Plan not found"));
    }

    public List<LearningPlan> getPlansByUserId(Long userId) {
        return learningPlanRepository.findByUserId(userId);
    }

    // ---------------- Learning Plan Item Operations ----------------

    public LearningPlanItem addItemToPlan(Long planId, LearningPlanItem item) {
        LearningPlan plan = learningPlanRepository.findById(planId)
                .orElseThrow(() -> new RuntimeException("Learning Plan not found"));

        item.setLearningPlan(plan);
        LearningPlanItem savedItem = learningPlanItemRepository.save(item);

        updatePlanProgress(planId); // update progress after adding item
        return savedItem;
    }

    public LearningPlanItem updateItem(Long itemId, LearningPlanItem updatedItem) {
        LearningPlanItem item = learningPlanItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Learning Plan Item not found"));

        item.setTitle(updatedItem.getTitle());
        item.setResourceLink(updatedItem.getResourceLink());
        item.setDueDate(updatedItem.getDueDate());
        item.setIsCompleted(updatedItem.getIsCompleted());

        LearningPlanItem savedItem = learningPlanItemRepository.save(item);

        // Update progress of the related plan
        updatePlanProgress(item.getLearningPlan().getId());

        return savedItem;
    }

    public void deleteItem(Long itemId) {
        Optional<LearningPlanItem> itemOpt = learningPlanItemRepository.findById(itemId);
        itemOpt.ifPresent(item -> {
            Long planId = item.getLearningPlan().getId();
            learningPlanItemRepository.deleteById(itemId);
            updatePlanProgress(planId); // update progress after deleting item
        });
    }

    public List<LearningPlanItem> getItemsByPlanId(Long planId) {
        return learningPlanItemRepository.findByLearningPlanId(planId);
    }

    // ---------------- Progress Calculation ----------------

    private void updatePlanProgress(Long planId) {
        List<LearningPlanItem> items = learningPlanItemRepository.findByLearningPlanId(planId);

        if (items.isEmpty()) {
            LearningPlan plan = learningPlanRepository.findById(planId)
                    .orElseThrow(() -> new RuntimeException("Learning Plan not found"));
            plan.setProgress(0.0);
            learningPlanRepository.save(plan);
            return;
        }

        long completedCount = items.stream().filter(LearningPlanItem::getIsCompleted).count();
        double progress = (completedCount * 100.0) / items.size();

        LearningPlan plan = learningPlanRepository.findById(planId)
                .orElseThrow(() -> new RuntimeException("Learning Plan not found"));
        plan.setProgress(progress);
        learningPlanRepository.save(plan);
    }

}
