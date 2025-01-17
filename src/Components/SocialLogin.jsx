import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const SocialLogin = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { googleSignIn } = useAuth();
  const handelGoogleSignup = () => {
    googleSignIn().then((result) => {
      const userInfo = {
        name: result?.user.displayName,
        email: result?.user.email,
      };
      console.log(userInfo);
      // create userCollection data base saved
      axiosPublic.post("/users", userInfo).then((res) => {
        if (res.data.insertedId) {
          toast.success("signin successfuly");
          navigate("/");
        }
      });
    });
  };
  return (
    <div>
      {/* Google Sign-in Button */}
      <button
        onClick={handelGoogleSignup}
        type="button"
        className="w-full py-2 bg-white border border-gray-300 text-gray-700 rounded-xl flex items-center justify-center gap-2
                                        hover:bg-gray-100 transition-all duration-300 font-medium focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
      >
        <FcGoogle className="w-5 h-5" />
        Sign in with Google
      </button>
    </div>
  );
};

export default SocialLogin;
