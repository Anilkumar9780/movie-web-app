/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';

//images
import img1 from '../img/uploads/ads1.png';
import img0 from '../img/uploads/image1.jpg'
import img2 from '../img/uploads/image2.jpg'
import img3 from '../img/uploads/image3.jpg'
import img4 from '../img/uploads/image4.jpg'
import play from '../img/uploads/play-vd.png'
import cat3 from '../img/uploads/cast3.jpg'
import cat4 from '../img/uploads/cast4.jpg'
import cat5 from '../img/uploads/cast5.jpg'
import cat6 from '../img/uploads/cast6.jpg'
import item1 from '../img/uploads/vd-item1.jpg'
import item2 from '../img/uploads/vd-item2.jpg'
import item3 from '../img/uploads/vd-item3.jpg'
import item4 from '../img/uploads/vd-item4.jpg'


//packages
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import InfiniteScroll from 'react-infinite-scroll-component';
import ReactStars from "react-rating-stars-component";

//component
import { GET_MOVIE_DETAIL, GET_MOVIE_LIST, GET_MOVIE_REVIEWS, } from '../Service/Service';
import { Loader } from '../components';

const MovieDetails = ({ medType }) => {
  //states
  const [movies, setMovies] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reatedMovie, setReatedMovie] = useState([]);
  const [openTab, setOpenTab] = useState(1);
  const [currPage, setCurrPage] = useState(1);
  const params = useParams();
  const id = params.movie_id;

  /**
   * get Movie Deatil
   */
  const getMovieDeatil = async () => {
    try {
      const { data } = await GET_MOVIE_DETAIL(id, medType);
      setMovies(data);
    } catch (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };

  /**
   * get movie reviews
   */
  const getMovieReviews = async () => {
    try {
      const { data } = await GET_MOVIE_REVIEWS(id, medType);
      setReviews(data.results)
    } catch (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  }

  /**
   * get reated movie
   */
  const getReatedMovies = async () => {
    setCurrPage(currPage + 1)
    try {
      const { data } = await GET_MOVIE_LIST(currPage + 1);
      setReatedMovie(data.results)
    } catch (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  }

  /**
   * component did mount
   */
  useEffect(() => {
    getReatedMovies()
    getMovieDeatil()
    getMovieReviews()
  }, []);

  //poster path
  const moviePoster = movies.poster_path ? movies.poster_path : movies.backdrop_path;

  return (
    <>
      <div className="hero sr-single-hero sr-single">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
            </div>
          </div>
        </div>
      </div>
      <div className="page-single movie-single movie_single">
        <div className="container">
          <div className="row ipad-width2">
            <div className="col-md-4 col-sm-12 col-xs-12">
              <div className="movie-img sticky-sb">
                {movies.poster_path ?
                  <img src={"https://image.tmdb.org/t/p/w500" + moviePoster} alt={moviePoster} />
                  :
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Noimage.svg/739px-Noimage.svg.png" alt='..' />
                }
                <div className="movie-btn">
                  <div className="btn-transform transform-vertical red">
                    <div><a className="item item-1 redbtn"> <i className="ion-play"></i> Watch Trailer</a>
                    </div>
                    <div><a
                      className="item item-2 redbtn fancybox-media hvr-grow"><i className="ion-play"></i></a>
                    </div>
                  </div>
                  <div className="btn-transform transform-vertical">
                    <div><a className="item item-1 yellowbtn"> <i className="ion-card"></i> Buy ticket</a>
                    </div>
                    <div><a className="item item-2 yellowbtn"><i className="ion-card"></i></a></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8 col-sm-12 col-xs-12">
              <div className="movie-single-ct main-content">
                <h1 className="bd-hd">{movies.original_name ? movies.original_name : movies.original_title} ({movies.original_language})<span> {movies.first_air_date ? movies.first_air_date : movies.release_date}</span></h1>
                <div className="social-btn">
                  <a className="parent-btn"><i className="ion-heart"></i> Add to Favorite</a>
                  <div className="hover-bnt">
                    <a className="parent-btn"><i className="ion-android-share-alt"></i>share</a>
                    <div className="hvr-item">
                      <a href="https://www.facebook.com" className="hvr-grow"><i className="ion-social-facebook"></i></a>
                      <a href="https://twitter.com/explore" className="hvr-grow"><i className="ion-social-twitter"></i></a>
                      <a href="https://www.google.com" className="hvr-grow"><i className="ion-social-googleplus"></i></a>
                      <a href="https://www.youtube.com" className="hvr-grow"><i className="ion-social-youtube"></i></a>
                    </div>
                  </div>
                </div>
                <div className="movie-rate">
                  <div className="rate">
                    <i className="ion-android-star"></i>
                    <p><span>{movies.vote_average}</span> /10<br />
                      <span className="rv">{reviews.length} Reviews</span>
                    </p>
                  </div>
                  <div className="rate-star">
                    <p>Rate This Movie: </p>
                    {/* rating star mapping */}
                    <div className="star">
                      <ReactStars
                        count={10}
                        size={20}
                        isHalf={false}
                        emptyIcon={<i className="ion-android-star last"></i>}
                        halfIcon={<i class="fa fa-star-half-o" aria-hidden="true"></i>}
                        fullIcon={<i className="ion-ios-star"></i>}
                        activeColor="#ffd700"
                        value={movies.vote_average}
                        edit={false}
                      />
                    </div>
                  </div>
                </div>
                <div className="movie-tabs">
                  <div className="tabs">
                    <ul className="tab-links tabs-mv tabs-series">
                      {/* overview tab button  */}
                      <li className={openTab === 1 ? "active" : ""}><a
                        href="#overview"
                        onClick={e => { e.preventDefault(); setOpenTab(1); }}
                      >Overview</a></li>
                      {/* reviews tab button */}
                      <li className={openTab === 2 ? "active" : ""}><a href="#reviews"
                        onClick={e => { e.preventDefault(); setOpenTab(2); }}
                        data-toggle="tab"
                        role="tablist" > Reviews</a></li>
                      {/* tab button cast */}
                      <li className={openTab === 3 ? "active" : ""}>
                        <a href="#cast"
                          onClick={e => { e.preventDefault(); setOpenTab(3); }}
                          data-toggle="tab"
                          role="tablist"
                        > Cast & Crew </a></li>
                      {/* media tab button */}
                      <li
                        className={openTab === 4 ? "active" : ""}><a href="#media"
                          onClick={e => { e.preventDefault(); setOpenTab(4); }}
                          data-toggle="tab"
                          role="tablist"
                        > Media</a></li>
                      {/* tab button related shows */}
                      <li
                        className={openTab === 6 ? "active" : ""}><a href="#moviesrelated"
                          onClick={e => { e.preventDefault(); setOpenTab(6); }}
                          data-toggle="tab"
                          role="tablist"
                        > Related Shows</a></li>
                    </ul>
                    <div className="tab-content">
                      {/* overview tab */}
                      <div id="overview" className={openTab === 1 ? "block" : "hidden"} style={{ marginLeft: "20px" }}>
                        <div className="row">
                          <div className="col-md-8 col-sm-12 col-xs-12">
                            <p>{movies.overview}</p>
                            <div className="title-hd-sm">
                              <h4>Videos & Photos</h4>
                              <a href="#" className="time">All 5 Videos & 245 Photos <i className="ion-ios-arrow-right"></i></a>
                            </div>
                            <div className="mvsingle-item ov-item">
                              <a className="img-lightbox" data-fancybox-group="gallery" href="images/uploads/image11.jpg" ><img src={img0} alt="" /></a>
                              <a className="img-lightbox" data-fancybox-group="gallery" href="images/uploads/image21.jpg" ><img src={img2} alt="" /></a>
                              <a className="img-lightbox" data-fancybox-group="gallery" href="images/uploads/image31.jpg" ><img src={img3} alt="" /></a>
                              <div className="vd-it">
                                <img className="vd-img" src={img4} alt="" />
                                <a className="fancybox-media hvr-grow" href=""><img src={play} alt="" /></a>
                              </div>
                            </div>
                            <div className="title-hd-sm">
                              <h4>cast</h4>
                              <a href="#" className="time">Full Cast & Crew  <i className="ion-ios-arrow-right"></i></a>
                            </div>
                            {/* <!-- movie cast --> */}
                            <div className="mvcast-item">
                              <div className="cast-it">
                                <div className="cast-left">
                                  <img src={cat3} alt="" />
                                  <a href="#">Mark Ruffalo</a>
                                </div>
                                <p>...  Bruce Banner/ Hulk</p>
                              </div>
                              <div className="cast-it">
                                <div className="cast-left">
                                  <img src={cat4} alt="" />
                                  <a href="#">Chris Evans</a>
                                </div>
                                <p>...  Steve Rogers/ Captain America</p>
                              </div>
                              <div className="cast-it">
                                <div className="cast-left">
                                  <img src={cat5} alt="" />
                                  <a href="#">Scarlett Johansson</a>
                                </div>
                                <p>...  Natasha Romanoff/ Black Widow</p>
                              </div>
                              <div className="cast-it">
                                <div className="cast-left">
                                  <img src={cat6} alt="" />
                                  <a href="#">Jeremy Renner</a>
                                </div>
                                <p>...  Clint Barton/ Hawkeye</p>
                              </div>
                            </div>
                            <div className="title-hd-sm">
                            </div>
                            {/* <!-- movie user review --> */}
                          </div>
                          <div className="col-md-4 col-xs-12 col-sm-12">
                            <div className="sb-it">
                              <h6>Director: </h6>
                              <p><a href="#">Joss Whedon</a></p>
                            </div>
                            <div className="sb-it">
                              <h6>Writer: </h6>
                              <p><a href="#">Joss Whedon,</a> <a href="#">Stan Lee</a></p>
                            </div>
                            <div className="sb-it">
                              <h6>Stars: </h6>
                              <p><a href="#">Robert Downey Jr,</a> <a href="#">Chris Evans,</a> <a href="#">Mark Ruffalo,</a><a href="#"> Scarlett Johansson</a></p>
                            </div>
                            <div className="sb-it">
                              <h6>Genres:</h6>
                              {/*Genres mapping */}
                              {movies.genres?.map((genre, i) => {
                                return (<p key={i}><a href="#">{genre.name}</a> </p>)
                              })}
                            </div>
                            <div className="sb-it">
                              <h6>Release Date:</h6>
                              <p>{movies.release_date} ({movies.original_language})</p>
                            </div>
                            <div className="sb-it">
                              <h6>Run Time:</h6>
                              <p>{movies.runtime}min</p>
                            </div>
                            <div className="sb-it">
                              <h6>MMPA Rating:</h6>
                              <p>PG-{movies.vote_count}</p>
                            </div>
                            <div className="sb-it">
                              <h6>Plot Keywords:</h6>
                              <p className="tags">
                                <span className="time"><a href="#">superhero</a></span>
                                <span className="time"><a href="#">marvel universe</a></span>
                                <span className="time"><a href="#">comic</a></span>
                                <span className="time"><a href="#">blockbuster</a></span>
                                <span className="time"><a href="#">final battle</a></span>
                              </p>
                            </div>
                            <div className="ads">
                              <img src={img1} alt="" />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* reviews tab */}
                      <div id="reviews" className={openTab === 2 ? "block" : "hidden"} style={{ marginLeft: "20px" }}>
                        <div className="row">
                          <div className="rv-hd">
                            <div className="div" >
                              <h3 >Related Movies To</h3>
                              <h2 >{movies.original_name ? movies.original_name : movies.original_title}</h2>
                              &nbsp; &nbsp;&nbsp;
                            </div>
                            <a href="#" className="redbtn" style={{ marginLeft: "345px" }}>Write Review</a>
                          </div>
                          <div className="topbar-filter">
                            <p>Found <span>{reviews.length} reviews</span> in total</p>
                            <label>Filter by:</label>
                            <select>
                              <option value="range">-- Choose option --</option>
                              <option value="saab">-- Choose option 2--</option>
                            </select>
                          </div>
                          <InfiniteScroll
                            pageStart={0}
                            dataLength={reviews.length}
                            next={getMovieReviews}
                            hasMore={true}
                            scrollableTarget="scrollableDiv"
                            loader={<Loader />}
                            endMessage={
                              <p style={{ textAlign: "center" }}>
                                <b>Yay! You have seen it all</b>
                              </p>
                            }
                          >
                            {/* mapping users reviews */}
                            {reviews.map((users, index) => {
                              return <div className="mv-user-review-item" key={index}>
                                <div className="user-infor">
                                  <img src="https://image.tmdb.org/t/p/original/1kks3YnVkpyQxzw36CObFPvhL5f.jpg" alt={movies.avatar_path} />
                                  <div>
                                    <h4 style={{ color: "#abb7c4", }} >{users.author}</h4>
                                    <div className="no-star">
                                      <ReactStars
                                        count={10}
                                        size={20}
                                        isHalf={false}
                                        emptyIcon={<i className="ion-android-star last"></i>}
                                        halfIcon={<i class="fa fa-star-half-o" aria-hidden="true"></i>}
                                        fullIcon={<i className="ion-ios-star"></i>}
                                        activeColor="#ffd700"
                                        value={users.author_details.rating}
                                        edit={false}
                                      />
                                    </div>
                                    <p className="time">
                                      {users.created_at}  by <a href="#"> {users.author_details.username}</a>
                                    </p>
                                  </div>
                                </div>
                                <p>{users.content}</p>
                              </div>
                            })}
                          </InfiniteScroll>
                        </div>
                      </div>
                      {/* cast tap */}
                      <div id="cast" className={openTab === 3 ? "block" : "hidden"} style={{ marginLeft: "10px" }}>
                        <div className="rv-hd" style={{ marginLeft: "-4px" }}>
                          <div className="div" >
                            <h3 >Cast & Crew of</h3>
                            <h2 >{movies.original_name ? movies.original_name : movies.original_title}</h2>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-8 col-sm-12 col-xs-12">
                            <div className="title-hd-sm">
                              <h4>Directors & Credit Writers</h4>
                            </div>
                            <div className="mvcast-item">
                              <div className="cast-it">
                                <div className="cast-left">
                                  <h4>JW</h4>
                                  <a href="#">Joss Whedon</a>
                                </div>
                                <p>...  Director</p>
                              </div>
                            </div>
                            <div className="title-hd-sm">
                              <h4>Directors & Credit Writers</h4>
                            </div>
                            {/* <!-- movie credit --> */}
                            <div className="mvcast-item">
                              <div className="cast-it">
                                <div className="cast-left">
                                  <img src={cat3} alt="" />
                                  <a href="#">Mark Ruffalo</a>
                                </div>
                                <p>...  Bruce Banner/ Hulk</p>
                              </div>
                              <div className="cast-it">
                                <div className="cast-left">
                                  <img src={cat4} alt="" />
                                  <a href="#">Chris Evans</a>
                                </div>
                                <p>...  Steve Rogers/ Captain America</p>
                              </div>
                              <div className="cast-it">
                                <div className="cast-left">
                                  <img src={cat5} alt="" />
                                  <a href="#">Scarlett Johansson</a>
                                </div>
                                <p>...  Natasha Romanoff/ Black Widow</p>
                              </div>
                            </div>
                            {/* cast */}
                            <div className="title-hd-sm">
                              <h4>Cast</h4>
                            </div>
                            <div className="mvcast-item">
                              <div className="cast-it">
                                <div className="cast-left">
                                  <img src={cat4} alt="" />
                                  <a href="#">Chris Evans</a>
                                </div>
                                <p>...  Steve Rogers/ Captain America</p>
                              </div>
                              <div className="cast-it">
                                <div className="cast-left">
                                  <img src={cat5} alt="" />
                                  <a href="#">Scarlett Johansson</a>
                                </div>
                                <p>...  Natasha Romanoff/ Black Widow</p>
                              </div>
                              <div className="cast-it">
                                <div className="cast-left">
                                  <img src={cat6} alt="" />
                                  <a href="#">Jeremy Renner</a>
                                </div>
                                <p>...  Clint Barton/ Hawkeye</p>
                              </div>
                            </div>
                            <div className="title-hd-sm">
                              <h4>Produced by</h4>
                            </div>
                            <div className="mvcast-item">
                              <div className="cast-it">
                                <div className="cast-left">
                                  <h4>LD</h4>
                                  <a href="#">Louis D’Esposito</a>
                                </div>
                                <p>...  executive producer</p>
                              </div>
                              <div className="cast-it">
                                <div className="cast-left">
                                  <h4>JF</h4>
                                  <a href="#">Jon Favreau</a>
                                </div>
                                <p>...  executive producer</p>
                              </div>
                              <div className="cast-it">
                                <div className="cast-left">
                                  <h4>KF</h4>
                                  <a href="#">Kevin Feige</a>
                                </div>
                                <p>...  producer</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* media tap */}
                      <div id="media" className={openTab === 4 ? "block" : "hidden"} style={{ marginLeft: "20px" }}>
                        <div className="rv-hd" style={{ marginLeft: "-20px" }} >
                          <div className="div">
                            <h3>Videos & Photos of</h3>
                            <h2>The Big Bang Theory</h2>
                          </div>
                        </div>
                        <div className="row">
                          <div className="title-hd-sm">
                            <h4>Videos <span>(8)</span></h4>
                          </div>
                          <div className="mvsingle-item media-item">
                            <div className="vd-item">
                              <div className="vd-it">
                                <img className="vd-img" src={item4} alt="" />
                                <a className="fancybox-media hvr-grow"
                                ><img
                                    src={play} alt="" /></a>
                              </div>
                              <div className="vd-infor">
                                <h6> <a href="#">Interview: Scarlett Johansson</a></h6>
                                <p className="time"> 3:27</p>
                              </div>
                            </div>
                            <div className="vd-item">
                              <div className="vd-it">
                                <img className="vd-img" src={item1} alt="" />
                                <a className="fancybox-media hvr-grow"
                                ><img
                                    src={play} alt="" /></a>
                              </div>
                              <div className="vd-infor">
                                <h6> <a href="#">Featurette: Meet Quicksilver & The Scarlet
                                  Witch</a></h6>
                                <p className="time"> 1: 31</p>
                              </div>
                            </div>
                            <div className="vd-item">
                              <div className="vd-it">
                                <img className="vd-img" src={item2} alt="" />
                                <a className="fancybox-media hvr-grow"
                                ><img
                                    src={play} alt="" /></a>
                              </div>
                              <div className="vd-infor">
                                <h6> <a href="#">Interview: Director Joss Whedon</a></h6>
                                <p className="time"> 1: 03</p>
                              </div>
                            </div>
                            <div className="vd-item">
                              <div className="vd-it">
                                <img className="vd-img" src={item3} alt="" />
                                <a className="fancybox-media hvr-grow"
                                ><img
                                    src={play} alt="" /></a>
                              </div>
                              <div className="vd-infor">
                                <h6> <a href="#">Interview: Mark Ruffalo</a></h6>
                                <p className="time"> 3:27</p>
                              </div>
                            </div>
                          </div>
                          <div className="title-hd-sm">
                            <h4>Photos <span> (21)</span></h4>
                          </div>
                          <div className="mvsingle-item media-item">
                            <div className="vd-item">
                              <div className="vd-it">
                                <img className="vd-img" src={img0} alt="" />
                              </div>
                            </div>
                            <div className="vd-item">
                              <div className="vd-it">
                                <img className="vd-img" src={img2} alt="" />
                              </div>
                            </div>
                            <div className="vd-item">
                              <div className="vd-it">
                                <img className="vd-img" src={img3} alt="" />
                              </div>
                            </div>
                            <div className="vd-item">
                              <div className="vd-it">
                                <img className="vd-img" src={img4} alt="" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* related movies tab */}
                      <div id="moviesrelated" className={openTab === 6 ? "block" : "hidden"} style={{ marginLeft: "20px" }}>
                        <div className="row">
                          <div className="rv-hd">
                            <div className="div" >
                              <h3 >Related Movies To</h3>
                              <h2 >Skyfall: Quantum of Spectre</h2>
                              &nbsp; &nbsp;&nbsp;
                            </div>
                          </div>
                          <div className="topbar-filter">
                            <p>Found <span>12 movies</span> in total</p>
                            <label>Sort by:</label>
                            <select>
                              <option value="popularity">Popularity Descending</option>
                              <option value="popularity">Popularity Ascending</option>
                              <option value="rating">Rating Descending</option>
                              <option value="rating">Rating Ascending</option>
                              <option value="date">Release date Descending</option>
                              <option value="date">Release date Ascending</option>
                            </select>
                          </div>
                          {/* mapping reated movie */}
                          <InfiniteScroll
                            pageStart={10}
                            dataLength={reatedMovie.length}
                            next={getReatedMovies}
                            hasMore={true}
                            scrollableTarget="scrollableDiv"
                            loader={<Loader />}
                            endMessage={
                              <p style={{ textAlign: "center" }}>
                                <b>Yay! You have seen it all</b>
                              </p>
                            }
                          >
                            {reatedMovie.map((movie, index) => {
                              return <div className="movie-item-style-2" key={index}>
                                {movie.poster_path ?
                                  <img src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} alt={movie.poster_path} />
                                  :
                                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Noimage.svg/739px-Noimage.svg.png" alt='..' />
                                }

                                {/* <img src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} alt={movie.poster_path} /> */}
                                <div className="mv-item-infor">
                                  <h6><a href="#">{movie.original_name ? movie.original_name : movie.original_title}  ({movie.original_language})  <span>{movie.first_air_date ? movie.first_air_date : movie.release_date.toString(0.4)}</span></a></h6>
                                  <p className="rate">
                                    <ReactStars
                                      count={10}
                                      size={20}
                                      isHalf={false}
                                      emptyIcon={<i className="ion-android-star last"></i>}
                                      halfIcon={<i class="fa fa-star-half-o" aria-hidden="true"></i>}
                                      fullIcon={<i className="ion-ios-star"></i>}
                                      activeColor="#ffd700"
                                      value={movie.vote_average}
                                      edit={false}
                                    />
                                  </p>
                                  <p className="describe">{movie.overview}</p>
                                  <p className="run-time"> Run Time:{movies.runtime}. <span>MMPA: PG-{movie.vote_count}</span> .
                                    <span>Release: {movie.release_date}</span></p>
                                </div>
                              </div>
                            })}
                          </InfiniteScroll>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default MovieDetails;