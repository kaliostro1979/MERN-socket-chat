import React from 'react';
import {ListGroup, ListGroupItem} from "react-bootstrap";

const Sidebar = () => {

    const rooms = ["first", "second", "third"]

    return (
       <>
           <h2>Available rooms</h2>
           <ListGroup>
               {
                   rooms.map((room, i)=>{
                       return (
                           <ListGroupItem key={i}>
                               {room}
                           </ListGroupItem>
                       )
                   })
               }
           </ListGroup>
           <h2>Members</h2>
       </>
    );
};

export default Sidebar;
