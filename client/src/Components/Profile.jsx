import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Profile() {
  const [userData, setUserData] = useState({ name: "", profileImg: "" });
  const [newName, setNewName] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const user = localStorage.getItem("id");
      const res = await axios.get(`http://localhost:3000/userProfile/${user}`);
      setUserData(res.data);
      setNewName(res.data.name);
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  const handleFileUpload = (e) => {
    let note = toast.loading("Uploading Image..!!", {
      position: "top-center",
    });
    let file = e.target.files[0];
    let formData = new FormData();
    formData.append("image", file);
    const user = localStorage.getItem("id");
    axios
      .post(`http://localhost:3000/upload/${user}`, formData)
      .then((res) => {
        setUserData({ ...userData, profileImg: res.data.url });
        localStorage.setItem("profile", res.data.url);
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

  const handleSaveChanges = async () => {
    if (!newName.trim()) {
      return toast.warning("Name cannot be empty");
    }

    try {
      const user = localStorage.getItem("id");
      const res = await axios.put(`http://localhost:3000/updateProfile/${user}`, { name: newName });
      localStorage.setItem("user", res.data.name);
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Failed to update profile");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50 py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-slate-100">
            {/* Header */}
            <h3 className="text-3xl md:text-4xl font-extrabold text-center mb-2 text-slate-800">
              Your Profile
            </h3>
            <p className="text-center text-slate-500 mb-10">
              Personalize your identity on iFinance
            </p>

            {/* Profile Image Section */}
            <div className="flex flex-col items-center mb-10">
              <div className="relative group">
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-indigo-500 shadow-2xl transition-transform duration-300 group-hover:scale-105 bg-slate-100 flex items-center justify-center">
                  {userData.profileImg ? (
                    <img
                      src={userData.profileImg}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-teal-500 flex items-center justify-center text-white text-5xl font-bold">
                      {newName?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                </div>

                {/* Upload Button */}
                <label
                  htmlFor="profile-picture"
                  className="absolute bottom-2 right-2 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full cursor-pointer shadow-xl transition-all duration-300 transform hover:scale-110 ring-4 ring-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </label>
                <input
                  type="file"
                  id="profile-picture"
                  onChange={handleFileUpload}
                  className="hidden"
                  accept="image/*"
                />
              </div>
              <p className="text-sm font-medium text-slate-400 mt-4">Click the camera icon to update your photo</p>
            </div>

            {/* Form Section */}
            <div className="space-y-6 max-w-md mx-auto">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">
                  Display Name
                </label>
                <input
                  className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-300 text-slate-800 text-lg font-medium"
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>

              {/* Save Button */}
              <button
                onClick={handleSaveChanges}
                className="w-full py-4 px-6 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 shadow-lg hover:shadow-indigo-200 transform hover:-translate-y-1 mt-4 cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
}

export default Profile;
