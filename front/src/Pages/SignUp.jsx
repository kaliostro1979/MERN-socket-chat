import React, {useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useSignupUserMutation} from "../services/appApi";
import {Link, useNavigate} from "react-router-dom";
import BotImage from "../assets/images/bot.avif"
import {FaPlus} from "react-icons/fa";


const SignUp = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    //Image upload state
    const [image, setImage] = useState(null)
    const [uploadingImage, setUploadingImage] = useState(false)
    const [previewImage, setPreviewImage] = useState(null)
    const [signUpUser, {isLoading, error}] = useSignupUserMutation()
    const navigate = useNavigate()


    const validateImage = (event) => {
        const file = event.target.files[0]
        if (file.size > 1048576) {
            return alert('Max file size must be 1Mb')
        } else {
            setImage(file)
            setPreviewImage(URL.createObjectURL(file))
        }
    }

    const handleInput = (e) => {
        switch (e.target.name) {
            case "email":
                return setEmail(e.target.value)
            case "name":
                return setName(e.target.value)
            case "password":
                return setPassword(e.target.value)
            default:
                return ""
        }
    }

    const uploadImage = async (image) => {
        const data = new FormData()
        data.append('file', image)
        data.append('upload_preset', 'wrx8bbki')

        try {
            setUploadingImage(true)
            let res = await fetch("https://api.cloudinary.com/v1_1/dtlsbrvse/image/upload", {
                method: "POST",
                body: data
            })

            const urlData =await res.json()
            setUploadingImage(false)
            return urlData.url
        }catch (err){
            setUploadingImage(false)
            console.log(err)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!image) {
            return alert("Please choose your profile photo")
        }
        const url = await uploadImage(image)
        console.log(url);
        signUpUser({name, email, password, picture: url}).then(({data})=>{
            if (data){
                console.log(data)
                navigate("/chat")
            }
        })
    }


    return (
        <Container fluid>
            <Row>
                <Col md={7} className={"d-flex flex-column justify-content-center align-items-center"}>
                    <Form className={"chat-form"} onSubmit={(e) => handleSubmit(e)}>
                        <h1 className={"text-center"}>Create account</h1>
                        <div className={"signup__avatar-container"}>
                            <img src={previewImage || BotImage} alt="" className={"signup__avatar-image"}/>
                            <label htmlFor="upload-avatar" className={"signup__avatar-add"}>
                                <FaPlus/>
                                <input type="file" hidden id={"upload-avatar"}
                                       accept={"image/png, image/jpeg, image/jpg"} onChange={(e) => validateImage(e)}/>
                            </label>
                        </div>
                        <Form.Group className="mb-3" controlId="formBasicНаме">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                value={name}
                                name={"name"}
                                onChange={(e) => handleInput(e)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                name={"email"}
                                onChange={(e) => handleInput(e)}/>
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                name={"password"}
                                onChange={(e) => handleInput(e)}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">{uploadingImage ? "Signing up..." : "Signup"}</Button>
                        <div className={"py-4"}>
                            <p className={"text-center"}>Already have an account? <Link to={"/login"}>Login</Link></p>
                        </div>
                    </Form>
                </Col>
                <Col md={5} className={"signup__bg"}></Col>
            </Row>
        </Container>
    );
};

export default SignUp;
