import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
const CreatePost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  function newPost(){
        fetch("http://localhost:5000/post/createpost", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
          body: JSON.stringify({
            title,
            body,
            pic: url,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
            //   alert(data.error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.error
              })
            } else {
            //   alert("Created post Successfully");
            Swal.fire(
                'Created post',
                'Successfully!',
                'success'
              )
              navigate("/home");
            }
          })
          .catch((err) => {
            console.log(err);
          });
  }
  useEffect(() => {
    if(url){
    newPost();    
    }
  }, [url]);

  const postDetails = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "Discussion Forum");
    data.append("cloud_name", "dk2otzgdq");
    fetch("https://api.cloudinary.com/v1_1/dk2otzgdq/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
      // newPost();
  };

  return (
    <div
      className="card input-filed"
      style={{
        margin: "30px auto",
        width: "580px",
        height: "450px",
        padding: "100px",
        textAlign: "center",
      }}
    >
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {/* <input
        type="text"
        placeholder="body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      /> */}
      
     <textarea style= {{height: "100%",borderBlock:"inherit",outline:"none"}} placeholder="body" value={body} rows="10" cols="70" wrap="soft" onChange={(e) => setBody(e.target.value)}></textarea>
      <div className="file-field input-field">
        <div className="btn btn-primary">
          <span>Uplaod Image</span>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button
        style={{height :"50%"}}
        className="btn waves-effect waves-light btn-primary"
        onClick={() => postDetails()}
      >
        Submit post
      </button>
    </div>
  );
};

export default CreatePost;
