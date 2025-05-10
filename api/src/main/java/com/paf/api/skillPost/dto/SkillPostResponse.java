package com.paf.api.skillPost.dto;

import com.paf.api.skillPost.model.SkillMedia;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class SkillPostResponse {
    private Long id;
    private String description;
    private LocalDateTime createdAt;
    private Integer userId;
    private List<SkillMedia> mediaList;
}
