package com.paf.api.skillPost.controller;

import com.paf.api.skillPost.dto.SkillPostRequest;
import com.paf.api.skillPost.dto.SkillPostResponse;
import com.paf.api.skillPost.service.SkillPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

        import java.util.List;

@RestController
@RequestMapping("/skill-posts")
@RequiredArgsConstructor
@CrossOrigin
public class SkillPostController {

    private final SkillPostService postService;

    @PostMapping("/create")
    public ResponseEntity<SkillPostResponse> create(@RequestBody SkillPostRequest request) {
        return ResponseEntity.ok(postService.createPost(request));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<SkillPostResponse>> getByUser(@PathVariable Integer userId) {
        return ResponseEntity.ok(postService.getPostsByUser(userId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<SkillPostResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(postService.getById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        postService.deletePost(id);
        return ResponseEntity.noContent().build();
    }
}
