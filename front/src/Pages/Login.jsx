import React, {useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useLoginUserMutation} from "../services/appApi";

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [userLogin, {isLoading, error}] = useLoginUserMutation()
    const navigate = useNavigate()

    const handleInput = (e) => {
        switch (e.target.name) {
            case "email":
                return setEmail(e.target.value)
            case "password":
                return setPassword(e.target.value)
            default:
                return ""
        }
    }

    const handleLogin = (event)=>{
        event.preventDefault()
        userLogin({email, password}).then(({data})=>{
            if (data){
                navigate("/chat")
            }
        })
    }

    return (
        <Container fluid>
            <Row>
                <Col md={5} className={"login__bg"}></Col>
                <Col md={7} className={"d-flex flex-column justify-content-center align-items-center"}>
                    <Form className={"chat-form"} onSubmit={(e)=>handleLogin(e)}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name={"email"}
                                value={email}
                                onChange={(e)=>handleInput(e)}
                                required
                            />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name={"password"}
                                value={password}
                                onChange={(e)=>handleInput(e)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                        <div className={"py-4"}>
                            <p className={"text-center"}>Don't have account? <Link to={"/signup"}>SignUp</Link></p>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
