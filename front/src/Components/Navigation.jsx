import React from 'react';
import {Button, Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap"
import {useSelector} from "react-redux";
import {useLogoutUserMutation} from "../services/appApi";

const Navigation = () => {
    const user = useSelector(state => state.user)
    const [logoutUser] = useLogoutUserMutation()
    const handleLogout = async (e)=>{
        e.preventDefault()
        await logoutUser(user).then()
        window.location.replace("/")
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <LinkContainer to={"/"}>
                    <Navbar.Brand>React-Bootstrap</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <LinkContainer to={"/chat"}>
                            <Nav.Link>Chat</Nav.Link>
                        </LinkContainer>
                        {
                            !user && (
                                <LinkContainer to={"/login"}>
                                    <Nav.Link>Login</Nav.Link>
                                </LinkContainer>
                            )
                        }
                        {
                            user && (
                                <NavDropdown title={
                                    <>
                                        <img src={user.picture} alt="" className={"navbar-user__avatar"}/>
                                        {user.name}
                                    </>
                                } id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">
                                        Another action
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item>
                                        <Button variant={"danger"} onClick={handleLogout}>Logout</Button>
                                    </NavDropdown.Item>
                                </NavDropdown>
                            )
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
