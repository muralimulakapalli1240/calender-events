import React, { Fragment, useEffect, useState } from "react";
import moment from 'moment';
import Event from './event';
import Button from '@material-ui/core/Button';
const Events = ({ Calendar: { startDate, endDate,totalDays }, events, viewmore, editEvent, viewMore,
    saveEvents, closeEvent, myRef }) => {
    const [currentevents, SetCurrentevents] = useState([])
    const [updatedDate,setUpdatedDate] = useState([])
    useEffect(() => {
        const arr = events.arr.filter(val => moment(startDate).unix() <= val && val <= moment(endDate).unix())
        if(JSON.stringify(updatedDate) !== JSON.stringify([startDate,endDate]) || JSON.stringify(arr) !== JSON.stringify(currentevents))
         {   
            SetCurrentevents([...arr])
            setUpdatedDate([startDate,endDate])
         }
    }, [startDate,endDate,events,currentevents,updatedDate]);
    return <Fragment>

        {currentevents.map(item => {
            
            let diff =  moment.unix(item).diff(moment(startDate),"days")
            let arr = []
            if (viewmore.data!==item)
                arr = events.obj[item].slice(0, 2)
            else
                arr = [...events.obj[item]]
            return diff>= 0 && diff<=totalDays ? (events.obj[item].length ? (
                <div className={viewmore.data===item ? "eventGroups viewmore" : "eventGroups"} key={item} style={{ left: myRef.current.children[diff].offsetLeft, top: myRef.current.children[diff].offsetTop, width: myRef.current.children[diff].offsetWidth }}>
                    <Fragment>
                        {viewmore.data===item  ? (<div class="month">{moment.unix(item).date()}</div>) : ""}
                        {arr.map((data, i) => {
                            return (<Event data={data} key={i + "" + item} editEvent={editEvent} saveEvents={saveEvents} closeEvent={closeEvent}></Event>
                            )
                        }
                        )}
                        {events.obj[item].length - 2 > 0 ? ( viewmore.data!==item? (<Button color="primary" className="showMore" onClick={() => viewMore(item, true)}>{events.obj[item].length - 2} More</Button>) :  (viewmore.data===item && viewmore.open ? <Button color="primary" className="showMore" onClick={() => viewMore("", false)}>Close</Button>:"")):""}
                    </Fragment>
                </div>) : ""):[]
        })}</Fragment>


};
export default Events;