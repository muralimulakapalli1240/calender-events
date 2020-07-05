import React, { useState } from "react";
import Header from "./header"
import Subheader from "./subheader"
import Month from "./month"
import moment from 'moment';
const Calendar = () => {
    const [currentDate, setCurrentDate] = useState({date:moment().startOf('month').format()});
    const dateFormat = "MMMM YYYY";
    // const daysOfWeek = () => {
    // const dateFormat = "ddd";
    // const days = [];
    // let startDate = dateFns.startOfWeek(currentDate);
    //    for (let i = 0; i < 7; i++) {
    //       days.push(
    //          <div className="column col-center" key={i}>
    //          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
    //          </div>
    //       );
    //    }
    //    return <div className="days row">{days}</div>;
    // };
    
    const nextMonth = () => {
            let date= moment(currentDate.date).add(1, 'month').startOf('month').format()
            setCurrentDate({...currentDate, date:date});
    };
    const prevMonth = () => {
        let date= moment(currentDate.date).subtract(1, 'month').startOf('month').format()
            setCurrentDate({...currentDate, date:date});
    };
    return (
       <div className="calendar">
                      <Header nextMonth={nextMonth} prevMonth={prevMonth} currentDate={currentDate.date} dateFormat={dateFormat}></Header>
           <Subheader/>
           <Month  currentDate={currentDate.date}/>
          {/* <div>{daysOfWeek()}</div> */}
          {/* <div>{cells()}</div> */} 
       </div>
      );
    };
    export default Calendar;