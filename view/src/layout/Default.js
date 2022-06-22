import React, {useContext} from 'react';
import {Navbar,Container,Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { FiLogOut } from "react-icons/fi";
import {userConnect} from '../store/userConnect';
import Logo from '../assets/logo.png'
import './Default.css';

function Default(){

    const {connect,setConnect} = useContext(userConnect);

    const Logout = (e) => {
        localStorage.setItem('token', "");
        window.location.reload();
    }

    return(
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand>
                <Link to="/">
                    <img width="150px" height="auto" className="img-responsive"
                     src={Logo}  alt="logo" />           
                </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        {connect && <Nav.Link><Link className="link" to="/">Lenders
                        </Link></Nav.Link>}
                        {connect && <Nav.Link><Link className="link" to="/projects">Projects
                        </Link></Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
                {connect && <div onClick={Logout} className="justify-content-end logout">
                Logout <FiLogOut className="logo-logout"/></div>}
            </Container>
        </Navbar>
    )
}
export default Default;