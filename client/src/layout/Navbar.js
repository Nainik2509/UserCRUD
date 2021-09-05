import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

const Navbar = () => {
    const history = useHistory()
    const userLoggedIn = useSelector(state => state.authApp.data)
    return (
        <nav>
            <div className="nav-wrapper">
                <Link to="/" className="brand-logo">{userLoggedIn && userLoggedIn.role.toUpperCase()}</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <button className="btn green" style={{ marginRight: '15px' }} onClick={() => {
                        localStorage.clear()
                        history.push('/')
                        window.location.reload();
                    }}>Logout</button>
                </ul>
            </div>
        </nav>

    )
}

export default Navbar
