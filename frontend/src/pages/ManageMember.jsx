import React,{useState,useContext} from 'react';
import {useQuery, useMutation , useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import classes from './manageMember.module.css';
import Loader from '../components/loader/Loader';
import ContextStore from '../store/context-store';
function ManageMember() {

    const storeCtx = useContext(ContextStore);
    const userInfo = storeCtx.userInfo ;
    const queryClient = useQueryClient();

  const [keyWord,setKeyWord] = useState('');
  const [userData,setUserData] = useState(null)
  const [pageCount,setPageCount] = useState(0);
  const [pageNumCount,setPageNumCount] = useState(0)


    const pageArray = [];

    for (let i = 1; i <= pageCount; i++) {
        pageArray.push(i);
      }
   let pageBtnWidth = 4;
    const seachUserMutation = useMutation({
        mutationFn:(e)=>{
            e.preventDefault();
             
            // if(!keyWord){
            //     return
            // }

             return axios.post('/api/v1/user/searchUser',{keyword:keyWord});
        },
        onSuccess: (data)=>{
         
            // if(data.data.user){
            //     setUserCollection(data.data.user);
            //     setUserCollectionDisplay(true)
            // }
         

            if(data && data.data.user){
                setUserData(data.data.user)
            }

            if(data && data.data.totalPage){
                setPageCount(data.data.totalPage)
            }
        }
    });

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
                setUserData(data.data.user)
            }
        }
    })   

    const keyWordInputHandler = (e)=>{
        e.preventDefault()
        setKeyWord(e.target.value)
    }

    const userActivateMutation = useMutation({
        mutationFn:(id)=>{
            return axios.post('/api/v1/admin/userActivate',{id},{
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                  
                  },
            });
        },
        onSuccess:(data)=>{
       
         if(data.data.user){
               
                const newData = userData.map(ur=>{
                    if(ur._id === data.data.user._id ){
                        ur = data.data.user
                    }

                    return ur
                });

                setUserData(newData)
         }

        }
    })
    const userBlockMutation = useMutation({
        mutationFn:(id)=>{
            return axios.post('/api/v1/admin/userBlock',{id},{
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                  
                  },
            });
        },
        onSuccess:(data)=>{
            if(data.data.user){
               
                const newData = userData.map(ur=>{
                    if(ur._id === data.data.user._id ){
                        ur = data.data.user
                    }

                    return ur
                });

                setUserData(newData)
         }

        }
    })
    const userDeleteMutation = useMutation({
        mutationFn:(id)=>{
            return axios.post('/api/v1/admin/userDelete',{id},{
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                  
                  },
            });
        },
        onSuccess:(data)=>{
          if(data.data.id){
            const uData = userData.filter(us=>us._id !== data.data.id);

            setUserData( uData)
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




  return (
    <div className={classes.wrapper}>
         <div className={classes.search__div}>
               {/* <form onSubmit={seachMutation.mutate}> */}
               <form onSubmit={seachUserMutation.mutate}>
               {/* <input type="search"  onChange={keyWordInputHandler}/> */}
               <input type="search"  onChange={keyWordInputHandler}/>
               <button >search</button>
               </form>
         </div>
         {seachUserMutation.isLoading && <Loader/>}
         {paginationSearchMutaion.isLoading && <Loader/>}
        <div className={classes.users}>
            {/* {seachUserMutation.data && seachUserMutation.data.data.user && seachUserMutation.data.data.user.map(ur=>{ */}
            {userData && userData.map(ur=>{
                return(
                    <div className={classes.user}>
                <div className={classes.image}>
                    <img src={ur.image ?ur.image :''} alt="" />
                </div>
                <p>{ur.name}</p>
                <p>{ur.email}</p>
                <p>status:{ur.userStatus}</p>
                {ur.userStatus === 'active' &&
                
                <button onClick={userBlockMutation.mutate.bind(this,ur._id)}>block</button>
                }
                {
                   ur.userStatus === 'blocked' &&
                   <button onClick={userActivateMutation.mutate.bind(this,ur._id)}>activate</button>
                }
               
                <button onClick={userDeleteMutation.mutate.bind(this,ur._id)}>delete</button>
            </div>
                )
            })}
           
        </div>

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
                    <button className={classes.btn__page} onClick={paginationSearchMutaion.mutate.bind(this,p)}>{p}</button>
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

export default ManageMember
