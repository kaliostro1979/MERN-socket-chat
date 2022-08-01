import React from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import {RiMailSendLine} from "react-icons/ri";

const MessageForm = () => {

    const handleSubmit = (event)=>{
        event.preventDefault()
    }

    return (
        <>
            <div className={"messages-output"}></div>
            <Form className={"message-form"} onSubmit={handleSubmit}>
                <Row>
                    <Col md={11}>
                        <Form.Group>
                            <Form.Control></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={1}>
                        <Button variant={"primary"} className={"message-form__button"}>
                            <RiMailSendLine/>
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default MessageForm;
