import React from "react";
import CloseIcon from '@material-ui/icons/Close';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import { red } from "@material-ui/core/colors";
const Event = ({data,editEvent,closeEvent}) => {

    return (
       <div className="event" style={{left:data.left,top:data.top,width:data.width-20}} onClick={($event)=>editEvent($event,data)}>
           <span>{data.title}</span>
            <div className="alarm"><AccessAlarmIcon style={{ fontSize: 19,color:red }} ></AccessAlarmIcon></div>
            <CloseIcon style={{ fontSize: 19 }} onClick={($event)=>closeEvent($event,data)}></CloseIcon>
       </div>
       );
    };
    export default Event;