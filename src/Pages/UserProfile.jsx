/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';

//images
import user from '../img/uploads/user-img.png';
import movie from '../img/uploads/mv1.jpg';

//packages
import { Link } from 'react-router-dom';

const UserProfile = () => {
    const [openTab, setOpenTab] = useState(1);
    return (
        <>
            <div className="hero user-hero">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="hero-ct">
                                <h1>Edward kennedy’s profile</h1>
                                <ul className="breadcumb">
                                    <li className="active"><Link to='/'>Home</Link></li>
                                    <li> <span className="ion-ios-arrow-right"></span>Profile</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="page-single">
                <div className="container">
                    <div className="row ipad-width">
                        <div className="col-md-3 col-sm-12 col-xs-12">
                            <div className="user-information">
                                <div className="user-img">
                                    <a href="#"><img src={user} alt="" /><br /></a>
                                    <a href="#" className="redbtn">Change avatar</a>
                                </div>
                                <div className="user-fav">
                                    <p>Account Details</p>
                                    <ul>
                                        {/* tab button profile */}
                                        <li className={openTab === 1 ? "active" : ""}>
                                            <a
                                                href="userprofile"
                                                onClick={e => { e.preventDefault(); setOpenTab(1); }}
                                            >
                                                Profile
                                            </a>
                                        </li>
                                        {/* tab button userFavorite mvoies */}
                                        <li className={openTab === 2 ? "active" : ""} >
                                            <a
                                                href='userfavorite'
                                                onClick={e => { e.preventDefault(); setOpenTab(2); }}
                                            >
                                                Favorite movies
                                            </a>
                                        </li>
                                        {/* tab button user rate movie */}
                                        <li className={openTab === 3 ? "active" : ""}>
                                            <a
                                                href='userratedmovie'
                                                onClick={e => { e.preventDefault(); setOpenTab(3); }}
                                            >
                                                Rated movies
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="user-fav">
                                    <p>Others</p>
                                    {/* logout button */}
                                    <ul>
                                        <li><Link to='/'>Log out</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* user profile */}
                        <div id="userprofile" style={{
                            backgroundColor: "#0b1a2a",
                            border: '3px solid #0f2133',
                            width: "855px",
                            height: "811px"
                        }} className={openTab === 1 ? "active" : "hidden"}>
                            <div className="form-style-1 user-pro" >
                                <form action="#" className="user">
                                    <h4>01. Profile details</h4>
                                    <div className="row">
                                        <div className="col-md-6 form-it">
                                            <label>Username</label>
                                            <input type="text" placeholder="edwardkennedy" />
                                        </div>
                                        <div className="col-md-6 form-it">
                                            <label>Email Address</label>
                                            <input type="text" placeholder="edward@kennedy.com" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 form-it">
                                            <label>First Name</label>
                                            <input type="text" placeholder="Edward " />
                                        </div>
                                        <div className="col-md-6 form-it">
                                            <label>Last Name</label>
                                            <input type="text" placeholder="Kennedy" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 form-it">
                                            <label>Country</label>
                                            <select>
                                                <option value="united">United States</option>
                                                <option value="saab">Others</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6 form-it">
                                            <label>State</label>
                                            <select>
                                                <option value="united">New York</option>
                                                <option value="saab">Others</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-2">
                                            <input className="submit" type="submit" value="save" />
                                        </div>
                                    </div>
                                </form>
                                <form action="#" className="password">
                                    <h4>02. Change password</h4>
                                    <div className="row">
                                        <div className="col-md-6 form-it">
                                            <label>Old Password</label>
                                            <input type="text" placeholder="**********" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 form-it">
                                            <label>New Password</label>
                                            <input type="text" placeholder="***************" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 form-it">
                                            <label>Confirm New Password</label>
                                            <input type="text" placeholder="*************** " />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-2">
                                            <input className="submit" type="submit" value="change" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {/* user favorite */}
                        <div id="userfavorite"
                            style={{
                                width: "855px",
                                height: "811px"
                            }}
                            className={openTab === 2 ? "block" : "hidden"}>
                            <div className="topbar-filter user">
                                <p>Found <span>1,608 movies</span> in total</p>
                                <label>Sort by:</label>
                                <select>
                                    <option value="range">-- Choose option --</option>
                                    <option value="saab">-- Choose option 2--</option>
                                </select>
                                <a href="userfavoritelist.html" className="list"><i className="ion-ios-list-outline active"></i></a>
                                <a href="userfavoritegrid.html" className="grid"><i className="ion-grid "></i></a>
                            </div>
                            <div className="flex-wrap-movielist user-fav-list">
                                <div className="movie-item-style-2">
                                    <img src={movie} alt="" />
                                    <div className="mv-item-infor">
                                        <h6><a href="#">oblivion <span>(2012)</span></a></h6>
                                        <p className="rate"><i className="ion-android-star"></i><span>8.1</span> /10</p>
                                        <p className="describe">Earth's mightiest heroes must come together and learn to fight as a team if they are to stop the mischievous Loki and his alien army from enslaving humanity...</p>
                                        <p className="run-time"> Run Time: 2h21’    .     <span>MMPA: PG-13 </span>    .     <span>Release: 1 May 2015</span></p>
                                        <p>Director: <a href="#">Joss Whedon</a></p>
                                        <p>Stars: <a href="#">Robert Downey Jr.,</a> <a href="#">Chris Evans,</a> <a href="#">  Chris Hemsworth</a></p>
                                    </div>
                                </div>
                            </div>
                            <div className="topbar-filter">
                                <label>Movies per page:</label>
                                <select>
                                    <option value="range">5 Movies</option>
                                    <option value="saab">10 Movies</option>
                                </select>

                                <div className="pagination2">
                                    <span>Page 1 of 2:</span>
                                    <a className="active" href="#">1</a>
                                    <a href="#">2</a>
                                    <a href="#">3</a>
                                    <a href="#">...</a>
                                    <a href="#">78</a>
                                    <a href="#">79</a>
                                    <a href="#"><i className="ion-arrow-right-b"></i></a>
                                </div>
                            </div>
                        </div>
                        {/* user RATED MOVIES */}
                        <div id="userratedmovie"
                            style={{
                                width: "855px",
                                height: "811px"
                            }}
                            className={openTab === 3 ? "block" : "hidden"}>
                            <div className="topbar-filter">
                                <p>Found <span>3 rates</span> in total</p>
                                <label>Sort by:</label>
                                <select>
                                    <option value="range">-- Choose option --</option>
                                    <option value="saab">-- Choose option 2--</option>
                                </select>
                            </div>
                            <div className="movie-item-style-2 userrate">
                                <img src={movie} alt="" />
                                <div className="mv-item-infor">
                                    <h6><a href="#">oblivion <span>(2012)</span></a></h6>
                                    <p className="time sm-text">your rate:</p>
                                    <p className="rate"><i className="ion-android-star"></i><span>9.0</span> /10</p>
                                    <p className="time sm-text">your reviews:</p>
                                    <h6>Best Marvel movie in my opinion</h6>
                                    <p className="time sm">02 April 2017</p>
                                    <p>“This is by far one of my favorite movies from the MCU. The introduction of new Characters both good and bad also makes the movie more exciting. giving the characters more of a back story can also help audiences relate more to different characters better, and it connects a bond between the audience and actors or characters. Having seen the movie three times does not bother me here as it is as thrilling and exciting every time I am watching it. In other words, the movie is by far better than previous movies (and I do love everything Marvel), the plotting is splendid (they really do out do themselves in each film, there are no problems watching it more than once.”</p>
                                </div>
                            </div>
                            <div className="movie-item-style-2 userrate">
                                <img src={movie} alt="" />
                                <div className="mv-item-infor">
                                    <h6><a href="#">into the wild <span>(2014)</span></a></h6>
                                    <p className="time sm-text">your rate:</p>
                                    <p className="rate"><i className="ion-android-star"></i><span>7.0</span> /10</p>
                                </div>
                            </div>

                            <div className="topbar-filter">
                                <label>Movies per page:</label>
                                <select>
                                    <option value="range">20 Movies</option>
                                    <option value="saab">10 Movies</option>
                                </select>
                                <div className="pagination2">
                                    <span>Page 1 of 1:</span>
                                    <a className="active" href="#">1</a>
                                    <a href="#"><i className="ion-arrow-right-b"></i></a>
                                </div>
                            </div>
                        </div>
                        {/* end */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserProfile;
