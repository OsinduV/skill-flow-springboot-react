package com.paf.api.learningPlan.controller;

import com.paf.api.learningPlan.dto.LearningPlanCreateRequest;
import com.paf.api.learningPlan.model.LearningPlan;
import com.paf.api.learningPlan.model.LearningPlanItem;
import com.paf.api.learningPlan.service.LearningPlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/learning-plans")
@RequiredArgsConstructor
@CrossOrigin
public class LearningPlanController {

    private final LearningPlanService learningPlanService;

    // ---------------- Learning Plan Endpoints ----------------

    // Create a new learning plan
    @PostMapping
    public ResponseEntity<LearningPlan> createLearningPlan(@RequestBody LearningPlan plan) {
        LearningPlan createdPlan = learningPlanService.createLearningPlan(plan);
        return ResponseEntity.ok(createdPlan);
    }

    @PostMapping("/with-items")
    public ResponseEntity<LearningPlan> createPlanWithItems(@RequestBody LearningPlanCreateRequest request) {
        LearningPlan createdPlan = learningPlanService.createPlanWithItems(request);
        return ResponseEntity.ok(createdPlan);
    }

    // Update an existing learning plan
    @PutMapping("/{planId}")
    public ResponseEntity<LearningPlan> updateLearningPlan(
            @PathVariable Long planId,
            @RequestBody LearningPlan updatedPlan) {
        LearningPlan plan = learningPlanService.updateLearningPlan(planId, updatedPlan);
        return ResponseEntity.ok(plan);
    }

    // Delete a learning plan
    @DeleteMapping("/{planId}")
    public ResponseEntity<Void> deleteLearningPlan(@PathVariable Long planId) {
        learningPlanService.deleteLearningPlan(planId);
        return ResponseEntity.noContent().build();
    }

    // Get a single learning plan by ID
    @GetMapping("/{planId}")
    public ResponseEntity<LearningPlan> getLearningPlanById(@PathVariable Long planId) {
        LearningPlan plan = learningPlanService.getLearningPlanById(planId);
        return ResponseEntity.ok(plan);
    }

    // Get all learning plans by a user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<LearningPlan>> getPlansByUserId(@PathVariable Long userId) {
        List<LearningPlan> plans = learningPlanService.getPlansByUserId(userId);
        return ResponseEntity.ok(plans);
    }

    // ---------------- Learning Plan Item Endpoints ----------------

    // Add a new item to a learning plan
    @PostMapping("/{planId}/items")
    public ResponseEntity<LearningPlanItem> addItemToPlan(
            @PathVariable Long planId,
            @RequestBody LearningPlanItem item) {
        LearningPlanItem createdItem = learningPlanService.addItemToPlan(planId, item);
        return ResponseEntity.ok(createdItem);
    }

    // Update a learning plan item
    @PutMapping("/items/{itemId}")
    public ResponseEntity<LearningPlanItem> updateItem(
            @PathVariable Long itemId,
            @RequestBody LearningPlanItem updatedItem) {
        LearningPlanItem item = learningPlanService.updateItem(itemId, updatedItem);
        return ResponseEntity.ok(item);
    }

    // Delete a learning plan item
    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long itemId) {
        learningPlanService.deleteItem(itemId);
        return ResponseEntity.noContent().build();
    }

    // Get all items of a learning plan
    @GetMapping("/{planId}/items")
    public ResponseEntity<List<LearningPlanItem>> getItemsByPlanId(@PathVariable Long planId) {
        List<LearningPlanItem> items = learningPlanService.getItemsByPlanId(planId);
        return ResponseEntity.ok(items);
    }

}
