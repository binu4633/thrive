import React from 'react'
import classes from './loader.module.css';
function Loader() {
  return (
    <div className={classes.wrapper}>
       <div className={classes.round1}></div>
       <div className={classes.round2}></div>
    </div>
  )
}

export default Loader
