import React from "react";
const Subheader = () => {
    const weeks=["MON","TUE","WED","THU","FRI","SAT","SUN"]
    return (
        <div className="sub_header">
          {weeks.map((week,i)=><div className="week" key={i}>{week}</div>)}
       </div>
       );
    };
    export default Subheader;