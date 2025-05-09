package com.paf.api.comment.repository;

import com.paf.api.comment.model.Comment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

        // Fetch main comments (parentId == null) for a specific postId
        List<Comment> findByPostIdAndParentIdIsNull(Long postId);


    List<Comment> findByParentId(Long parentId);
    List<Comment> findByUserId(Long userId);
    void deleteById(Long id);

    @Query("SELECT c FROM Comment c WHERE c.parent.id = :parentId")
    List<Comment> findRepliesByParentId(@Param("parentId") Long parentId);

    @Query("SELECT COUNT(c) FROM Comment c WHERE c.parent.id = :commentId")
    int countByParentId(@Param("commentId") Long commentId);
}