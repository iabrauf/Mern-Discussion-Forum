import React, { useState, useEffect, useContext } from "react";
import { BiLike, BiDislike } from "react-icons/bi";
import { UserContext } from "../App";
function Home() {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [comment,setComment] = useState("")
  useEffect(() => {
    fetch("http://localhost:5000/post/allpost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result.posts);
      });
  }, []);

  const likePost = (id) => {
    fetch("http://localhost:5000/post/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        //   console.log(result)
        const newData = data.map(item=>{
          if(item._id==result._id){
            return result;
          }else{
              return item
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const unlikePost = (id) => {
    fetch("http://localhost:5000/post/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        //   console.log(result)
        const newData = data.map(item=>{
          if(item._id==result._id){
            // return {...item,likes:result.likes}
            return result;
          }else{
              return item
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const makeComment = (text, postId) => {
    fetch("http://localhost:5000/post/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.map(item=>{
          if(item._id==result._id){
              return result;
          }else{
              return item
          }
        });
        setData(newData);
        setComment("")
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="home">
      {data.map((item) => {
        return (
          <div className="card home-card">
            <h5>{item.title}</h5>
            <p>{item.body}</p>
            <div className="card-image">
              <img className="image-fit" src={item.photo}></img>
            </div>
            <div className="card-content">
              {item.likes.includes(state._id) ? (
                <BiDislike
                  className="material-icons"
                  onClick={() => {
                    unlikePost(item._id);
                  }}
                >
                  thumb_down
                </BiDislike>
              ) : (
                <BiLike
                  className="material-icons"
                  onClick={() => {
                    likePost(item._id);
                  }}
                >
                  thumb_up
                </BiLike>
              )}
              <h5>Posted By {item.postedBy.name}</h5>
              <h6>{item.likes.length} likes</h6>
              <h6>{item.comments.length} Comments</h6>
              {item.comments.map((record) => {
                return (
                  <h6 key={record._id}>
                    <span style={{ fontWeight: "500" }}>
                      Commented By {record.postedBy.name}: 
                    </span>{" "}
                    {record.text}
                  </h6>
                );
              })}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  makeComment(e.target[0].value, item._id);
                }}
              >
                <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="add a comment" />
                <button className="btn btn-primary rounded-pill" type="submit">Comment</button>
              </form>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default Home;
