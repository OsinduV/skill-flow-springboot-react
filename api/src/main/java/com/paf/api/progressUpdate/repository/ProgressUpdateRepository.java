package com.paf.api.progressUpdate.repository;

import com.paf.api.progressUpdate.model.ProgressUpdate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProgressUpdateRepository extends JpaRepository<ProgressUpdate, Long> {

    List<ProgressUpdate> findByUserId(int userId);

    List<ProgressUpdate> findByLearningPlanId(Long learningPlanId);

}
