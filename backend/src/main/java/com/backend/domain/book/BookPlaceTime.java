package com.backend.domain.book;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BookPlaceTime {
    private Integer id;
    private Integer theaterBoxMovieId;
    private Integer vacancy;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
}
