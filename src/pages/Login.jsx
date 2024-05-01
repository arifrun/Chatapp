import React, { useState } from "react";
import { Link, json, useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { loggeduser } from "../slice/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const auth = getAuth();
  const db = getDatabase();
  let navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const [showPass, setshowPass] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const handelSubmit = () => {
    if (!loginData.email) {
      setEmailError("Email is required");
    } else if (!loginData.password) {
      setPasswordError("Password is required");
    } else {
      signInWithEmailAndPassword(auth, loginData.email, loginData.password)
        .then((res) => {
          if (res.user.emailVerified == false) {
            toast.error("Email is not verified!.", {
              position: "top-center",
              autoClose: 3000,
              closeOnClick: true,
              theme: "light",
            });
          } else {
            set(ref(db, "users/" + res.user.uid), {
              username: res.user.displayName,
              email: res.user.email,
              profile_picture: res.user?.photoURL,
            })
              .then(() => {
                toast.success("Login succesful!.", {
                  position: "top-center",
                  autoClose: 3000,
                  closeOnClick: true,
                  theme: "light",
                });
                localStorage.setItem("user", JSON.stringify(res.user));
                dispatch(loggeduser(res.user));
                setTimeout(() => {
                  navigate("/");
                }, 2500);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((error) => {
          console.log(error.message);
          if (error.code == "auth/invalid-email") {
            setEmailError("Invalid email, Please use a valid email");
          }
          if (error.code == "auth/invalid-credential") {
            toast.error("Authorization failed!.", {
              position: "top-center",
              autoClose: 3000,
              closeOnClick: true,
              theme: "light",
            });
          }
          if (error.code == "auth/too-many-requests") {
            toast.error(
              "Too many request! resetting your password and try again",
              {
                position: "top-center",
                autoClose: 3000,
                closeOnClick: true,
                theme: "light",
              }
            );
          }
        });
    }
  };
  const provider = new GoogleAuthProvider();
  const handelGoogle = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
      const credential =  GoogleAuthProvider.credentialFromResult(res);
        const token = credential.accessToken;

        const user = res.user;
        console.log(user);
        set(ref(db, "users/" + res.user.uid), {
          username: res.user.displayName,
          email: res.user.email,
          profile_picture: res.user.photoURL,
        })
          .then(() => {
            toast.success("Login succesful!.", {
              position: "top-center",
              autoClose: 3000,
              closeOnClick: true,
              theme: "light",
            });
            localStorage.setItem("user", JSON.stringify(res.user));
            dispatch(loggeduser(res.user));
            setTimeout(() => {
              navigate("/");
            }, 2500);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorMessage = error.message;
        console.log(errorMessage);
        // ...
      });
  };
  return (
    <section className=" pt-10">
      <ToastContainer />
      <div className="container">
        <div className=" text-center">
          <h2 className=" text-5xl font-bold text-brand">ChatApp</h2>

          <div className="registration">
            <h1 className=" font-primary font-bold text-3xl text-brand">
              Login
            </h1>
            <p className=" font-primary font-normal text-base text-secondary mt-2">
              Free register and you can enjoy it
            </p>
            <div className="form">
              <input
                onChange={(e) => {
                  setLoginData({ ...loginData, email: e.target.value }),
                    setEmailError("");
                }}
                className="input"
                type="email"
                placeholder="E-mail"
              />

              {emailError && (
                <p className=" w-fit text-white text-start py-1 px-2 bg-red-500 rounded-lg mt-2">
                  {emailError}
                </p>
              )}
              <div className="flex items-center my-5 relative cursor-pointer">
                <input
                  onChange={(e) => {
                    setLoginData({ ...loginData, password: e.target.value }),
                      setPasswordError("");
                  }}
                  className="input"
                  type={showPass ? "text" : "password"}
                  placeholder="Password"
                />
                <div
                  onClick={() => {
                    setshowPass(!showPass);
                  }}
                  className=" absolute top-1/2 right-5 -translate-y-1/2"
                >
                  {showPass ? <FaEye /> : <FaEyeSlash />}
                </div>
              </div>
              {passwordError && (
                <p className=" w-fit text-white text-start py-1 px-2 bg-red-500 rounded-lg mt-2">
                  {passwordError}
                </p>
              )}
              <span className="forget-password">
                <a href="#">Forget Password ?</a>
              </span>
              <button onClick={handelSubmit} className="login-button">
                Login
              </button>
              <p>
                Don't have any account.{" "}
                <Link
                  className=" text-[#1c4ae0] border-b	 border-solid border-[#1c4ae0]"
                  to="/registration"
                >
                  Sign in
                </Link>
              </p>
              <button onClick={handelGoogle} className="w-60 m-auto">
                <img src="/google.png" alt="google" className="w-full" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
