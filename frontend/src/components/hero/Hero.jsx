import React from 'react';
import {useNavigate}  from 'react-router-dom'
import classes from './hero.module.css';
import bg from '../../images/hero.jpg'

function Hero() {
  const navigate = useNavigate();

  const toUserWorkers = ()=>{
    navigate('/bookingWorker')
  }
  return (
    <div className={classes.wrapper}>
      <div className={classes.bg__block__out}>
      <div className={classes.bg__block}>
        <img src={bg} alt="" />
      </div>
      </div>
      <div className={classes.content__block}>
        <div className={classes.name__block}>
            <div className={classes.name__wrapper}>

            <div className={classes.hero1}><h1>thrive</h1></div>
            <div className={classes.hero2}><h2>beauty parlour</h2></div>
            </div>
        </div>
        <button className={classes.booking__block} onClick={toUserWorkers}><p>book or check appoiment</p></button>
      </div>
    </div>
  )
}

export default Hero
