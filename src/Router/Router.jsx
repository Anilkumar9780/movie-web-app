/* eslint-disable no-self-compare */
import React, { useState } from 'react';

//components
import { Home, Footer, NavBar, NotFoundPage } from '../components';
import { MovieDetails, UserProfile } from '../Pages'
import { GET_SERACH_LIST } from '../Service/Service';

//packages
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export const Router = () => {
    const [searchMovieList, setSearchMovieList] = useState([]);
    const [searchMovies, setSearchMovies] = useState('');
    const [medType, setMedType] = useState('');
    const [mediaType, setMediaType] = useState();
    const [currPage, setCurrPage] = useState(1);
    const navigate = useNavigate();
    const location = useLocation();
    const pathid = location.pathname.split('/moviedetails/');


    /** 
     * onchange input search  
     * @param {object} event 
     */
    const handleSelectOnchange = (event) => {
        setMediaType(event.target.value);
    }

    /**
     * submit handle search 
    */
    const handleSearch = async () => {
        setCurrPage(currPage + 1)
        try {
            const { data } = await GET_SERACH_LIST(mediaType, searchMovies, currPage + 1);
            setSearchMovieList(data.results);
            navigate('/search');
            setSearchMovies('')
        } catch (error) {
            toast.error(error, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        setSearchMovies('')
    };

    return (
        <>
            <NavBar
                handleSelectOnchange={handleSelectOnchange}
                handleSearch={handleSearch}
                mediaType={mediaType}
                setSearchMovies={setSearchMovies}
                setMediaType={setMediaType}
            />
            {
                location.pathname === `/moviedetails/${pathid[1]}` ?
                    (
                        <Routes>
                            <Route exact path='/userprofile' element={<UserProfile />} />
                            <Route exact path='/moviedetails/:movie_id' element={<MovieDetails medType={medType} />} />
                            <Route path='*' exact={true} element={<NotFoundPage />} />
                        </Routes>
                    ) : (
                        <Home searchMovieList={searchMovieList} handleSearch={handleSearch} />
                    )
            }
            <Footer
                medType={medType}
                setMedType={setMedType}
            />
        </>
    )
}

