package com.paf.api.progressUpdate.controller;

import com.paf.api.progressUpdate.dto.ProgressUpdateRequest;
import com.paf.api.progressUpdate.dto.ProgressUpdateResponse;
import com.paf.api.progressUpdate.model.MediaAttachment;
import com.paf.api.progressUpdate.model.ProgressUpdate;
import com.paf.api.progressUpdate.model.TemplateType;
import com.paf.api.progressUpdate.service.ProgressUpdateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/progress")
@RequiredArgsConstructor
@CrossOrigin
public class ProgressUpdateController {

    private final ProgressUpdateService progressService;

    // 🔸 Create progress post
    // CREATE
    @PostMapping("/create")
    public ResponseEntity<ProgressUpdateResponse> createProgress(@RequestBody ProgressUpdateRequest request) {
//        ProgressUpdate progress = ProgressUpdate.builder()
//                .title(request.getTitle())
//                .description(request.getDescription())
//                .templateType(TemplateType.valueOf(request.getTemplateType()))
//                .build();
//
//        ProgressUpdate saved = progressService.createProgress(
//                request.getUserId(),
//                request.getLearningPlanId(),
//                progress,
//                request.getMediaList()
//        );
//
//        return ResponseEntity.ok(toDto(saved));
        return ResponseEntity.ok(progressService.createProgress(request));
    }

    // 🔸 Update existing progress post
    // UPDATE
    @PutMapping("/update/{id}")
    public ResponseEntity<ProgressUpdateResponse> updateProgress(
            @PathVariable Long id,
            @RequestBody ProgressUpdateRequest request
    ) {
//        ProgressUpdate progress = ProgressUpdate.builder()
//                .title(request.getTitle())
//                .description(request.getDescription())
//                .templateType(TemplateType.valueOf(request.getTemplateType()))
//                .build();
//
//        ProgressUpdate updated = progressService.updateProgress(
//                id,
//                progress,
//                request.getMediaList(),
//                request.getLearningPlanId()
//        );
//
//        return ResponseEntity.ok(toDto(updated));
        return ResponseEntity.ok(progressService.updateProgress(id, request));
    }

    // 🔸 Get progress updates by user ID
    @GetMapping()
    public ResponseEntity<List<ProgressUpdateResponse>> getAll() {
        return ResponseEntity.ok(progressService.getProgressUpdates());
    }

    // 🔸 Get progress updates by user ID
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ProgressUpdateResponse>> getByUser(@PathVariable Integer userId) {
        return ResponseEntity.ok(progressService.getByUser(userId));
    }

    // 🔸 Get progress updates by learning plan
    @GetMapping("/plan/{planId}")
    public ResponseEntity<List<ProgressUpdateResponse>> getByPlan(@PathVariable Long planId) {
        return ResponseEntity.ok(progressService.getByPlan(planId));
    }

    // 🔸 Get a single progress update
    // GET by ID
    @GetMapping("/{id}")
    public ResponseEntity<ProgressUpdateResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(progressService.getById(id));
    }

    // 🔸 Delete progress update
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        progressService.deleteProgress(id);
        return ResponseEntity.noContent().build();
    }

}