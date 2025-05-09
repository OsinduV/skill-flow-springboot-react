package com.paf.api.comment.controller;

import com.paf.api.comment.model.Comment;
import com.paf.api.comment.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping
    public ResponseEntity<Comment> createComment(@RequestBody Comment comment) {
        Comment createdComment = commentService.createComment(comment);
        return ResponseEntity.ok(createdComment);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Comment> getCommentById(@PathVariable Long id) {
        Comment comment = commentService.getCommentById(id);
        if (comment != null) {
            return ResponseEntity.ok(comment);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/post/{postId}")
    public ResponseEntity<List<Comment>> getCommentsByPostId(@PathVariable Long postId) {
        List<Comment> comments = commentService.getCommentsByPostId(postId);
        return ResponseEntity.ok(comments);
    }

    @GetMapping("/{parentId}/replies")
    public ResponseEntity<List<Comment>> getRepliesToComment(@PathVariable Long parentId) {
        List<Comment> replies = commentService.getRepliesToComment(parentId);
        return ResponseEntity.ok(replies);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Comment>> getCommentsByUser(@PathVariable Long userId) {
        List<Comment> comments = commentService.getCommentsByUser(userId);
        return ResponseEntity.ok(comments);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Comment> updateComment(
            @PathVariable Long id,
            @RequestBody Comment commentDetails) {
        Comment updatedComment = commentService.updateComment(id, commentDetails);
        if (updatedComment != null) {
            return ResponseEntity.ok(updatedComment);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long id) {
        commentService.deleteComment(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<Comment> likeComment(@PathVariable Long id) {
        Comment likedComment = commentService.likeComment(id);
        if (likedComment != null) {
            return ResponseEntity.ok(likedComment);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}/unlike")
    public ResponseEntity<Comment> removeLikeFromComment(@PathVariable Long id) {
        Comment updatedComment = commentService.removeLikeFromComment(id);
        if (updatedComment != null) {
            return ResponseEntity.ok(updatedComment);
        }
        return ResponseEntity.notFound().build();
    }

    
    @GetMapping("/{commentId}/reply-count")
    public ResponseEntity<Integer> getReplyCount(@PathVariable Long commentId) {
        int count = commentService.getReplyCount(commentId);
        return ResponseEntity.ok(count);
    }

    @PostMapping("/{parentId}/replies")
    public ResponseEntity<Comment> addReply(
            @PathVariable Long parentId,
            @RequestBody Comment reply) {

        Comment createdReply = commentService.addReply(parentId, reply);

        if (createdReply != null) {
            return ResponseEntity.ok(createdReply);
        }

        return ResponseEntity.notFound().build();
    }



    @PutMapping("/{commentId}/replies/{replyId}")
    public ResponseEntity<Comment> updateReply(
            @PathVariable Long commentId,
            @PathVariable Long replyId,
            @RequestBody Comment replyDetails) {
        Comment updatedReply = commentService.updateReply(commentId, replyId, replyDetails);
        if (updatedReply != null) {
            return ResponseEntity.ok(updatedReply);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{commentId}/replies/{replyId}")
    public ResponseEntity<Void> deleteReply(
            @PathVariable Long commentId,
            @PathVariable Long replyId) {
        boolean deleted = commentService.deleteReply(commentId, replyId);
        if (deleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }


    @GetMapping("/{commentId}/like-count")
    public ResponseEntity<Integer> getLikeCount(@PathVariable Long commentId) {
        int count = commentService.getLikeCount(commentId);
        return ResponseEntity.ok(count);
    }

}