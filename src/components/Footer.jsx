import React, { useState } from 'react';

// image
import img from '../img/logo1.png'
import img1 from '../img/uploads/error-bg.jpg'

//mui-material package
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MovieIcon from '@mui/icons-material/Movie';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { makeStyles } from '@material-ui/core/styles';


// package
import { Link, NavLink } from 'react-router-dom';

//style 
const useStyles = makeStyles({
	root: {
		width: 2000,
		backgroundImage: `url(${img1})`,
		background: 'no-repeat',
		color: "#abb7c4",
		flexWrap: 'wrap'
	},
});

const Footer = ({
	setMedType
}) => {
	//states
	const classes = useStyles();
	const [value, setValue] = useState('');


	/**
	 *  handle onchage icon bar
	 * @param {object} event 
	 * @param {string} newValue 
	 */
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<>
			<div className="fixed-bottom">
				<BottomNavigation
					value={value}
					onChange={handleChange}
					className={classes.root}
					spacing={5}
				>
					<BottomNavigationAction
						style={{ color: "whitesmoke", marginLeft: "-120px" }}
						label="Movies"
						value="Movies"
						icon={
							<Link to='/movies' >
								<MovieIcon
									onClick={(e) => setMedType('movie')}
									style={{ fontSize: 31, color: "#abb7c4" }}
								/>
							</Link>
						}
					/>
					<BottomNavigationAction
						style={{ color: "whitesmoke", marginLeft: "300px" }}
						label="TV Show"
						value="TV Show"
						icon={
							<Link to='/tvshow' >
								<LiveTvIcon
									onClick={(e) => setMedType('tv')}
									style={{ fontSize: 31, color: "#abb7c4" }}
								/>
							</Link>
						}
					/>
					<BottomNavigationAction
						style={{ color: "whitesmoke", marginLeft: "350px" }}
						label="Trending"
						value="Trending"
						icon={
							<Link to='/trending' >
								<WhatshotIcon
									onClick={(e) => setMedType('movie')}
									style={{ fontSize: 31, color: "#abb7c4" }}
								/>
							</Link>
						}
					/>
				</BottomNavigation>
			</div>
			<footer className="ht-footer">
				<div className="container">
					<div className="flex-parent-ft">
						<div className="flex-child-ft item1">
							<NavLink ><img className="logo" src={img} alt="" /></NavLink>
							<p>5th Avenue st, manhattan<br />
								New York, NY 10001</p>
							<p>Call us: <NavLink >(+01) 202 342 6789</NavLink></p>
						</div>
						<div className="flex-child-ft item2">
							<h4>Resources</h4>
							<ul>
								<li><NavLink >About</NavLink></li>
								<li><NavLink >Blockbuster</NavLink></li>
								<li><NavLink >Contact Us</NavLink></li>
								<li><NavLink >Forums</NavLink></li>
								<li><NavLink >Blog</NavLink></li>
								<li><NavLink >Help Center</NavLink></li>
							</ul>
						</div>
						<div className="flex-child-ft item3">
							<h4>Legal</h4>
							<ul>
								<li><NavLink >Terms of Use</NavLink></li>
								<li><NavLink >Privacy Policy</NavLink></li>
								<li><NavLink >Security</NavLink></li>
							</ul>
						</div>
						<div className="flex-child-ft item4">
							<h4>Account</h4>
							<ul>
								<li><NavLink >My Account</NavLink></li>
								<li><NavLink >Watchlist</NavLink></li>
								<li><NavLink >Collections</NavLink></li>
								<li><NavLink >User Guide</NavLink></li>
							</ul>
						</div>
						<div className="flex-child-ft item5">
							<h4>Newsletter</h4>
							<p>Subscribe to our newsletter system now <br /> to get latest news from us.</p>
							<form action="#">
								<input type="text" placeholder="Enter your email..." />
							</form>
							<NavLink className="btn">Subscribe now <i className="fa fa-arrow-right"></i></NavLink>
						</div>
					</div>
				</div>
				<div className="ft-copyright">
					<div className="ft-left">
					</div>
					<div className="backtotop">
						<p><NavLink id="back-to-top">Back to top <i className="fa fa-arrow-up"></i></NavLink></p>
					</div>
				</div>
			</footer>
			{/*  */}
		</>
	)
}
export default Footer;
