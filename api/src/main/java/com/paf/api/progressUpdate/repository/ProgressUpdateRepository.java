package com.paf.api.progressUpdate.repository;

import com.paf.api.progressUpdate.model.ProgressUpdate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProgressUpdateRepository extends JpaRepository<ProgressUpdate, Long> {

    List<ProgressUpdate> findByUserId(int userId);

    List<ProgressUpdate> findByLearningPlanId(Long learningPlanId);

    @Query("SELECT p FROM ProgressUpdate p WHERE p.user.id = :userId ORDER BY p.createdAt DESC")
    List<ProgressUpdate> findAllByUserIdOrderByCreatedAtDesc(Integer userId);

    @Query("SELECT p FROM ProgressUpdate p ORDER BY p.createdAt DESC")
    List<ProgressUpdate> findAllByCreatedAtDesc();

}
