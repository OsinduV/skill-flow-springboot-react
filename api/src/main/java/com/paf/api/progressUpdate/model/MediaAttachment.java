package com.paf.api.progressUpdate.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "media_attachments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MediaAttachment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileUrl;

    @Enumerated(EnumType.STRING)
    private MediaType mediaType; // IMAGE or VIDEO

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "progress_update_id")
    @JsonIgnore
    private ProgressUpdate progressUpdate;
}