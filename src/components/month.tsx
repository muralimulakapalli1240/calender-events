import React, { Fragment, useEffect, useState, useRef, FunctionComponent } from "react";
import * as moment from 'moment';
import FormDialog from './modal';
import Events from './events';
import GetCells from './cell';
type CardProps = {
    currentDate: any
  }
const Month : FunctionComponent<CardProps> = ({ currentDate }) => {
    const [events, setEvents] = useState({ arr: [], obj: {} });
    const [viewmore, setViewmore] = useState({ open: "", data: "" })
    const [data, setData] = useState({ open: false, data: [], isEdit: false });
    const myRef = useRef(null);
    const [Calendar, setCalender] = useState({})
    useEffect(() => {
        const monthStart = moment(currentDate).startOf('month').format(),
            monthEnd = moment(monthStart).endOf('month').format(),
            startDate = moment(monthStart).startOf('week').format(),
            endDate = moment(monthEnd).endOf('week').format(),
            totalDays = moment(endDate).diff(moment(startDate), 'days');
        if(!Calendar.currentDate)
        setCalender({
            ...Calendar, monthStart: monthStart,
            monthEnd: monthEnd,
            startDate: startDate,
            endDate: endDate,
            totalDays: totalDays,
            currentDate: currentDate
        })
        else
        if (moment(currentDate).unix() !== moment(Calendar.currentDate).unix())
            setCalender({
                ...Calendar, monthStart: monthStart,
                monthEnd: monthEnd,
                startDate: startDate,
                endDate: endDate,
                totalDays: totalDays,
                currentDate: currentDate
            })
    },[currentDate, Calendar]);
    const viewMore = (data:any, bool) => {
        setViewmore({ open: bool, data: data });
    };
    const handleClickOpen = (data) => {
        setData({ open: true, data, isEdit: false });
    };
    const editEvent = (e, data) => {
        setData({ open: true, data, isEdit: true });
        e.stopPropagation()
    }
    const closeEvent = (e, event) => {
        e.stopPropagation()
        let index = events.obj[event.date.unix()].findIndex(val => val.date.unix() === event.date.unix())
        events.obj[event.date.unix()].splice(index, 1)
        if (events.obj[event.date.unix()].length < 1) {
            delete events.obj[event.date.unix()];
            let index1 = events.arr.indexOf(event.date.unix())
            events.arr.splice(index1, 1)
        }
        setEvents({ ...events })
    }
    const saveEvents = (event) => {
        if (!data.isEdit) {
            if (events.obj[event.date.unix()])
                events.obj[event.date.unix()].push(event)
            else {
                events.obj[event.date.unix()] = [event]
                events.arr.push(event.date.unix())
            }
        }
        else {
            let index = events.obj[event.date.unix()].findIndex(val => val.date.unix() === event.date.unix())
            events.obj[event.date.unix()][index] = { ...event }
        }
        setData({ open: false, data: [], isEdit: false });
        setEvents({ ...events })
    }
    const handleClose = () => {
        setData({ open: false, data: [] });
    };

    return (
        <Fragment>
            {Calendar.startDate ? <Fragment><ul className="month" ref={myRef}>
                <GetCells Calendar={Calendar} handleClickOpen={handleClickOpen}></GetCells>
            </ul>
                <FormDialog open={data.open} data={data.data} saveEvents={saveEvents} handleClose={handleClose} isEdit={data.isEdit}></FormDialog>
                {<Events Calendar={Calendar} events={events}
                    viewmore={viewmore}
                    editEvent={editEvent}
                    viewMore={viewMore}
                    saveEvents={saveEvents}
                    closeEvent={closeEvent}
                    myRef={myRef}></Events>}</Fragment> : ""}

        </Fragment>
    )
};
export default Month;