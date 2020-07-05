import React, { Fragment  } from "react";

import moment from 'moment';
const GetCells = ({Calendar:{startDate,totalDays,currentDate}, handleClickOpen }) => {
    const cells = () => {
        let daysInMonth = [],
            day = moment(startDate).clone();
        for (let i = 0; i <= totalDays; i++) {
            const today = day.clone()
            let currentDay = moment().format("MMM Do YY") === day.format("MMM Do YY")? "today" : "",
                currentMonth = moment(currentDate).month() === today.month() ? "month" : "";
            daysInMonth.push(

                <li key={today} className={`calendar-day ${currentDay} ${currentMonth} `} onClick={() => handleClickOpen({ date: today.clone(), i: i, title: "", time: today.clone(), description: "", remember: false, })}>
                    {day.date()}
                </li>

            );
            day.add(1, 'days')
           
        }
        return <Fragment> {daysInMonth}</Fragment>;
    }
    return <Fragment> {cells()}</Fragment>;
};
export default GetCells;
