import React from "react";
import {ChevronLeft,ChevronRight} from '@material-ui/icons';
import Moment from 'react-moment';
const Header = ({nextMonth,prevMonth,currentDate,dateFormat}) => {

    return (
        <div className="header">
          <div className="icon">
            <ChevronLeft  style={{ fontSize: 30 }} onClick={prevMonth}/>
          </div>
          <div className="icon">
          <ChevronRight  style={{ fontSize: 30 }}  onClick={nextMonth}/>
          </div>
          <div className="col-center">
             <span><Moment format={dateFormat}>
             {currentDate}
            </Moment></span>
          </div>
       </div>
       );
    };
    export default Header;