import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

import "../Styles/Profile.css";

function Profile() {
  const [userData, setUserData] = useState({});

  const handleFileUpload = (e) => {
    console.log(e.target.value);
    let note = toast.loading("Uploading Image..!!", {
      position: "top-center",
    });
    let file = e.target.files[0];
    let formData = new FormData();
    formData.append("image", file);
    let user = localStorage.getItem("user")
    axios
      .post(`https://s56-ayush-capstone-dopahiya.onrender.com/upload/${user}`, formData)
      .then((res) => {
        let obj = { ...userData, profileImg: res.data.url };
        setUserData(obj);
        sessionStorage.setItem("profileImg", res.data.url);
        toast.update(note, {
          render: "Image Uploaded Successfully",
          type: "success",
          isLoading: false,
          autoClose: 1000,
          hideProgressBar: true,
          theme: "colored",
        });
      })
      .catch((err) => {
        if (err.response.status === 401) {
          return toast.update(note, {
            render: err.response.data,
            type: "warning",
            isLoading: false,
            autoClose: 1000,
            hideProgressBar: true,
            theme: "colored",
          });
        }
        console.log(err);
        toast.update(note, {
          render: "Error Uploading Image",
          type: "error",
          isLoading: false,
          autoClose: 1000,
          hideProgressBar: true,
          theme: "colored",
        });
      });
  };

  return (
    <>
      <Navbar />
      <div className="mainn">
        <h3 className="title">
          Update your profile to personalize your experience.
        </h3>
        <input
          type="file"
          name="profile-picture"
          id="profile-picture"
          onChange={handleFileUpload}
        />
        <label htmlFor="username">
          Username
          <input className="usernamee" type="text" id="username" placeholder="Edit the Username" />
        </label>
        <button className="saveBtn">Save</button>
      </div>
    </>
  );
}

export default Profile;
