import React, {useContext, useEffect} from 'react';
import {Col, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import {AppContext} from "../context/appContext";
import {useDispatch, useSelector} from "react-redux";
import {addNotifications, resetNotifications} from "../features/userSlice"
import {BsCircleFill} from "react-icons/bs";

const Sidebar = () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const {
        socket,
        setMembers,
        members,
        setRooms,
        privateMemberMsg,
        rooms,
        setPrivateMemberMsg,
        currentRoom,
        setCurrentRoom
    } = useContext(AppContext)

    const joinRoom = (room, isPublic = true)=>{
        if (!user){
            return alert("Please login")
        }
        socket.emit("join-room", room, currentRoom)
        setCurrentRoom(room)

        if (isPublic){
            setPrivateMemberMsg(null)
        }
        dispatch(resetNotifications(room))

    }

    socket.off("notifications").on("notifications", (room)=>{
        if (currentRoom !== room){
            dispatch(addNotifications(room))
        }
    })

    useEffect(()=>{
        if (user){
            setCurrentRoom("general")
            getRooms()
            socket.emit("join-room", "general")
            socket.emit("new-user")
        }
    }, [])

    socket.off("new-user").on("new-user", (payload)=>{
        setMembers(payload)
    })

    const getRooms = async ()=>{
        await fetch("http://localhost:5001/rooms").then(res=>res.json()).then(data=>setRooms(data))
    }

    const orderIds = (id1, id2)=>{
        if (id1 > id2){
            return id1 + "-" + id2
        }else {
            return id2 + "-" + id1
        }
    }

    const handlePrivetMemberMsg =(member)=>{
        setPrivateMemberMsg(member)
        const roomId = orderIds(user._id, member._id)
        joinRoom(roomId, false)
    }

    if (!user){
        return <></>
    }

    return (
       <>
           <h2 className={"list-title"}>Available rooms</h2>
           <ListGroup className={"rooms-list"}>
               {
                   rooms.map((room, i)=>{
                       return (
                           <ListGroupItem key={i} className={"rooms-list__item"} onClick={()=>joinRoom(room)} active={currentRoom === room}>
                               {room} {currentRoom !== room && <span className={"badge rounded-pill bg-primary"}>{user.newMessages[room]}</span>}
                           </ListGroupItem>
                       )
                   })
               }
           </ListGroup>
           <h2 className={"list-title"}>Members</h2>
           <ListGroup>
               {
                   members.map((member)=>{
                       return (
                           <ListGroupItem
                               key={member._id}
                               className={"members-list__item"}
                               active={privateMemberMsg?._id === member._id}
                               onClick={()=>handlePrivetMemberMsg(member)}
                               disabled={member._id === user._id}
                           >
                               <Row>
                                   <Col xs={2} className={"member-status"}>
                                       <img src={member.picture} alt="" className={"member-status__image"}/>
                                       <BsCircleFill className={member.status === "online" ? "member-status__icon online" : "member-status__icon offline"}/>
                                   </Col>
                                   <Col xs={9}>
                                       {member.name}
                                       {member._id === user?._id && " (You)"}
                                       {member.status === "offline" && " (Offline)"}
                                   </Col>
                                   <Col xs={1}>
                                       <span className={"badge rounded-pill bg-primary"}>{user.newMessages[orderIds(member._id, user._id)]}</span>
                                   </Col>
                               </Row>
                           </ListGroupItem>
                       )
                   })
               }
           </ListGroup>
       </>
    );
};

export default Sidebar;
