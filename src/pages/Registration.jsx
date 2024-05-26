import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Registration = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
 let  re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const [userError, setUserError] = useState({
    nameError: "",
    emailError: "",
    passwordError: "",
  });

  const handelSubmit = () => {
      
    if (!name) {
      setUserError({ nameError: "Name is required !" });
    } else if (!email) {
      setUserError({ emailError: "Email is required" });
    } else if (!password) {
      setUserError({ passwordError: "password is required" });
    } 
    // else if(!re.test(password)){ 
    //   setUserError({passwordError:"input a strong password"})
    // }  
     else {
      createUserWithEmailAndPassword(auth, email, password, name) 
        .then(() => {
          sendEmailVerification(auth.currentUser);
          updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: "/profile.png"
          }).then(()=>{
            toast.success("Registration Successful!. Verify Your Email", { 
              position: "top-center",
              autoClose: 3000,
              closeOnClick: true,
              theme: "light",
            });
            setName("");
            setEmail("");
            setPassword("");
            setUserError({ emailError: "" });
            setUserError({ passwordError: "" });
            setTimeout(() => {
              navigate("/login");
            }, 3500);
          });

        })
        .catch((error) => {
          console.log(error.code);
          if (error.code.includes("auth/invalid-email")) {
            setUserError({ emailError: "Invalid Email" });
          }
          if (error.code.includes("auth/email-already-in-use")) {
            setUserError({
              emailError: "Email already in used, try with another email!",
            });
          }
          if (error.code.includes("auth/weak-password")) {
            setUserError({
              passwordError: "Password should be at least 6 charecters",
            });
          }
        });
    }
  };

  return (
    <section className=" pt-10">
      <ToastContainer />
      <div className="container">
        <div className=" text-center">
          <h2 className=" text-5xl font-bold text-brand">ChatApp</h2>
          <div className="registration">
            <h1 className=" font-primary font-bold text-3xl text-brand">
              Get started with easily register
            </h1>
            <p className=" font-primary font-normal text-base text-secondary mt-2">
              Free register and you can enjoy it
            </p>
            <div className="form">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
                type="text"
                placeholder="Full Name"
              />
              {userError.nameError && (
                <p className=" w-fit text-white text-start py-1 px-2 bg-red-500 rounded-lg mt-2">
                  {userError.nameError}
                </p>
              )}

              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                type="email"
                placeholder="E-mail"
              />
              {userError.emailError && (
                <p className=" w-fit text-white text-start py-1 px-2 bg-red-500 rounded-lg mt-2">
                  {userError.emailError}
                </p>
              )}
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                type="password"
                placeholder="Password"
              />
              {userError.passwordError && (
                <p className=" w-fit text-white text-start py-1 px-2 bg-red-500 rounded-lg mt-2">
                  {userError.passwordError}
                </p>
              )}

              <button onClick={handelSubmit} className="login-button">
                Sign Up
              </button>
              <p>
                Alredy have an account ?{" "}
                <Link
                  className=" text-[#1c4ae0] border-b border-solid border-[#1c4ae0]"
                  to="/login"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registration;
