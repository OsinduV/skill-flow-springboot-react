package com.paf.api.comment.model;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "comments")

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Getter
    @Column(nullable = false, columnDefinition = "TEXT") // Allow long comments
    private String content;

    @Column(nullable = true)
    private Long postId;

    @Column(nullable = true)
    private Long userId;

    // Self-referencing Many-to-One relationship (A reply can have a parent comment)
    @ManyToOne
    @JoinColumn(name = "parent_id", nullable = true) // Parent can be null for top-level comments
    @JsonBackReference
    private Comment parent;

    // One-to-Many relationship (A comment can have multiple replies)
    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Comment> replies;

    @Column(nullable = false, columnDefinition = "int default 0") // Default value in DB
    private int numberOfLikes;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;



    public void setContent(String content) {
        this.content = content;
    }
    public String getContent() {
        return content;
    }

    public int getNumberOfLikes() {
        return numberOfLikes;
    }

    // Setter for numberOfLikes
    public void setNumberOfLikes(int numberOfLikes) {
        this.numberOfLikes = numberOfLikes;
    }



    // Utility method to add replies
    public void addReply(Comment reply) {
        reply.setParent(this);
        this.replies.add(reply);
    }

    // Add getter for replies
    public List<Comment> getReplies() {
        return replies;
    }

    public void setReplies(List<Comment> replies) {
        this.replies = replies;
    }




    // ✅ Add getter for id
    public Long getId() {
        return id;
    }

    // ✅ Add setter for id (if needed)
    public void setId(Long id) {
        this.id = id;
    }




    // ✅ Getter for updatedAt
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    // ✅ Setter for updatedAt (This fixes your error)
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }



    public Long getUserId() {
        return userId;
    }

    // ✅ Optional: Add setter for userId (if needed)
    public void setUserId(Long userId) {
        this.userId = userId;
    }


    public Long getPostId() {
        return postId;
    }

    // ✅ Optional: Add setter for postId (if needed)
    public void setPostId(Long postId) {
        this.postId = postId;
    }


    public Comment getParent() {
        return parent;
    }

    // ✅ Add setter for parent comment (fixes your issue)
    public void setParent(Comment parent) {
        this.parent = parent;
    }
}