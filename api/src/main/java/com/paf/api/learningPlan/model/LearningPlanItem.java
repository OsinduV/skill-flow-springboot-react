package com.paf.api.learningPlan.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "learning_plan_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LearningPlanItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "plan_id", nullable = false)
    @JsonIgnore
    private LearningPlan learningPlan;

    @Column(nullable = false)
    private String title; // Name of the topic/step

    private String resourceLink; // Optional resource (link or description)

    private LocalDate dueDate; // Target completion date for the item

    private Boolean isCompleted = false; // Default false
}
