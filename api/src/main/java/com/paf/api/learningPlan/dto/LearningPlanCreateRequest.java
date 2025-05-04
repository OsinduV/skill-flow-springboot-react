package com.paf.api.learningPlan.dto;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class LearningPlanCreateRequest {
    private Long userId;
    private String title;
    private String description;
    private LocalDate dueDate;
    private String resources;
    private List<LearningPlanItemRequest> items;

    @Data
    public static class LearningPlanItemRequest {
        private String title;
        private String resourceLink;
        private LocalDate dueDate;
        private Boolean isCompleted = false;
    }
}