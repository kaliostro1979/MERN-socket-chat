import React, {useContext, useEffect, useRef, useState} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import {RiMailSendLine} from "react-icons/ri";
import {AppContext} from "../context/appContext";
import {useSelector} from "react-redux";

const MessageForm = () => {
    const [message, setMessage] = useState("")
    const user = useSelector(state => state.user)
    const {socket, currentRoom, setMessages, messages} = useContext(AppContext)
    const messageRef =useRef(null)

    const handleMessage = (e)=>{
        setMessage(e.target.value)
    }

    useEffect(()=>{
       scrollToBottom()
    }, [messages])

    const getFormattedDate = () => {
        const date = new Date()
        const year = date.getFullYear()
        let month = (1 + date.getMonth()).toString()
        let day = date.getDate().toString()

        month = month.length > 1 ? month : "0" + month
        day = day.length > 1 ? day : "0" + day

        return month + "/" + day + "/" + year
    }

    const todayDate = getFormattedDate()

    socket.off("room-messages").on("room-messages", (roomMessages)=>{
        setMessages(roomMessages)
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!message) return
        const today = new Date()
        const minutes = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes()
        const time = today.getHours() + ":" + minutes
        const roomId = currentRoom

        socket.emit("message-room", roomId, message, user, time, todayDate)
        setMessage("")
    }

    const scrollToBottom = ()=>{
        messageRef.current?.scrollIntoView({behavior: "smooth"})
    }


    return (
        <>
            <div className={"messages-output"}>
                {!user && <div className={"alert alert-danger"}>Login first</div>}
                {
                    user && messages.map(({_id: date, messagesByDate }, i)=>{
                        return (
                            <div key={i} className={""}>
                                <p className={"alert alert-info text-center message-date-indicator"}>{date}</p>
                                {messagesByDate?.map(({content, time, from: sender}, msgIdx)=>{
                                    return (
                                        <div className={"message"} key={msgIdx}>
                                            <div>
                                                <div className={"d-flex align-items-center mb-3"}>
                                                    <img src={sender.picture} alt="" className={"message-sender__image"}/>
                                                    <p>{sender._id === user?._id ? "You" : sender.name}</p>
                                                </div>
                                                <p>{content}</p>
                                                <p>{time}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })
                }
                <div ref={messageRef}>

                </div>
            </div>
            <Form className={"message-form"} onSubmit={handleSubmit}>
                <Row>
                    <Col md={11}>
                        <Form.Group>
                            <Form.Control
                                value={message}
                                onChange={(e)=>handleMessage(e)}></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={1}>
                        <Button variant={"primary"} className={"message-form__button"} type={"submit"}>
                            <RiMailSendLine/>
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default MessageForm;
