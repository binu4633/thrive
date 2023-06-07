import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ContextStore from "../../store/context-store";
import classes from "./header.module.css";
import wavesvg from "../../images/wave2.svg";
import logo from "../../images/logo1.svg";
import avthar from '../../images/avthar.svg';



function Header() {
  const navigate = useNavigate();
  const storeCtx = useContext(ContextStore);
  const userInfo = storeCtx.userInfo;

  const serviceElemnt = document.getElementById('services');
  const contactElemnt = document.getElementById('contact');

  const toHomeHandler = () => {
    navigate("/");
  };
  const toAdminMenuHandler = () => {
    navigate("/admin/menu");
  };

  const loginAreaHandler = () => {
    storeCtx.showLoginArea();
  };

  const toWorkerMenu = () => {
    navigate("/workerAuth/workerMenu");
  };
  // const userInfo = localStorage.userInfo ? JSON.parse(localStorage.userInfo) : null;

  const toService = ()=>{
    serviceElemnt.scrollIntoView({
      behavior:"smooth"
    })
  }
  const toContact = ()=>{
    contactElemnt.scrollIntoView({
      behavior:"smooth"
    })
  }



  return (
    <div className={classes.wrapper}>
      <button className={classes.logo} onClick={toHomeHandler}>
        <img src={logo} alt="" />
      </button>
      {userInfo && userInfo.isAdmin && (
        <button className={classes.profile} onClick={toAdminMenuHandler}>
          A
        </button>
      )}
      {userInfo && userInfo.isWorker && (
        <button className={classes.profile} onClick={toWorkerMenu}>
          P
        </button>
      )}
      <div className={classes.menu__wrapper}>
        <div className={classes.menu__bg}>
          <img src={wavesvg} alt="" />
        </div>
        <div className={classes.menu__block}>
          <button onClick={toService}>
            <p>services</p>{" "}
          </button>
          <button onClick={toContact}>
            <p>contact</p>{" "}
          </button>
          <button className={classes.signin} onClick={loginAreaHandler}>
            {
              storeCtx.userInfo ? 

              <div className={classes.user__image}>
              <img src={storeCtx.userInfo.image ? storeCtx.userInfo.image :  avthar } alt="user image" />
              
            </div>
            :
            <p>signin</p>

            }
            
            
          </button>
        </div>
      </div>
      {/* <div className={classes.signin} onClick={loginAreaHandler}>{storeCtx.userInfo ? storeCtx.userInfo.name :'siginin'}</div> */}
    </div>
  );
}

export default Header;
