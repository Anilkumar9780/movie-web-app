import React, { useState, useEffect } from 'react';

// package
import { GET_TVSHOW_LIST } from '../Service/Service';
import { MovieCard, Loader } from '../components'

// package
import { toast } from 'react-toastify';
import InfiniteScroll from 'react-infinite-scroll-component';

const TvShow = () => {
    const [tvShowList, setTvShowList] = useState([]);
    const [currPage, setCurrPage] = useState(1);

    /**
     *  get TVShow List 
     */
    const getTVShowList = async () => {
        setCurrPage(currPage + 1)
        try {
            const { data } = await GET_TVSHOW_LIST(currPage + 1);
            setTvShowList([...tvShowList, ...data.results]);
        } catch (error) {
            toast.error(error, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    };

    /**
     * passing dep
     */
    useEffect(() => {
        getTVShowList();
    }, [])

    console.log(tvShowList)

    return (
        <>
            <InfiniteScroll
                dataLength={tvShowList.length}
                next={getTVShowList}
                hasMore={true}
                loader={<Loader />}
                endMessage={<h4>Nothing more to show</h4>}
            >
                {tvShowList.map((movies, index) => {
                    return <div className="col-md-3" key={index}>
                        <MovieCard
                            movie_id={movies.id}
                            first_air_date={movies.first_air_date ? movies.first_air_date : movies.release_date}
                            poster_path={movies.poster_path ? movies.poster_path : movies.backdrop_path}
                            name={movies.original_name ? movies.original_name : movies.original_title}
                            vote_average={movies.vote_average}
                            original_language={movies.original_language}
                        />
                    </div>
                })}
            </InfiniteScroll>
        </>
    )
}
export default TvShow;