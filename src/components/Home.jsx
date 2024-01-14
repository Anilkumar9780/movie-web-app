/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef } from 'react';

// images
import img2 from '../img/uploads/ads1.png'
import facebook from '../img/facebook.jpg';
import Tweet from '../img/tweet.png'

//components
import { Movies, Trending, TvShow, Search } from '../Pages';

//packages
import { Routes, Route, NavLink, Link } from "react-router-dom";

const Home = ({
    searchMovieList,
    handlesearch
}) => {
    //ref div
    const divRef = useRef(null);

    /**
     * Back to top button 
     */
    const handleonScrollTop = () => {
        divRef.current.scrollIntoView({ behavior: "smooth" })
    };

    return (
        <div ref={divRef}>
            <div className="hero common-hero">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="hero-ct">
                                <h1> movie listing - grid</h1>
                                <ul className="breadcumb">
                                    <li className="active"><Link to="/" >Home</Link></li>
                                    <li> <span className="ion-ios-arrow-right"></span> movie listing</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="page-single">
                <div className="container">
                    <div className="row ipad-width">
                        <div className="col-md-8 col-sm-12 col-xs-12">
                            <div className="topbar-filter">
                                <p>Found <span> movies</span> in total</p>
                                <label>Sort by:</label>
                                <select>
                                    <option value="popularity">Descending</option>
                                    <option value="popularity">Ascending</option>
                                    <option value="rating">Rating Descending</option>
                                    <option value="rating">Rating Ascending</option>
                                    <option value="date">Release date Descending</option>
                                    <option value="date">Release date Ascending</option>
                                </select>
                                <NavLink className="list"><i className="ion-ios-list-outline "></i></NavLink>
                                <NavLink className="grid"><i className="ion-grid active"></i></NavLink>
                            </div>
                            <div className="flex-wrap-movielist">
                                <Routes>
                                    <Route exact path='/' element={<Movies />} />
                                    <Route exact path='/movies' element={<Movies />} />
                                    <Route exact path='/trending' element={<Trending />} />
                                    <Route exact path='/tvshow' element={<TvShow />} />
                                    <Route exact path='/search' element={<Search searchMovieList={searchMovieList} handlesearch={handlesearch} />} />
                                </Routes>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-12 col-xs-12">
                            <div className="sidebar">
                                <div className="searh-form">
                                    <h4 className="sb-title">Search for movie</h4>
                                    <form className="form-style-1" action="#">
                                        <div className="row">
                                            <div className="col-md-12 form-it">
                                                <label>Movie name</label>
                                                <input type="text" placeholder="Enter keywords" />
                                            </div>
                                            <div className="col-md-12 form-it">
                                                <label>Genres & Subgenres</label>
                                                <div className="group-ip">
                                                    <select name="skills" multiple="" className="ui fluid dropdown">
                                                        <option value="">Enter to filter genres</option>
                                                        <option value="Action1">Action 1</option>
                                                        <option value="Action2">Action 2</option>
                                                        <option value="Action3">Action 3</option>
                                                        <option value="Action4">Action 4</option>
                                                        <option value="Action5">Action 5</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-12 form-it">
                                                <label>Rating Range</label>
                                                <select>
                                                    <option value="range">-- Select the rating range below --</option>
                                                    <option value="saab">-- Select the rating range below --</option>
                                                </select>
                                            </div>
                                            <div className="col-md-12 form-it">
                                                <label>Release Year</label>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <select>
                                                            <option value="range">From</option>
                                                            <option value="number">10</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <select>
                                                            <option value="range">To</option>
                                                            <option value="number">20</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12 ">
                                                <input className="submit" type="submit" value="submit" />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="ads">
                                    <img src={img2} alt="" />
                                </div>
                                <div className="sb-facebook sb-it">
                                    <h4 className="sb-title">Find us on Facebook</h4>
                                    <img src={facebook} alt={facebook}></img>
                                </div>
                                <div className="sb-twitter sb-it">
                                    <h4 className="sb-title">Tweet to us</h4>
                                    <div className="slick-tw">
                                        <div className="tweet item" id="">
                                            <img src={Tweet} alt={Tweet} />
                                        </div>
                                        <div className="tweet item" id="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fixed-bottom" style={{ width: "100px", height: "50px" }}>
                <p style={{ marginTop: "-100px", marginLeft: "1800px", }}>
                    <a className='btn btn-outline-primary' onClick={handleonScrollTop} style={{ cursor: "pointer" }}>Back to top <i className="fa fa-arrow-up"></i></a>
                </p>
            </div>
        </div>
    )
}
export default Home;