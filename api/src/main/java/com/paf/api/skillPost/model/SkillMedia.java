package com.paf.api.skillPost.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "skill_media")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SkillMedia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileUrl;

    @Enumerated(EnumType.STRING)
    private MediaType mediaType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "skill_post_id")
    @JsonIgnore
    private SkillPost skillPost;
}
