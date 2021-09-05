import { useState } from "react";
import './Navbar.css';

// Routing
import { Link } from 'react-router-dom'

// Components
import { NoLogMenuItems } from './MenuItems';

// Redux
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../../redux/actions/adminAuth.actions'

const NavBar = () => {

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [clicked, setClicked] = useState(false)
    const handleClick = () => {
        if (clicked) {
            setClicked(false)
        } else {
            setClicked(true)
        }
    }

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <nav className="NavbarItems">
            <div className="navbar-logo">
                <Link to='/' className="navbar-logo-link"><h2>Admin</h2></Link>
            </div>
            <div className="menu-icon" onClick={handleClick}>
                <i className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
            </div>
            <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
                {
                    !auth.authenticate
                        ? NoLogMenuItems.map((item, idx) => {
                            return (
                                <Link key={idx} className={item.cName} to={item.url}>{item.title}</Link>
                            )
                        })
                        : <>
                            <Link className="nav-links" to='/'>Home</Link>
                            <li>
                                <span onClick={handleLogout} className="nav-links">Logout</span>
                            </li>
                        </>
                }
            </ul>
        </nav>
    )
}

export default NavBar;