package com.paf.api.learningPlan.service;

import com.paf.api.learningPlan.dto.LearningPlanGenRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private final WebClient webClient = WebClient.builder()
            .baseUrl("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent")
            .defaultHeader("Content-Type", MediaType.APPLICATION_JSON_VALUE)
            .build();

    public Mono<String> generateLearningPlan(LearningPlanGenRequest request) {
        String prompt = String.format(
                """
                You are an AI tutor creating a personalized learning plan.
            
                Goal: %s
                Current Experience: %s
                Preferred Learning Style: %s
                Description: %s
            
                Optional Information Provided:
                %s
                %s
                %s
            
                If time commitment or timeline (weeks) is not provided, estimate them based on the goal and experience level.
                If both startDate and endDate are given, use them to assign realistic due dates to each plan item considering today's date.
                If both startDate and endDate are not given, set them according to the learning timeline and also use them to assign realistic due dates to each plan item considering today's date.
            
                Output JSON structure:
                {
                  "title": "...",
                  "description": "...",
                  "resourcesUsed": ["...", "..."],
                  "learningPlan": [
                    {
                      "itemName": "Day 1: 🎥 Watch: Introduction to Cloud Computing",
                      "resource": "YouTube - Azure Fundamentals by freeCodeCamp",
                      "dueDate": "2025-05-11" // include only if dates are given
                    },
                    ...
                  ]
                }
                
                this is 2025 .
                """,
                request.getGoal(),
                request.getCurrentExperience(),
                request.getPreferredLearningStyle(),
                request.getCustomDescription(),
                request.getLearningTimelineWeeks() != null ? "Learning Timeline: " + request.getLearningTimelineWeeks() + " weeks" : "Learning Timeline: not provided",
                request.getTimeCommitment() != null ? "Time Commitment: " + request.getTimeCommitment() + " hours per " + request.getTimeCommitmentUnit() : "Time Commitment: not provided",
                (request.getStartDate() != null && request.getEndDate() != null)
                        ? "Start Date: " + request.getStartDate() + ", End Date: " + request.getEndDate()
                        : "Start and/or End Date: not provided"
        );

        Map<String, Object> requestBody = Map.of(
                "contents", List.of(
                        Map.of("parts", List.of(Map.of("text", prompt)))
                )
        );

        return webClient.post()
                .uri(uriBuilder -> uriBuilder.queryParam("key", apiKey).build())
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(Map.class)
                .map(response -> {
                    List<Map<String, Object>> candidates = (List<Map<String, Object>>) response.get("candidates");
                    if (candidates != null && !candidates.isEmpty()) {
                        Map<String, Object> content = (Map<String, Object>) candidates.get(0).get("content");
                        List<Map<String, String>> parts = (List<Map<String, String>>) content.get("parts");
                        return parts.get(0).get("text");
                    }
                    return "No content generated.";
                });
    }

}
