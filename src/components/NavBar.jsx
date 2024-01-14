import React, { useState, useEffect } from 'react';

// images
import img4 from '../img/logo1.png';
import DefaultProfile from '../img/DefaultProfile.jpg'
import img1 from '../img/uploads/topsearch.png';

// package 
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'

//style
import '../css/NavBar.css'

//package ui
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import { DriveFolderUploadOutlined } from "@mui/icons-material";

//firebase component
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { auth, db, storage } from "../Service/firebase";

const NavBar = ({
  //props
  searchMovies,
  setSearchMovies,
  mediaType,
  handleSelectOnchange,
  handlesearch
}) => {
  //state
  const [open, setOpen] = useState(false);
  const [opens, setOpens] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [scroll, setScroll] = useState(0);
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  /**
   * open modal login page
   */
  const handleClickLogin = () => {
    setOpens(true);
    setOpen(false)
  };

  /**
   * open modal sign up page
   */
  const handleClicksignUp = () => {
    setOpen(true);
    setOpens(false)
  };

  /**
   * hadle close modal
   */
  const handleClose = () => {
    setOpen(false);
    setOpens(false);
  };

  /**
   * on scroll fixed navbar
   */
  useEffect(() => {
    window.onscroll = () => {
      setSticky(window.pageYOffset === 0 ? false : true);
      return () => (window.onscroll = null);
    };
  }, []);

  /**
   * progress bar scroll
   */
  useEffect(() => {
    let progressBarHandler = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScroll(scroll);
    }
    window.addEventListener("scroll", progressBarHandler);
    return () => window.removeEventListener("scroll", progressBarHandler);
  });

  /**
   * handle login User
   * @param {object} e 
   */
  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
      toast.success("Login Successfully", {
        position: toast.POSITION.TOP_RIGHT
      })
    } catch (error) {
      toast.error(error, "Something went wrong", {
        position: toast.POSITION.TOP_RIGHT
      })
      setLoading(false);
    }
    setOpen(false)
    setOpens(false)
  };

  /**
     * handle Register User
     * @param {object} e 
     */
  const handleRegister = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, "usersImages/" + displayName);
      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        (error) => {
          toast.error(error, "Something went wrong", {
            position: toast.POSITION.TOP_RIGHT
          })
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
          });
        }
      );
    } catch (error) {
      toast.error(error, "Something went wrong", {
        position: toast.POSITION.TOP_RIGHT
      })
    }
    navigate("/")
    toast.success("Register Successfully", {
      position: toast.POSITION.TOP_RIGHT
    });
    setLoading(false);
    setOpen(false)
    setOpens(false)
  };


  return (
    <>
      {/* Login page modal */}
      <Modal
        open={opens}
        fullScreen={fullScreen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <section className="vh" style={{ marginTop: "200px" }}>
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card shadow-2-strong" style={{ borderRadius: "1rem", backgroundColor: "#041424" }}>
                  <div className="card-body p-5 text-center">
                    <NavLink onClick={handleClose} className="close">x</NavLink >
                    <form onSubmit={handleLogin} className="form-style-1">
                      <h3 className="mb-5">Login</h3>
                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          placeholder="Email"
                          id="email"
                          required
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" for="typeEmailX-2"></label>
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          placeholder="Password"
                          id="password"
                          minLength={6}
                          required
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" for="typePasswordX-2"></label>
                      </div>
                      <div className="form-check d-flex justify-content-start mb-5">
                        <input className="form-check-input" type="checkbox" value="" id="form1Example3" required />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <label className="form-check-label" for="form1Example3"> Remember password </label>
                      </div>
                      <button className="btn btn-primary btn-lg btn-block" type="submit">Login</button>
                      <hr className="my-4" />
                      <button className="btn btn-lg btn-block btn-primary" style={{ backgroundColor: "#dd4b39" }}
                        type="submit"><i className="fa fa-google me-2"></i> Sign in with google</button>
                      <button className="btn btn-lg btn-block btn-primary mb-3" style={{ backgroundColor: "#3b5998" }}
                        type="submit"><i className="fa fa-facebook me-3"></i> Sign in with facebook</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Modal>
      {/* sign up page modal */}
      <Modal
        open={open}
        fullScreen={fullScreen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <section className="vh" style={{ marginTop: "120px" }}>
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card shadow-2-strong" style={{ borderRadius: "1rem", backgroundColor: "#041424" }}>
                  <div className="card-body p-5 text-center">
                    <NavLink onClick={handleClose} className="close">x</NavLink >
                    <form onSubmit={handleRegister} className="form-style-1">
                      <h3 className="mb-5">Sign Up</h3>
                      <div className='from-outline mb-4'>
                        <div className="top">
                          <img
                            src={
                              img
                                ? URL.createObjectURL(img)
                                : { DefaultProfile }
                            }
                            alt=""
                            className="profileImg"
                          />
                          <div className="formInput">
                            <label htmlFor="file">
                              Image: <DriveFolderUploadOutlined className="icon" />
                              <input
                                type="file"
                                name="file"
                                id="file"
                                accept=".png,.jpeg,.jpg"
                                style={{ display: "none" }}
                                onChange={(e) => setImg(e.target.files[0])}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          placeholder="Full Name"
                          id="displayName"
                          required
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" for="typeEmailX-2"></label>
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          placeholder="Email"
                          id="email"
                          required
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" for="typeEmailX-2"></label>
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          placeholder="Password"
                          id="password"
                          minLength={6}
                          required
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" for="typePasswordX-2"></label>
                      </div>
                      <div className="form-check d-flex justify-content-start mb-5">
                        <input className="form-check-input" type="checkbox" value="" id="form1Example3" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <label className="form-check-label" for="form1Example3" required> Remember password </label>
                      </div>
                      <button className="btn btn-primary btn-lg btn-block" type="submit">sign up</button>
                      <hr className="my-4" />
                      <button className="btn btn-lg btn-block btn-primary" style={{ backgroundColor: "#dd4b39" }}
                        type="submit"><i className="fa fa-google me-2"></i> sign up with google</button>
                      <button className="btn btn-lg btn-block btn-primary mb-3" style={{ backgroundColor: "#3b5998" }}
                        type="submit"><i className="fa fa-facebook me-3"></i> sign up with facebook</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Modal>
      {/* header page */}
      <header className={` ht-header ${sticky ? 'sticky' : ''}`}>
        <div className="progressBarContainer">
          <div className="progressBar" style={{ transform: `scale(${scroll}, 1)`, opacity: `${scroll}` }} />
        </div>
        <div className="container">
          <nav className="navbar navbar-default navbar-custom">
            <div className="navbar-header logo">
              <div className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <span className="sr-only">Toggle navigation</span>
                <div id="nav-icon1">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <NavLink href="index-2.html"><img className="logo" src={img4} alt="" width="119" height="58" /></NavLink >
            </div>
            <div className="collapse navbar-collapse flex-parent" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav flex-child-menu menu-left">
                <li className="dropdown first">
                  <Link to="/" >
                    Home
                  </Link >
                </li>
                <li className="dropdown first">
                  <NavLink className="btn btn-default dropdown-toggle lv1" data-toggle="dropdown" data-hover="dropdown">
                    movies
                  </NavLink >
                  <ul className="dropdown-menu level1">
                    <li><Link to="/">Movies</Link></li>
                    <li><Link to="/trending">Trending Movies</Link></li>
                  </ul>
                </li>
                <li className="dropdown first">
                  <NavLink className="btn btn-default dropdown-toggle lv1" data-toggle="dropdown" data-hover="dropdown">
                    Tv Show
                  </NavLink >
                  <ul className="dropdown-menu level1">
                    <li><Link to='/tvshow'>Tv Series</Link></li>
                    <li><Link to='/trending'>Trending Tv Series</Link></li>
                  </ul>
                </li>
                <li className="dropdown first">
                  <NavLink className="btn btn-default dropdown-toggle lv1" data-toggle="dropdown" data-hover="dropdown">
                    news
                  </NavLink >
                  <ul className="dropdown-menu level1">
                    <li><NavLink href="bloglist.html">blog </NavLink ></li>
                  </ul>
                </li>
                <li className="dropdown first">
                  <NavLink className="btn btn-default dropdown-toggle lv1" data-toggle="dropdown" data-hover="dropdown">
                    user
                  </NavLink >
                  <ul className="dropdown-menu level1">
                    <li><Link to="/userprofile">user profile </Link></li>
                  </ul>
                </li>
              </ul>
              <ul className="nav navbar-nav flex-child-menu menu-right">
                <li><NavLink href="#">Help</NavLink ></li>
                <li className="btn loginLink"><NavLink onClick={handleClickLogin}>LOG In</NavLink ></li>
                <li className="btn signupLink"><NavLink onClick={handleClicksignUp}>sign up</NavLink ></li>
              </ul>
            </div>
          </nav>
          {/* search bar */}
          <div className="top-search">
            <select onChange={handleSelectOnchange} value={mediaType}>
              <option value="movie">TV show</option>
              <option value="tv">Movies</option>
            </select>
            <input
              onChange={e => setSearchMovies(e.target.value)}
              value={searchMovies}
              type="text"
              placeholder="Search for NavLink  movie, TV Show or celebrity that you are looking for" />
            <button className="btn btn-outline-dark" onClick={handlesearch} type="submit"><img src={img1} alt={img1}></img></button>
          </div>
        </div>
      </header>
      {loading && <div id="preloader">
        <img class="logo" src={img4} alt="" width="119" height="58" />
        <div id="status">
          <span></span>
          <span></span>
        </div>
      </div>}
    </>
  )
}

export default NavBar;

