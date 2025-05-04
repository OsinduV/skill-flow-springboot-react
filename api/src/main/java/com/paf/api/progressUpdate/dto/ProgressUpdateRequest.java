package com.paf.api.progressUpdate.dto;

import com.paf.api.progressUpdate.model.MediaAttachment;
import lombok.Data;

import java.util.List;

@Data
public class ProgressUpdateRequest {
    private Integer userId;
    private Long learningPlanId; // nullable
    private String title;
    private String description;
    private String templateType;
    private List<MediaAttachment> mediaList; // just URLs + types
}