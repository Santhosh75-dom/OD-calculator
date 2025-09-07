import React, { useMemo } from 'react';
import ProgressCircle from './ProgressCircle';
import { TOTAL_OD_MINUTES, TOTAL_SLOTS, SLOT_MINUTES } from '../App';

function parseTimeToMinutes(timeStr){
  const [hh, mm] = timeStr.split(':').map(Number);
  return hh*60 + mm;
}

function getDayNameFromDate(dateStr){
  const d = new Date(dateStr + 'T00:00');
  const names = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  return names[d.getDay()];
}

function overlapMinutes(aStart,aEnd,bStart,bEnd){
  const start = Math.max(aStart,bStart);
  const end = Math.min(aEnd,bEnd);
  return Math.max(0,end-start);
}

export default function OdCalculator({ timetable, history, setHistory, remainingMinutes, setRemainingMinutes, remainingSlots, setRemainingSlots }){
  function addEvent(e){
    e.preventDefault();
    const f=e.target;
    const name=f.eventName.value.trim();
    const date=f.eventDate.value;
    const start=f.eventStart.value;
    const end=f.eventEnd.value;
    if(!name||!date||!start||!end) return alert('Fill all fields');
    if(parseTimeToMinutes(end)<=parseTimeToMinutes(start)) return alert('End after start');

    const sMin = parseTimeToMinutes(start);
    const eMin = parseTimeToMinutes(end);
    const dayName = getDayNameFromDate(date);
    const classesToday = timetable.filter(c=>c.day===dayName);

    let totalOverlapMinutes=0, totalSlotsDeducted=0;
    classesToday.forEach(cls=>{
      const clsStart=parseTimeToMinutes(cls.start);
      const clsEnd=parseTimeToMinutes(cls.end);
      const overlap=overlapMinutes(sMin,eMin,clsStart,clsEnd);
      if(overlap>0){
        totalOverlapMinutes+=overlap;
        if(overlap>=30) totalSlotsDeducted+=Math.ceil(overlap/SLOT_MINUTES);
      }
    });

    const newRemainingMinutes=Math.max(0, remainingMinutes-totalOverlapMinutes);
    const newRemainingSlots=Math.max(0, remainingSlots-totalSlotsDeducted);

    setRemainingMinutes(newRemainingMinutes);
    setRemainingSlots(newRemainingSlots);

    setHistory(prev=>[{name,date,overlapMinutes:totalOverlapMinutes,slotsDeducted:totalSlotsDeducted,remainingMinutes:newRemainingMinutes,remainingSlots:newRemainingSlots},...prev]);
    f.reset();
  }

  function minutesToHourMin(minutes){ const h=Math.floor(minutes/60); const m=minutes%60; return `${h}h ${m}m`; }

  const hoursUsedPercent = useMemo(()=>Math.round(((TOTAL_OD_MINUTES-remainingMinutes)/TOTAL_OD_MINUTES)*100), [remainingMinutes]);
  const slotsUsedPercent = useMemo(()=>Math.round(((TOTAL_SLOTS-remainingSlots)/TOTAL_SLOTS)*100), [remainingSlots]);

  return (
    <div>
      <form onSubmit={addEvent} className="flex flex-col gap-2 mb-4 bg-neutral-800 p-4 rounded">
        <input type="text" name="eventName" placeholder="Event Name" className="p-2 rounded bg-neutral-700 text-white" />
        <input type="date" name="eventDate" className="p-2 rounded bg-neutral-700 text-white" />
        <input type="time" name="eventStart" className="p-2 rounded bg-neutral-700 text-white" />
        <input type="time" name="eventEnd" className="p-2 rounded bg-neutral-700 text-white" />
        <button className="bg-purple-600 p-2 rounded font-bold">Add Event</button>
      </form>

      <div className="flex gap-6 mb-4 flex-wrap">
        <ProgressCircle percent={hoursUsedPercent} remainingText={`${minutesToHourMin(remainingMinutes)} left`} labelTop="Hours Used" accentId="grad1" />
        <ProgressCircle percent={slotsUsedPercent} remainingText={`${remainingSlots} slots left`} labelTop="Slots Used" accentId="grad2" />
      </div>

      <h3 className="font-bold mb-2 text-purple-400">OD History</h3>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left bg-neutral-900/40 rounded">
          <thead>
            <tr>
              <th className="px-2 py-1">Event</th>
              <th className="px-2 py-1">Date</th>
              <th className="px-2 py-1">Overlap Minutes</th>
              <th className="px-2 py-1">Slots Deducted</th>
              <th className="px-2 py-1">Remaining Minutes</th>
              <th className="px-2 py-1">Remaining Slots</th>
            </tr>
          </thead>
          <tbody>
            {history.map((h,i)=>(
              <tr key={i} className="border-t border-neutral-700">
                <td className="px-2 py-1">{h.name}</td>
                <td className="px-2 py-1">{h.date}</td>
                <td className="px-2 py-1">{h.overlapMinutes
