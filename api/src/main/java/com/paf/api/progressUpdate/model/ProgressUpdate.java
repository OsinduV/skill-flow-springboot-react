package com.paf.api.progressUpdate.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.paf.api.learningPlan.model.LearningPlan;
import com.paf.api.auth.model.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "progress_updates")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProgressUpdate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    private TemplateType templateType;

    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "learning_plan_id", nullable = true)
    private LearningPlan learningPlan; // Optional now

    @OneToMany(mappedBy = "progressUpdate", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MediaAttachment> mediaAttachments;
}
