

// import React from 'react'

// import FullCalendar from '@fullcalendar/react';
// // import dayGridPlugin from '@fullcalendar/daygrid';
// // import timeGridPlugin from '@fullcalendar/timegrid';
// // import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';


// // import "@fullcalendar/core/main.css";
// import "@fullcalendar/daygrid/main.css";
// function Calendar() {

//   // calendarComponentRef = React.createRef();
//   // state = {
//   //   events: [
//   //     { id: 1, title: "event 1", date: "2019-12-01" },
//   //     {
//   //       title: "event 2",
//   //       start: "2019-12-01",
//   //       end: "2019-12-05",
//   //       allDay: true,
//   //       HostName: "William"
//   //     },
//   //     {
//   //       title: "event 3",
//   //       start: "2019-12-05",
//   //       end: "2019-12-07",
//   //       allDay: true
//   //     },
//   //     {
//   //       title: "event 4",
//   //       start: "2019-12-05",
//   //       end: "2019-12-07",
//   //       allDay: true
//   //     },
//   //     {
//   //       title: "event 5",
//   //       start: "2019-12-05",
//   //       end: "2019-12-07",
//   //       allDay: true
//   //     },
//   //     {
//   //       title: "event 6",
//   //       start: "2019-12-05",
//   //       end: "2019-12-07",
//   //       allDay: true
//   //     }
//   //   ]
//   // };

//   const handleDateClick = (arg:any) => {
//     alert(arg.dateStr);
//   };

// //  const handleSelectedDates = (info:any) => {
// //     alert("selected " + info.startStr + " to " + info.endStr);
// //     const title = prompt("What's the name of the title");
// //     console.log(info);
// //     if (title != null) {
// //       const newEvent = {
// //         title,
// //         start: info.startStr,
// //         end: info.endStr
// //       };
// //       const data = [...this.state.events, newEvent];
// //       this.setState({ events: data });
// //       console.log("here", data);
// //     } else {
// //       console.log("nothing");
// //     }
// //   };
//   return (
    
//       <div>
//         <FullCalendar
//           // schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
//           // ref={this.calendarComponentRef}
//           // defaultView="dayGridMonth"
//           // dateClick={this.handleDateClick}
//           displayEventTime={true}
//           // header={{
//           //   left: "prev,next today",
//           //   center: "title",
//           //   right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
//           // }}
//           selectable={true}
//           plugins={[
//             dayGridPlugin,
//             interactionPlugin,
//             timeGridPlugin,
//             resourceTimeGridPlugin
//           ]}
//           // eventClick={event => {
//           //   console.log(event.event._def.publicId);
//           // }}
//           // events={this.state.events}
//           // select={this.handleSelectedDates}
//           // eventLimit={3}
//         />
//       </div>
    
//   )
// }

// export default Calendar
