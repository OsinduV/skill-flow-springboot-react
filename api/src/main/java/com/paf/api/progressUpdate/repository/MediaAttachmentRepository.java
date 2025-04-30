package com.paf.api.progressUpdate.repository;

import com.paf.api.progressUpdate.model.MediaAttachment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MediaAttachmentRepository extends JpaRepository<MediaAttachment, Long> {

    List<MediaAttachment> findByProgressUpdateId(Long progressUpdateId);

}