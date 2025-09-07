import React, { useState } from 'react';

const daysOfWeek = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

function parseTimeToMinutes(timeStr){
  const [hh, mm] = timeStr.split(':').map(Number);
  return hh*60 + mm;
}

export default function Timetable({ timetable, setTimetable }) {
  const [collapsed, setCollapsed] = useState(() => {
    const state = {};
    daysOfWeek.forEach(d => state[d] = !timetable.some(c => c.day===d)); // collapse if empty
    return state;
  });

  function toggleDay(day){ setCollapsed(prev => ({...prev, [day]: !prev[day]})); }

  function addClass(e){
    e.preventDefault();
    const f = e.target;
    const day = f.day.value;
    const start = f.startTime.value;
    const end = f.endTime.value;
    const subject = f.subject.value.trim();
    if(!day || !start || !end || !subject) return alert('Fill all fields');
    if(parseTimeToMinutes(end)<=parseTimeToMinutes(start)) return alert('End after start');
    setTimetable(prev => [...prev, { day, start, end, subject }]);
    f.reset();
    setCollapsed(prev => ({...prev, [day]: false}));
  }

  function removeClass(idx){ setTimetable(prev => prev.filter((_,i)=>i!==idx)); }

  return (
    <div>
      <form onSubmit={addClass} className="flex flex-col gap-2 mb-4 bg-neutral-800 p-4 rounded">
        <select name="day" className="p-2 rounded bg-neutral-700 text-white">
          <option value="">Select Day</option>
          {daysOfWeek.map(d=><option key={d}>{d}</option>)}
        </select>
        <input type="time" name="startTime" className="p-2 rounded bg-neutral-700 text-white" />
        <input type="time" name="endTime" className="p-2 rounded bg-neutral-700 text-white" />
        <input type="text" name="subject" placeholder="Subject" className="p-2 rounded bg-neutral-700 text-white" />
        <button className="bg-purple-600 p-2 rounded font-bold">Add Class</button>
      </form>

      {daysOfWeek.map(day=>{
        const classes = timetable.filter(c=>c.day===day);
        return (
          <div key={day} className="mb-2 bg-neutral-900/40 rounded">
            <div className="flex justify-between items-center p-2 cursor-pointer" onClick={()=>toggleDay(day)}>
              <h3 className="font-bold text-purple-400">{day}</h3>
              <span>{collapsed[day] ? '+' : '-'}</span>
            </div>
            {!collapsed[day] && (
              <ul className="pl-4 pb-2">
                {classes.map((c,idx)=>(
                  <li key={idx} className="flex justify-between items-center mb-1">
                    <span>{c.start} - {c.end} : {c.subject}</span>
                    <button onClick={()=>removeClass(timetable.findIndex(tc=>tc===c))} className="text-red-500 font-bold">❌</button>
                  </li>
                ))}
                {classes.length===0 && <li className="text-gray-400 pl-2">No classes</li>}
              </ul>
            )}
          </div>
        )
      })}
    </div>
  );
}
