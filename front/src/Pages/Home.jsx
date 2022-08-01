import React from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap"
import {TbMessages} from "react-icons/tb";

const Home = () => {
    return (
        <Container fluid>
            <Row>
                <Col md={6} className={"d-flex flex-column justify-content-center align-items-center"}>
                    <h1>MERN React chat</h1>
                    <p>Start communicate with your friend</p>
                    <LinkContainer to={"/chat"}>
                        <Button variant={"success"}>
                            Get Started
                            <TbMessages className={"home__button-icon"}/>
                        </Button>
                    </LinkContainer>
                </Col>
                <Col md={6} className={"home__bg"}>

                </Col>
            </Row>
        </Container>
    );
};

export default Home;
