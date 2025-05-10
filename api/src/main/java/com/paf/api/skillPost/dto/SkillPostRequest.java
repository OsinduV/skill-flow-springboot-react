package com.paf.api.skillPost.dto;

import com.paf.api.skillPost.model.SkillMedia;
import lombok.Data;
import java.util.List;

@Data
public class SkillPostRequest {
    private Integer userId;
    private String description;
    private List<SkillMedia> mediaList;
}
