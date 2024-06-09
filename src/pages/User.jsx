import React, { createRef, useState } from "react";
import { MdEmail } from "react-icons/md";
import { IoMdMore } from "react-icons/io";
import { useSelector } from "react-redux";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { getDatabase, ref as dref, set } from "firebase/database";

import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import { updateProfile, getAuth, onAuthStateChanged } from "firebase/auth";
import { GrClose } from "react-icons/gr";

const User = () => {
  const auth = getAuth();
  const db = getDatabase();
  const storage = getStorage();
  const user = useSelector((state) => state.userSlice.user);
  const [enabeEdit, setEnableEdit] = useState(false);
  // const[name, setName] = useState("")
  const [image, setImage] = useState("");
  const [cropData, setCropData] = useState("");
  const cropperRef = createRef();
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };
  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
    }
  };
  const handelClose = () => {
    setEnableEdit(false);
    setCropData("");
    setImage("");
  };
  const handelUpload = () => {
    setLoading(true);
    if (cropData) {
      const storageRef = ref(storage, user?.uid);
      const message4 = cropData;
      uploadString(storageRef, message4, "data_url").then((snapshot) => {
        getDownloadURL(storageRef).then((downloadURL) => {
          onAuthStateChanged(auth, () => {
            updateProfile(auth.currentUser, {
              photoURL: downloadURL,
            }).then(() => {
              set(dref(db, "users/" + user.uid), {
                email: user.email,
                photoURL: downloadURL, 
                username: user.displayName,
              }); 
              localStorage.setItem("user", JSON.stringify(auth.currentUser));
              dispatch(loggeduser(auth.currentUser)); 

              setEnableEdit(false);
              setCropData("");
              setImage(""); 
              setLoading(false);
              // window.location.reload();
            });
          });
        });
      });
    }
  };
  return (
    <div className=" w-96 bg-white shadow-lg rounded-lg overflow-hidden my-4  m-auto h-fit">
      {enabeEdit && (
        <div className=" absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.6)] border p-5 rounded-xl flex justify-center items-center ">
          <div className=" w-1/4 bg-white  py-5 px-5 rounded-xl ">
            <div className="flex justify-between">
              {cropData &&
                (loading ? (
                  <button className=" py-1 w-20 bg-white-600 rounded-xl text-white flex justify-center items-center">
                    <div className="flex flex-row gap-2">
                      <div className="w-4 h-4 rounded-full bg-red-600 animate-bounce"></div>
                      <div className="w-4 h-4 rounded-full bg-blue-600 animate-bounce [animation-delay:-.3s]"></div>
                      <div className="w-4 h-4 rounded-full bg-yellow-500 animate-bounce [animation-delay:-.5s]"></div>
                    </div>
                  </button>
                ) : (
                  <button
                    onClick={handelUpload}
                    className=" py-1 w-20 bg-green-600 rounded-xl text-white flex justify-center items-center"
                  >
                    Save
                  </button>
                ))}
              <button
                onClick={handelClose}
                className=" py-1 px-3 bg-red-600 rounded-lg text-white "
              >
                <GrClose />
              </button>
            </div>

            <div className=" mt-4">
              <label
                htmlFor="profile"
                className=" bg-yellow-600 text-white py-2 px-3 mb-4 rounded-xl cursor-pointer inline-block "
              >
                Update your Profile
                <input
                  id="profile"
                  type="file"
                  className="hidden"
                  onChange={onChange}
                />
              </label>

              {image && (
                <Cropper
                  ref={cropperRef}
                  style={{ height: 400, width: "100%" }}
                  zoomTo={0.5}
                  initialAspectRatio={1}
                  preview=".img-preview"
                  src={image}
                  viewMode={1}
                  minCropBoxHeight={10}
                  minCropBoxWidth={10}
                  background={false}
                  responsive={true}
                  autoCropArea={1}
                  checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                  guides={true}
                />
              )}

              <button
                onClick={getCropData}
                className=" py-2 px-4 bg-blue-500 rounded-xl text-white my-2 block"
              >
                Crop Image
              </button>
              <img src={cropData} alt="" className="28" />
              <div></div>
            </div>
          </div>
        </div>
      )}

      <img
        className="w-full h-56 object-cover object-center"
        src={user?.photoURL}
        alt="avatar"
      />
      <div className="flex items-center justify-between px-6 py-3 bg-gray-900">
        <h1 className="mx-3 text-white font-semibold text-lg">
          {user?.displayName}
        </h1>
        <div
          onClick={() => setEnableEdit(true)}
          className="group relative w-fit"
        >
          <IoMdMore className=" text-white text-2xl cursor-pointer" />
          <p className=" text-white hidden absolute bottom-full right-0 group-hover:block whitespace-nowrap	 ">
            Edite profile
          </p>
        </div>
      </div>
      <div className="py-4 px-6">
        <p className=" py-2 text-lg text-gray-700">Bio</p>
        <div className="flex items-center mt-4 text-gray-700">
          <MdEmail />
          <h1 className="px-2 text-sm">Email</h1>
        </div>
      </div>
    </div>
  );
};
export default User;
