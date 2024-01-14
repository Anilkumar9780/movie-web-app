import React from 'react';

//image
// import logo from '../../img/logo1.png';
import error from '../img/uploads/err-img.png'

//package
import { Link, NavLink } from 'react-router-dom';

 const NotFoundPage = () => {
    return (
        <div className="page-single-2">
            <div className="container">
                <div className="row">
                    <div className="middle-content" style={{marginLeft:"200px", marginTop:"100px"}}>
                        <NavLink href="index-2.html"><img className="md-logo"  alt="" /></NavLink>
                        <img src={error} alt=""  />
                        <h1>Page not found</h1>
                        <Link to="/" className="redbtn">go home</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default NotFoundPage;