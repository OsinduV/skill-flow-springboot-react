// SkillPostServiceImpl.java
package com.paf.api.skillPost.service;

import com.paf.api.auth.model.User;
import com.paf.api.auth.repository.UserRepository;
import com.paf.api.progressUpdate.model.MediaAttachment;
import com.paf.api.skillPost.dto.SkillPostRequest;
import com.paf.api.skillPost.dto.SkillPostResponse;
import com.paf.api.skillPost.model.SkillMedia;
import com.paf.api.skillPost.model.SkillPost;
import com.paf.api.skillPost.repository.SkillMediaRepository;
import com.paf.api.skillPost.repository.SkillPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SkillPostServiceImpl implements SkillPostService {

    private final SkillPostRepository postRepo;
    private final SkillMediaRepository mediaRepo;
    private final UserRepository userRepo;

    @Override
    public SkillPostResponse createPost(SkillPostRequest request) {
        User user = userRepo.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        SkillPost post = SkillPost.builder()
                .user(user)
                .description(request.getDescription())
                .createdAt(LocalDateTime.now())
                .build();

        SkillPost saved = postRepo.save(post);

        if (request.getMediaList() != null) {
            if (request.getMediaList().size() > 3)
                throw new RuntimeException("Max 3 media files allowed");

            List<SkillMedia> mediaAttachments = request.getMediaList().stream().map(m ->
                    SkillMedia.builder()
                            .fileUrl(m.getFileUrl())
                            .mediaType(m.getMediaType())
                            .skillPost(saved)
                            .build()
            ).toList();

            mediaRepo.saveAll(mediaAttachments);
            saved.setMediaAttachments(mediaAttachments);
        }

        return toDto(saved);
    }

    @Override
    public List<SkillPostResponse> getPostsByUser(Integer userId) {
        return postRepo.findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(this::toDto)
                .toList();
    }

    @Override
    public SkillPostResponse getById(Long id) {
        return toDto(postRepo.findById(id).orElseThrow(() -> new RuntimeException("Post not found")));
    }

    @Override
    public void deletePost(Long id) {
        postRepo.deleteById(id);
    }

    private SkillPostResponse toDto(SkillPost post) {
        return SkillPostResponse.builder()
                .id(post.getId())
                .description(post.getDescription())
                .createdAt(post.getCreatedAt())
                .userId(post.getUser().getId())
                .mediaList(post.getMediaAttachments())
                .build();
    }
}
