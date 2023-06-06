import React,{useState, useContext} from 'react'
import classes from './createWorker.module.css';
import {useQuery, useMutation , useQueryClient} from '@tanstack/react-query';
import axios from "axios";
import uuid from 'react-uuid';
import Loader from '../components/loader/Loader';
import ContextStore from '../store/context-store';
function CreateWorker() {

  const storeCtx = useContext(ContextStore);
  const userInfo = storeCtx.userInfo ;

     const [keyWord,setKeyWord] = useState('');
    //  const [userData,setUserData] = useState(null)
     const [pageCount,setPageCount] = useState();
     const [pageNumCount,setPageNumCount] = useState(0)


     const [userCollection,setUserCollection] = useState();
     const [userCollectionDisplay,setUserCollectionDisplay] = useState(false);
     const [selectedUser,setSelectedUser]  = useState()


    const [nameInput,setNameInput] = useState()
    const [emailInput,setEmailInput] = useState()
    const [addressInput,setAddressInput] = useState()
    const [phoneInput,setPhoneInput] = useState()
    const [profileImageInput,setProfileImageInput] = useState()
    const [profileSizeError,setProfileSizeError] = useState(false);

    const [resultStatus,setResultStatus] = useState(false)


    const pageArray = [];

    for (let i = 1; i <= pageCount; i++) {
        pageArray.push(i);
      }
let pageBtnWidth = 4;

    const createWorkerSubmitHandler = (e)=>{
      e.preventDefault();

      const workerInput = {
        name:nameInput,
        email:emailInput,
        address:addressInput,
        phone:phoneInput,
        image:profileImageInput
     }
     
    


    }

    const createWorkerMutation = useMutation({
        mutationFn:(e)=>{
            e.preventDefault();
            const workerInput = {
                name:nameInput,
                phone:phoneInput,
                image:profileImageInput,
                id:selectedUser._id,
             }

             return axios.post('/api/v1/worker/createWorker',workerInput,{
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${userInfo.token}`,
              
              },
             });
        },
        onSuccess:(data)=>{
        
          if(data.data.status ==='success'){
            setResultStatus(true)
          }
        }
    })

    // if(createWorkerMutation.isLoading){
   
    // }

    const seachMutation = useMutation({
        mutationFn:(e)=>{
            e.preventDefault();
             
            // if(!keyWord){
            //     return
            // }

             return axios.post('/api/v1/user/searchUser',{keyword:keyWord});
        },
        onSuccess: (data)=>{
           
            if(data.data.user){
                setUserCollection(data.data.user);
                setUserCollectionDisplay(true)
            }
            if(data && data.data.totalPage){
                setPageCount(data.data.totalPage)
            }
        }
    })
    const paginationSearchMutaion = useMutation({
        mutationFn:(p)=>{
            // e.preventDefault();
             
            // if(!keyWord){
            //     return
            // }

             return axios.post('/api/v1/user/searchUser',{keyword:keyWord,page:p});
        },
        onSuccess: (data)=>{
          
            // if(data.data.user){
            //     setUserCollection(data.data.user);
            //     setUserCollectionDisplay(true)
            // }
           

            if(data && data.data.user){
                setUserCollection(data.data.user);
            }
        }
    })   

    const pageRightHandler = ()=>{

       

        if(pageNumCount === 0){
            return
        }

        setPageNumCount(prev=>prev+1)
    }
    const pageLeftHandler = ()=>{
     
        if(pageNumCount === 5-pageCount){
            return
        }
        setPageNumCount(prev=>prev-1)
    }


   const userSelectHandler = (user)=>{
      
       setSelectedUser(user)
       setNameInput(user.name)
       setEmailInput(user.email)
       setPhoneInput(user.phone ? user.phone :'');
       setProfileImageInput(user.image?user.image :'')

       setUserCollectionDisplay(false)
       
   }

    const keyWordInputHandler = (e)=>{
        e.preventDefault()
        setKeyWord(e.target.value)
    }

    const nameInputHandler = (e)=>{
         setNameInput(e.target.value)
    }
    const emailInputHandler = (e)=>{
         setEmailInput(e.target.value)
    }
    const addressInputHandler = (e)=>{
         setAddressInput(e.target.value)
    }
    const phoneInputHandler = (e)=>{
         setPhoneInput(e.target.value)
    }

    const profileImageHandler = (e)=>{
        const imageFile = e.target.files[0];

     

        if(imageFile.size > 200000){
            setProfileSizeError(true)
        }else{
            tranformFile(imageFile)
        }
    }

    function tranformFile(file) {
        const reader = new FileReader();
        if (file) {
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            setProfileImageInput(reader.result);
          };
        } else {
            setProfileImageInput("");
        }
      }



  return (
    <div className={classes.wrapper}>
      {/* <form className={classes.form} onSubmit={createWorkerSubmitHandler}> */}

     
     
         <div className={classes.search__div}>
               <form onSubmit={seachMutation.mutate}>
               <input type="search"  onChange={keyWordInputHandler}/>
               <button >search</button>
               </form>
         </div>

     {seachMutation.isLoading && <Loader/>}
     {paginationSearchMutaion.isLoading && <Loader/>}
     {createWorkerMutation.isLoading && <Loader/>}
      {
        userCollectionDisplay &&
         <div className={classes.user__wrapper}>
            {userCollection && userCollection.map(ur=>{
               return(
                <div className={classes.users} key={uuid()}>
                     <p>{ur.name}</p>
                     <p>{ur.email}</p>
                     <button className={classes.btn}  onClick={userSelectHandler.bind(this,ur)}>select</button>
                 </div>
               )
            })
               
            }
          
         </div>
      }
    {createWorkerMutation.isLoading && <h1>loadinig....</h1>}
       {
        selectedUser &&
        <form className={classes.form} onSubmit={createWorkerMutation.mutate}>
         <div>
         <p>{emailInput}</p>
         </div>
        <div>
          <label>
              name:
              <input type="text" onChange={nameInputHandler} value={nameInput}/>
          </label>
        </div>
       
      
        <div>
          <label>
              phone:
             <input type="number"  onChange={phoneInputHandler} value={phoneInput}/>
          </label>
        </div>
        <div>
          <label>
           image:
           <input type="file"   onChange={profileImageHandler}/>
          </label>
        </div>
        <div className={classes.image__prev}>
            <img src={profileImageInput} alt="" />
        </div>
        {profileSizeError &&
          <div>
          <p>the size of the image is larger than permitted</p>
        </div>
        }
        {resultStatus && <p>created successfully</p>}
         <button className={classes.btn__create}>create</button>
        </form>
       }


          <div className={classes.pagination}>
            {pageCount> 5 &&
              <div className={classes.arrow__div}>
               <button className={classes.btn__left} onClick={pageLeftHandler}></button>
              </div>
            }
            
            <div className={classes.page__wrapper}>
             <div style={{transform:`translateX(${pageBtnWidth*pageNumCount}rem)`}} className={classes.page__container}>
               {pageArray.map(p=>{
                return(
                    <button className={classes.btn__page} onClick={paginationSearchMutaion.mutate.bind(this,p)} key={uuid()}>{p}</button>
                )
               })}
               
               
            </div>
            </div>
            {pageCount> 5 &&
              <div className={classes.arrow__div}>
                 <button className={classes.btn__right} onClick={pageRightHandler}></button>
              </div>
            }
            
          </div>
      
    </div>
  )
}

export default CreateWorker
