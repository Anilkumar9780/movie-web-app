import React from 'react';

// package
import InfiniteScroll from 'react-infinite-scroll-component';

//component
import { MovieCard, Loader } from '../components'

const Search = ({
    searchMovieList,
    handlesearch
}) => {
    console.log(searchMovieList)
    return (
        <>
            <InfiniteScroll
                dataLength={searchMovieList.length}
                next={handlesearch}
                hasMore={true}
                loader={<Loader />}
                endMessage={<h4>Nothing more to show</h4>}
            >
                {searchMovieList.map((movies, index) => {
                    return <div className="col-md-3" key={index}>
                        <MovieCard
                            movie_id={movies.id}
                            first_air_date={movies.first_air_date ? movies.first_air_date : movies.release_date}
                            poster_path={movies.poster_path ? movies.poster_path : movies.backdrop_path}
                            name={movies.original_name ? movies.original_name : movies.original_title}
                            vote_average={movies.vote_average ? movies.vote_average : movies.vote_count}
                            original_language={movies.original_language}
                        />
                    </div>
                })}
            </InfiniteScroll>
        </>
    )
}
export default Search;