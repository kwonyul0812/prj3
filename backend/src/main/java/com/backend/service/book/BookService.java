package com.backend.service.book;

import com.backend.domain.book.MovieLocation;
import com.backend.domain.movie.Movie;
import com.backend.mapper.book.BookMapper;
import com.backend.mapper.movie.MovieMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class BookService {
    private final BookMapper bookMapper;
    private final MovieMapper movieMapper;

    public List<Movie> getMovieList() {
        return movieMapper.selectAllMovie();
    }


    public int add(MovieLocation movieLocation) {
        return bookMapper.checkConflict(movieLocation) == 0 ?
                bookMapper.insertMovieLocation(movieLocation) : 0;
    }

    public List<MovieLocation> get() {
        return bookMapper.selectAllMovieLocation();
    }

    public List<Integer> getMovieIdByTheaterNumber(Integer number) {

        return bookMapper.selectMovieIdByTheaterNumber(number);
    }

    public List<Map<String, Object>> getOnMovieList() {
        return bookMapper.selectAllOnMovieByDate();
    }
}
