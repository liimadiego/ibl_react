import { FaBookOpen } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';

class Header extends Component {
    render(){
        return (
            <>
              <header>
                  <div className='logo_container'> 
                      <Link to='/'>
                          <span><FaBookOpen /></span>
                          <p>Library</p>
                      </Link>
                  </div>
              </header>
            </>
          );
    }
  }

export default Header;