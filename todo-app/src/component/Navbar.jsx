import React, { useContext } from 'react';
import logo from '../assets/logo (1).png';
import { Link } from 'react-router-dom';
import AuthContext from '../auth/AuthContext';


function Navbar(props) {
 
 

 const {user} = useContext(AuthContext)


  const logout = ()=>{
    localStorage.removeItem("todoUser");
  }


 

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white" aria-label="Fifth navbar example">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
            <img src={logo} alt="todo" />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample05" aria-controls="navbarsExample05" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
    
    
          <div className="collapse navbar-collapse" id="navbarsExample05">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
             
              {
                !user ?
              <>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
              </> :

              <>
              <li className="nav-item">
                <Link className="nav-link" to="/task-list">Task List</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/create-task">Create Task</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/profile">Profile</Link>
              </li>
             
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="#" data-bs-toggle="dropdown" aria-expanded="false">{user.name}</Link>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="#">Action</Link></li>
                  <li><Link className="dropdown-item" to="#">Another action</Link></li>
                  <li><Link className="dropdown-item" to="#" onClick={logout}>Logout</Link></li>
                </ul>
              </li>
              </>
              }
            </ul>         
          </div>
        </div>
      </nav>
    );
}

export default Navbar;
