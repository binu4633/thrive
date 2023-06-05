import React from 'react';
import classes from  './contact.module.css';
import facebook from '../../images/facebook.svg';
import insta from '../../images/insta.svg'
import phone from '../../images/phone.svg'
import whatsapp from '../../images/whatsapp.svg'


function Contact() {
  return (
    <div className={classes.wrapper}>
       <div className={classes.heading__block}>
            <h2>contact</h2>
     </div>
           <div className={classes.address__block}>
               <h3>address</h3>
               <p>some building</p>
               <p>some post</p>
               <p>edakkara</p>
               
           </div>
        <div className={classes.social__media}>
            <div className={classes.icon__wrapper}>
            <div className={classes.icon__block}>
                <img src={facebook} alt="" />
            </div>
            </div>
            <div className={classes.icon__wrapper}>
            <div className={classes.icon__block}>
                <img src={insta} alt="" />
            </div>
            </div>
            <div className={classes.icon__wrapper}>
            <div className={classes.icon__block}>
                <img src={whatsapp} alt="" />
            </div>
            </div>
            <div className={classes.icon__wrapper}>
            <div className={classes.icon__block}>
                <img src={phone} alt="" />
            </div>
            </div>
        </div>



        
    </div>
  )
}

export default Contact
