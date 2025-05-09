package com.paf.api.comment.service;
import com.paf.api.comment.model.Comment;
import com.paf.api.comment.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CommentService {

    private final CommentRepository commentRepository;

    @Autowired
    private EmailService  emailService;


    @Autowired
    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public Comment createComment(Comment comment) {
        return commentRepository.save(comment);
    }

    public Comment getCommentById(Long id) {
        return commentRepository.findById(id).orElse(null);
    }

    public List<Comment> getCommentsByPostId(Long postId) {
        // Fetch only main comments (parentId == null)
        return commentRepository.findByPostIdAndParentIdIsNull(postId);
    }


    public List<Comment> getRepliesToComment(Long parentId) {
        return commentRepository.findByParentId(parentId);
    }

    public List<Comment> getCommentsByUser(Long userId) {
        return commentRepository.findByUserId(userId);
    }

    public Comment updateComment(Long id, Comment commentDetails) {
        Comment comment = commentRepository.findById(id).orElse(null);
        if (comment != null) {
            comment.setContent(commentDetails.getContent());

            // Ensure other fields are also updated if needed
            if (commentDetails.getNumberOfLikes() != 0) {
                comment.setNumberOfLikes(commentDetails.getNumberOfLikes());
            }

            return commentRepository.save(comment);
        }
        return null; // Return null if the comment wasn't found
    }


    public void deleteComment(Long id) {
        Comment comment = commentRepository.findById(id).orElseThrow(() -> new RuntimeException("Comment not found"));
        commentRepository.deleteAll(comment.getReplies());
        commentRepository.deleteById(id);
    }



    public Comment likeComment(Long id) {
        Comment comment = commentRepository.findById(id).orElse(null);
        if (comment != null) {
            comment.setNumberOfLikes(comment.getNumberOfLikes() + 1);

            emailService.sendLikeNotification("akilasuppliers@gmail.com","ravindu");
            return commentRepository.save(comment);
        }
        return null;
    }

    public Comment removeLikeFromComment(Long id) {
        Comment comment = commentRepository.findById(id).orElse(null);
        if (comment != null && comment.getNumberOfLikes() > 0) { // Ensure likes don't go below 0
            comment.setNumberOfLikes(comment.getNumberOfLikes() - 1);
            return commentRepository.save(comment);
        }
        return null;
    }

    public int getReplyCount(Long commentId) {
        return commentRepository.countByParentId(commentId);
    }

    public Comment updateReply(Long commentId, Long replyId, Comment replyDetails) {
        Comment parentComment = commentRepository.findById(commentId).orElse(null);
        if (parentComment != null) {
            for (Comment reply : parentComment.getReplies()) {
                if (reply.getId().equals(replyId)) {
                    reply.setContent(replyDetails.getContent());
                    reply.setUpdatedAt(LocalDateTime.now());
                    return commentRepository.save(reply);
                }
            }
        }
        return null;
    }

    public boolean deleteReply(Long commentId, Long replyId) {
        Comment parentComment = commentRepository.findById(commentId).orElse(null);
        if (parentComment != null) {
            List<Comment> replies = parentComment.getReplies();
            Comment replyToDelete = null;
            for (Comment reply : replies) {
                if (reply.getId().equals(replyId)) {
                    replyToDelete = reply;
                    break;
                }
            }
            if (replyToDelete != null) {
                replies.remove(replyToDelete);
                commentRepository.delete(replyToDelete);
                return true;
            }
        }
        return false;
    }
    public Comment addReply(Long parentId, Comment replyDetails) {
        Comment parentComment = commentRepository.findById(parentId).orElse(null);

        if (parentComment != null) {
            Comment reply = new Comment();
            reply.setContent(replyDetails.getContent());
            reply.setUserId(replyDetails.getUserId());
            reply.setPostId(parentComment.getPostId()); // Inherit the post ID
            reply.setParent(parentComment); // Set parent comment
            parentComment.getReplies().add(reply); // Add to replies list

   emailService.sendReplyNotification("akilasuppliers@gmail.com","ravinu",replyDetails.getContent());
            return commentRepository.save(reply);
        }

        return null; // Parent comment not found
    }


    public int getLikeCount(Long commentId) {
        return commentRepository.findById(commentId)
                .map(Comment::getNumberOfLikes)
                .orElse(0);
    }

}