import React from 'react';
import {useNavigate} from 'react-router-dom'
import classes from './adminMenuPage.module.css';

function AdminMenupage() {
    const navigate = useNavigate();

    const toAdminAttendenceWorkerHandler = ()=>{
        navigate('/admin/adminAttendenceWorkers')
    }
    const toCreateWorkerHandler = ()=>{
        navigate('/admin/createWorker')
    }
    const toManageWorkerHandler = ()=>{
        navigate('/admin/manageWorker')
    }
    const toAdminScheduleWorkersHandler = ()=>{
        navigate('/admin/adminScheduleWorkers')
    }
    const toMemberRequestHandler = ()=>{
        navigate('/admin/requestMember')
    }
    const toManageMemberHandler = ()=>{
        navigate('/admin/manageMember')
    }
    const toDeleteSlotHandler = ()=>{
        navigate('/admin/deleteSlot')
    }

  return (
    <div className={classes.wrapper}>
     
       <button className={classes.menu} onClick={toAdminAttendenceWorkerHandler} >add attendence</button>
       <button className={classes.menu} onClick={toAdminScheduleWorkersHandler}>show attendence</button>
       <button className={classes.menu} onClick={toMemberRequestHandler}>member requiest</button>
       <button className={classes.menu} onClick={toManageMemberHandler}>manage member</button>
       <button className={classes.menu} onClick={toCreateWorkerHandler}>create worker</button>
       <button className={classes.menu} onClick={toManageWorkerHandler}>manage worker</button>
       <button className={classes.menu} onClick={toDeleteSlotHandler}>delete slot</button>
       
    </div>
  )
}

export default AdminMenupage
