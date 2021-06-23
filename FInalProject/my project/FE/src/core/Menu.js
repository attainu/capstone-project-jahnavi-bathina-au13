import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth';

const isActive = (history, path) => {
    if (history.location.pathname === path) return { color: '#ff9900' };
    else return { color: '#ffffff' };
};

const Menu = ({ history }) => (
    <nav className="navbar navbar-inverse navbar-static-middle">
        <div className="container-fluid">
            <div className="navbar-header">
                    <Link className="navbar-brand" to="/">SocialMediaApp</Link>
            </div>

            <ul className="nav navbar-nav">
                <li>
                    <Link style={isActive(history, '/')} exact to="/">
                        <span className="glyphicon glyphicon-home">
                            Home
                        </span>    
                    </Link>
                </li>
            </ul>

            <ul className="nav navbar-nav">    
                <li>
                    <Link
                        style={isActive(history, '/users')}
                        exact to="/users"
                    >
                        <span className="glyphicon glyphicon-star">
                            Users
                        </span>
                    </Link>
                </li>
            </ul>

            <ul className="nav navbar-nav">      

                <li>
                    <Link to={`/post/create`} style={isActive(history, `/post/create`)}>
                        <span className="glyphicon glyphicon-plus">
                            CreatePost
                        </span>
                    </Link>
                </li>
            </ul>

            {!isAuthenticated() && (
                <div>
                    <ul className="nav navbar-nav">
                        <li>
                        <Link className="nav-link" style={isActive(history, '/signup')} to="/signup">
                            <span className="glyphicon glyphicon-user"></span>
                                Sign Up
                            </Link>
                        </li>
                    </ul>     

                    <ul className="nav navbar-nav">    
                        <li>
                            <Link style={isActive(history, '/signin')} to="/signin">
                            <span className="glyphicon glyphicon-log-in"></span>
                                Sign In
                            </Link>
                        </li>
                    </ul>    
                </div>    
                    
            )}

            {isAuthenticated() && isAuthenticated().user.role === 'admin' && (
                <ul className="nav navbar-nav ">
                    <li>
                        <Link to={`/admin`} style={isActive(history, `/admin`)}>
                        <span className="glyphicon glyphicon-search">
                            Admin
                        </span>
                
                        </Link>
                    </li>
                </ul>    
            )}

            {isAuthenticated() && (
                <React.Fragment>
                <ul className="nav navbar-nav ">
                    <li>
                        <Link to={`/findpeople`} style={isActive(history, `/findpeople`)}>
                        <span className="glyphicon glyphicon-search">
                            Findpeople
                        </span>
                        </Link>
                    </li>
                </ul>

                <ul className="nav navbar-nav ">

                    <li>
                        <Link
                            to={`/user/${isAuthenticated().user._id}`}
                            style={isActive(history, `/user/${isAuthenticated().user._id}`)}
                            
                        >   <span className="glyphicon glyphicon-fire">
                            {`${isAuthenticated().user.name}'s-profile`}
                        </span>
                            
                        </Link>
                    </li>
                </ul>    

                <ul className="nav navbar-nav ">

                    <li>
                        <span
                            className="glyphicon glyphicon-log-out"
                            style={{ cursor: 'pointer', color: '#fff' }}
                            onClick={() => signout(() => history.push('/'))}
                        >
                            Sign Out
                        </span>
                    </li>
                </ul>    
                </React.Fragment>
            )}
        </div>    
    </nav>
);

export default withRouter(Menu);
