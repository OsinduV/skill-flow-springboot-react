package com.paf.api.progressUpdate.dto;

import com.paf.api.progressUpdate.model.MediaAttachment;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class ProgressUpdateResponse {
    private Long id;
    private String title;
    private String description;
    private String templateType;
    private LocalDateTime createdAt;
    private Integer userId;
    private String userName;
    private String userImage;
    private Long learningPlanId;
    private List<MediaAttachment> mediaList;
}
