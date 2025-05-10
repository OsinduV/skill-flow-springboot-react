package com.paf.api.learningPlan.dto;

import lombok.Data;

@Data
public class LearningPlanGenRequest {
    private String goal;
    private String currentExperience;
    private Integer learningTimelineWeeks;       // Optional
    private Double timeCommitment;               // Optional
    private String timeCommitmentUnit;           // "daily" or "weekly" (Optional)
    private String preferredLearningStyle;
    private String customDescription;
    private String startDate;                    // Optional (ISO format: "2025-05-10")
    private String endDate;                      // Optional
}
