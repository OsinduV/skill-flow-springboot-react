package com.paf.api.learningPlan.controller;

import com.paf.api.learningPlan.dto.LearningPlanGenRequest;
import com.paf.api.learningPlan.service.GeminiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/ai")
@RequiredArgsConstructor
@CrossOrigin
public class AIGenerationController {

    private final GeminiService geminiService;

    @PostMapping("/generate-learning-plan")
    public Mono<ResponseEntity<String>> generateLearningPlan(@RequestBody LearningPlanGenRequest request) {
        return geminiService.generateLearningPlan(request)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.internalServerError().body("AI generation failed."));
    }

}
