import React from 'react';
import illustration from '../assets/illustration (1).png';
import { Link, Outlet } from 'react-router-dom';

function Home(props) {
    return (
        <div className='container-fulid h-100'>
            <div className='row h-100'>
                <div className="col-lg-6 d-flex flex-column align-items-center justify-content-center h-100 bg-primary">
                    <h1 className='title display-4 text-white text-center mt-4'>
                        An App to<br />
                        make your life<br />
                        <span className='display-1'>Easy</span>
                    </h1>
                    <img className='img-fulid mt-3' src={illustration} alt="illustration" />
                </div>

                <div className="col-lg-6 d-flex align-items-center justify-content-center h-100">
                    <div className="card w-50">
                        <div className="card-header d-flex">
                            <Link to="/login"className="w-50 py-2 text-center text-primary">Login</Link>
                            
                            <Link to="/register"className="w-50 py-2 text-center text-primary">Register</Link>


                        </div>
                        <div className="card-body">
                            
                            <Outlet/>

                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
}
export default Home;