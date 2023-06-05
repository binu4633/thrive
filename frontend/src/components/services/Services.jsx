import React, { useState, useRef,useEffect ,useContext}from 'react';
import ContextStore from '../../store/context-store.js';
import classes from './services.module.css';
import cutting from '../../images/cutting.jpg';
import bleaching from '../../images/bleach.jpg';
import coloring from '../../images/coloring.jpg';
import facialing from '../../images/facial.jpg';
import blob1 from '../../images/blob1.svg'
import blob2 from '../../images/blob2.svg'
import blob3 from '../../images/blob3.svg'
import blob4 from '../../images/blob4.svg'



function Services() {
  const storeCtx = useContext(ContextStore);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
       
        setIsIntersecting(entry.isIntersecting);
      },
      { 
        rootMargin: "0px",
        threshold:'0.25'
      }
    );
   
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(()=>{
   
    storeCtx.serviceIntersection(isIntersecting)
  },[isIntersecting])
 
  return (
    <div className={classes.wrapper} ref={ref}>
        
        <div className={classes.heading__block} >
            <h2>services</h2>
        </div>

        <div className={classes.services__wrapper}>
           
         <div className={classes.service__block}>
         <div className={classes.service__image}>
             <img src={cutting} alt="" style={{maskImage:`url(${blob1})`,WebkitMaskImage:`url(${blob1})`}} className={classes.mask__img}/>
          </div>
          <div className={classes.service__name}>
            <p>hair cutting</p>
          </div>
         
         </div>
         <div className={classes.service__block}>
         <div className={classes.service__name}>
            <p>hair bleaching</p>
          </div>
         <div className={classes.service__image}>
             <img src={bleaching} alt="" style={{maskImage:`url(${blob2})`,WebkitMaskImage:`url(${blob2})`}} className={classes.mask__img}/>
           
          </div>
         
         
         </div>

         <div className={classes.service__block}>
         <div className={classes.service__image}>
             <img src={facialing} alt="" style={{maskImage:`url(${blob3})`,WebkitMaskImage:`url(${blob3})`}} className={classes.mask__img}/>
          </div>
          <div className={classes.service__name}>
            <p>facialing</p>
          </div>
         
         </div>

         <div className={classes.service__block}>
         <div className={classes.service__name}>
            <p>hair coloring</p>
          </div>
         <div className={classes.service__image}>
             <img src={coloring} alt="" style={{maskImage:`url(${blob4})`,WebkitMaskImage:`url(${blob4})`}} className={classes.mask__img}/>
          </div>
         
         
         </div>
            
        </div>
        {/* <div className={classes.test} >
            <img src={cutting} alt="" style={{maskImage:`url(${blob1})`,WebkitMaskImage:`url(${blob1})`}}/>
         </div> */}
      
    </div>
  )
}

export default Services


// hair cutting
// hair bleaching
// hair coloring
// facialing