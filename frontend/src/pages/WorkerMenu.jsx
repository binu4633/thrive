import React from 'react';
import {useNavigate} from 'react-router-dom'
import classes from './workerMenu.module.css';

function WorkerMenu() {
    const navigate = useNavigate();
    const toMyAttendence = ()=>{
        navigate('/workerAuth/workerAttendece')
    }
    const toMySchedule = ()=>{
        navigate('/workerAuth/workerScheduleDate')
    }
  return (
    <div className={classes.wrapper}>
        <button className={classes.btn} onClick={toMyAttendence}>add attendence</button>
        <button className={classes.btn} onClick={toMySchedule}>my schedule</button>
    </div>
  )
}

export default WorkerMenu
