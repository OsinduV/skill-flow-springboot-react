package com.paf.api.learningPlan.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "learning_plans")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LearningPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId; // Assuming simple userId reference

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private LocalDate dueDate; // Target completion date

    @Column(columnDefinition = "TEXT")
    private String resources; // Comma-separated resources or notes

    private Double progress = 0.0; // Percentage

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Relationship with Plan Items
    @OneToMany(mappedBy = "learningPlan", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LearningPlanItem> items;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
