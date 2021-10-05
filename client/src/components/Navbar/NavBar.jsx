
import { MenuItems } from './MenuItems';
import { useEffect, useState } from "react";
import './Navbar.css';
import { Link, useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import RegistrationModal from "../Registration/RegistrationModal";
import LoginModal from "../Login/LoginModal";
import { logout } from "../../redux/actions/userAuth.actions";
import { updateCart } from "../../redux/actions/cartActions";
import { Dropdown } from "react-bootstrap";

const NavBar = () => {

    const history = useHistory()

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [clicked, setClicked] = useState(false);

    const [loginModal, setLoginModal] = useState(false);
    const showLoginModal = () => setLoginModal(true);
    const hideLoginModal = () => setLoginModal(false);

    const [regModal, setRegModal] = useState(false);
    const showRegModal = () => setRegModal(true);
    const hideRegModal = () => setRegModal(false);

    const handleClick = () => {
        if (clicked) {
            setClicked(false)
        } else {
            setClicked(true)
        }
    }

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    const getCartCount = () => {
        return cartItems.reduce((quantity, item) => quantity + Number(item.quantity), 0)
    }

    const handleLogout = () => {
        dispatch(logout())
        return history.push('/')
    }

    useEffect(() => {
        if (auth.authenticate) {
            hideLoginModal()
            console.log('Updating Cart.. NavBar');
            dispatch(updateCart());
        }
    }, [auth.authenticate])

    return (
        <nav className="NavbarItems">
            <div className="navbar-logo">
                <a href="/">
                    <img className=" navbar-logo-img" src={require('../../img/FarmToHomeLogoLong.png').default} alt="farm-to-home-logo" />
                </a>
            </div>
            <div className="menu-icon" onClick={handleClick}>
                <i className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
            </div>
            <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
                {
                    MenuItems.map((item, idx) => {
                        return (
                            <li key={idx}>
                                <Link className={item.cName} to={item.url}>{item.title}</Link>
                            </li>
                        )
                    })
                }
                <li>
                    <Link className="nav-links fas fa-shopping-cart cart" to="/cart">
                        <span className="cart-badge">{getCartCount()}</span>
                    </Link>
                </li>
            </ul>

            {
                !auth.authenticate
                    ? <div style={{ display: 'flex' }}>

                        <button
                            style={{ marginRight: '10px' }}
                            className="btn btn--primary btn--med sign-up-btn"
                            onClick={showLoginModal}>
                            Login
                        </button>

                        <button
                            style={{ marginRight: '10px' }}
                            className="btn btn--primary btn--med sign-up-btn"
                            onClick={showRegModal}>
                            Register
                        </button>
                        {/* <Link className="btn btn--primary btn--med sign-up-btn" to={'/register'}>Register</Link> */}
                    </div>
                    : <>
                        {/* <style type='text/css'>
                            {`
                                .dropdown-menu.show {
                                    transform: translate(-15px, 43px) !important; 
                                    inset: 2px auto auto 0px !important;
                                }
                                
                            `}
                        </style> */}
                        <Dropdown>
                            <Dropdown.Toggle
                                style={{ marginRight: '10px' }}
                                className="btn btn--primary btn--med sign-up-btn"
                            >
                                Brandon
                            </Dropdown.Toggle>
                            <Dropdown.Menu
                                className="dropdown-menu"
                            // style={{marginRight: '10px'}}
                            >

                                <Dropdown.Item style={{ marginRight: '10px' }} href="/account">
                                    Account
                                </Dropdown.Item>

                                <Dropdown.Item href="/account/orders">
                                    My Orders
                                </Dropdown.Item>

                            </Dropdown.Menu>
                        </Dropdown>

                        <button
                            style={{ marginRight: '10px' }}
                            className="btn btn--primary btn--med sign-up-btn"
                            onClick={handleLogout}>
                            Logout
                        </button>

                        {/* <div className="dropdown">
                            <button
                                style={{ marginRight: '10px' }}
                                className="btn dropdown-toggle btn--primary btn--med sign-up-btn"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            // onClick={() => console.log('dropdown')}
                            >
                                {auth.user.firstName}
                            </button>
                            <div
                                className='dropdown-menu'
                                aria-labelledby="dropdownMenuButton"
                                
                            >
                                <a href="/account/orders" className="dropdown-item">My Orders</a>
                            </div>
                        </div> */}

                        {/* <button
                            style={{ marginRight: '10px' }}
                            className="btn btn--primary btn--med sign-up-btn"
                            onClick={() => console.log('dropdown')}>
                            {auth.user.firstName}
                        </button> */}
                    </>
            }



            <RegistrationModal
                show={regModal}
                size={'lg'}
                onHide={hideRegModal}
                handleClose={hideRegModal}
            />

            <LoginModal
                show={loginModal}
                size={'lg'}
                onHide={hideLoginModal}
                handleClose={hideLoginModal}
            />

        </nav>
    )
}

// class NavBar extends Component{

//     state = {clicked: false}

//     handleClick = () => {
//         this.setState({clicked: !this.state.clicked})
//     }

//     render() {
//         return(
//             <nav className="NavbarItems">
//                 <div className="navbar-logo">
//                     <a href="/">
//                         <img className=" navbar-logo-img" src={ require('../../img/FarmToHomeLogoLong.png').default } alt="farm-to-home-logo" />
//                     </a>
//                 </div>
//                 <div className="menu-icon" onClick={this.handleClick}>
//                     <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
//                 </div>
//                 <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
//                     {MenuItems.map((item, idx) => {
//                         return(
//                             <li key={idx}>
//                                 <a className={item.cName} href={item.url}>
//                                     {item.title}
//                                 </a>
//                             </li>
//                         )
//                     })}
//                     <li>
//                         <a className="nav-links fas fa-shopping-cart cart" href="/cart"> 
//                             <span className="cart-badge">0</span>

//                         </a>
//                     </li>
//                 </ul>
//                 <div className="sign-up-btn">
//                     <Button>Sign Up</Button>
//                 </div>
//             </nav>
//         )
//     }
// }

export default NavBar;