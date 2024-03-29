import React, { useState, useEffect } from 'react';

// component
import { GET_TRENDING_MOVIE_LIST } from '../Service/Service';
import { MovieCard, Loader } from '../components'

// package
import { toast } from 'react-toastify';
import InfiniteScroll from 'react-infinite-scroll-component';

const Trending = () => {
  const [trendingList, setTrendingList] = useState([]);
  const [currPage, setCurrPage] = useState(1);

  /**
   *  get TVShow List 
   */
  const getTrendingList = async () => {
    setCurrPage(currPage + 1);
    try {
      const { data } = await GET_TRENDING_MOVIE_LIST(currPage + 1);
      setTrendingList([...trendingList, ...data.results]);

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
    getTrendingList();
  }, []);

  // console.log(trendingList)
  return (
    <>
      <InfiniteScroll
        dataLength={trendingList.length}
        next={getTrendingList}
        hasMore={true}
        loader={<Loader />}
        endMessage={<h4>Nothing more to show</h4>}
      >
        {trendingList.map((movies, index) => {
          return <div className="col-md-3 " key={index}>
            <MovieCard
              movie_id={movies.id}
              first_air_date={movies.first_air_date ? movies.first_air_date : movies.release_date}
              poster_path={movies.poster_path ? movies.poster_path : movies.backdrop_path}
              name={movies.original_name ? movies.original_name : movies.original_title}
              original_language={movies.original_language}
              vote_average={movies.vote_average}
            />
          </div>
        })}
      </InfiniteScroll>
    </>
  )
}
export default Trending;