package com.paf.api.progressUpdate.service;
import com.paf.api.auth.model.User;
import com.paf.api.auth.repository.UserRepository;
import com.paf.api.learningPlan.model.LearningPlan;
import com.paf.api.learningPlan.repository.LearningPlanRepository;
import com.paf.api.progressUpdate.dto.ProgressUpdateRequest;
import com.paf.api.progressUpdate.dto.ProgressUpdateResponse;
import com.paf.api.progressUpdate.model.MediaAttachment;
import com.paf.api.progressUpdate.model.ProgressUpdate;
import com.paf.api.progressUpdate.model.TemplateType;
import com.paf.api.progressUpdate.repository.MediaAttachmentRepository;
import com.paf.api.progressUpdate.repository.ProgressUpdateRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProgressUpdateService {

    private final ProgressUpdateRepository progressRepo;
    private final MediaAttachmentRepository mediaRepo;
    private final UserRepository userRepo;
    private final LearningPlanRepository planRepo;

    @Transactional
    public ProgressUpdateResponse createProgress(ProgressUpdateRequest request) {

        // 1. Load and validate User
        User user = userRepo.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 2. Associate LearningPlan if provided
        LearningPlan plan = null;
        if (request.getLearningPlanId() != null) {
            plan = planRepo.findById(request.getLearningPlanId())
                    .orElseThrow(() -> new RuntimeException("Learning plan not found"));
        }

        // 3. Set timestamp and save progress
        ProgressUpdate progress = ProgressUpdate.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .templateType(TemplateType.valueOf(request.getTemplateType()))
                .user(user)
                .learningPlan(plan)
                .createdAt(LocalDateTime.now())
                .build();

        ProgressUpdate saved = progressRepo.save(progress);

        // 4. Save up to 3 media attachments
        if (request.getMediaList() != null && !request.getMediaList().isEmpty()) {
            if (request.getMediaList().size() > 3) {
                throw new RuntimeException("Max 3 media files allowed.");
            }

            for (MediaAttachment media : request.getMediaList()) {
                media.setProgressUpdate(saved);
            }
            mediaRepo.saveAll(request.getMediaList());
        }

        return toDto(saved);
    }

    @Transactional
    public ProgressUpdateResponse updateProgress(Long id, ProgressUpdateRequest request) {
        ProgressUpdate existing = progressRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Progress not found"));

        existing.setTitle(request.getTitle());
        existing.setDescription(request.getDescription());
        existing.setTemplateType(TemplateType.valueOf(request.getTemplateType()));

        if (request.getLearningPlanId() != null) {
            LearningPlan plan = planRepo.findById(request.getLearningPlanId())
                    .orElseThrow(() -> new RuntimeException("Learning plan not found"));
            existing.setLearningPlan(plan);
        } else {
            existing.setLearningPlan(null);
        }

        if (request.getMediaList() != null) {
            if (request.getMediaList().size() > 3)
                throw new RuntimeException("You can upload up to 3 media files only.");

//            mediaRepo.deleteAll(existing.getMediaAttachments());

            // for (MediaAttachment media : request.getMediaList()) {
            //     media.setProgressUpdate(existing);
            // }

            // mediaRepo.saveAll(request.getMediaList());
            // existing.setMediaAttachments(request.getMediaList());

            // Clear existing attachments (orphanRemoval = true)
            existing.getMediaAttachments().clear();

// Add new media attachments (attach to the same collection)
            List<MediaAttachment> newMediaList = request.getMediaList().stream()
                    .map(media -> MediaAttachment.builder()
                            .fileUrl(media.getFileUrl())
                            .mediaType(media.getMediaType())
                            .progressUpdate(existing)
                            .build())
                    .collect(Collectors.toList());

            existing.getMediaAttachments().addAll(newMediaList);


//            mediaRepo.saveAll(newMediaList);
//            existing.setMediaAttachments(newMediaList);
        }

        return toDto(progressRepo.save(existing));
    }


    public List<ProgressUpdateResponse> getByUser(Integer userId) {
        return progressRepo.findAllByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(this::toDto)
                .toList();
    }

    public List<ProgressUpdateResponse> getByPlan(Long planId) {
        return progressRepo.findByLearningPlanId(planId).stream()
                .map(this::toDto)
                .toList();
    }

    public ProgressUpdateResponse getById(Long id) {
        return toDto(progressRepo.findById(id).orElseThrow(() -> new RuntimeException("Progress not found")));
    }

    public void deleteProgress(Long id) {
        progressRepo.deleteById(id);
    }

    private ProgressUpdateResponse toDto(ProgressUpdate p) {
        return ProgressUpdateResponse.builder()
                .id(p.getId())
                .title(p.getTitle())
                .description(p.getDescription())
                .templateType(p.getTemplateType().name())
                .createdAt(p.getCreatedAt())
                .userId(p.getUser().getId())
                .learningPlanId(p.getLearningPlan() != null ? p.getLearningPlan().getId() : null)
                .mediaList(p.getMediaAttachments())
                .build();
    }
}
