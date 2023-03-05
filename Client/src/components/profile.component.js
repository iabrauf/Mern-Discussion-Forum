import React,{useEffect,useState,useContext} from "react";
import { UserContext } from "../App";
function Profile() {
  const [mypics,setPics] = useState([])
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    console.log(state);
    fetch('http://localhost:5000/post/mypost',{
        headers:{
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        }
    }).then(res=>res.json())
    .then(result=>{
        console.log(result)
        setPics(result.mypost)      
    })
 },[])
  return (
    // <div className='auth-inner-inner'>
    <div style={{width:"700px",margin:"0px auto",backgroundColor:"#ffffff",boxShadow: "0px 14px 80px rgb(34 35 58 / 20%)"}}>
      <div style={{
         display :"flex",
         justifyContent:"space-around",
         margin:"10px 0px",
         borderBottom:"1px solid grey",
        //  paddingBottom:"15px"
        padding:"50px"
        }}>
        <div >
          <img
            style={{ width: "160px", height: "160px", borderRadius: "80px" }}
            src="https://images.pexels.com/photos/14844057/pexels-photo-14844057.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"
          ></img>
        </div>
        <div style={{margin:"10px"}}>
         <h4>{state?state.name:"Loading"}</h4>
         <div style={{display :"flex",
         justifyContent :"space-between",
         width:"108%"
      }}>
            <h6>40 Posts</h6>
         </div>
        </div>
      </div>
      <div className="gallery" style={{display: "flex", flexWrap:"wrap", justifyContent:"space-evenly"}}>
      {
                   mypics.map(item=>{
                         
                       return(
                        <img key={item._id} className="item" src={item.photo} alt={item.title}/>  
                       )
                   })
               }
      </div>
    </div>
  );
}
export default Profile;
