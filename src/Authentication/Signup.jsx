import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { useForm } from "react-hook-form";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const Signup = () => {
  const axiosPublic = useAxiosPublic();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { createUser, updateUserProfile } = useAuth();

  const onSubmit = (data) => {
    createUser(data.email, data.password).then((res) => {
      const user = res.user;
      updateUserProfile(data.name, data.photoURL).then(async (name) => {
        if (user) {
          const userInfo = { name: user.displayName, email: user.email };
          console.log(userInfo);
          // create userCollection data base saved
          const userData = await axiosPublic
            .post("/users", userInfo)
            .then((res) => {
              if (res.data.insertedId) {
                console.log(res.data.data);
                toast.success("signin successfuly");
                navigate("/");
              }
            });
        }
      });
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-50 to-purple-100 p-4">
      {/* Main Container with Glass Effect */}
      <div
        className="max-w-5xl w-full bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden
                      md:flex md:h-auto lg:h-[500px] my-8"
      >
        <div
          className="md:w-5/12 relative bg-purple-500 py-6 px-4 lg:py-8 lg:px-6
                        flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-16 h-16 md:w-24 md:h-24 bg-purple-400 rounded-full -translate-x-8 -translate-y-8"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 md:w-24 md:h-24 bg-pink-400 rounded-full translate-x-8 translate-y-8"></div>

          <div className="relative z-10 flex flex-col items-center">
            {/*  Heart Icon */}
            <div className="w-24 h-24 md:w-32 md:h-32 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <Heart className="w-12 h-12 md:w-16 md:h-16 text-purple-500" />
            </div>

            {/* Welcome Text */}
            <div className="text-center mt-2">
              <h2 className="text-xl md:text-2xl font-bold mb-1 text-white">
                Welcome to Matrimony
              </h2>
              <p className="text-xs md:text-sm text-purple-100">
                Begin your journey to find your soulmate
              </p>
            </div>
          </div>
        </div>

        {/* Right Form Side */}
        <div className="md:w-7/12 px-4 py-6 lg:px-8 lg:py-8 flex flex-col justify-center">
          <div className="max-w-sm w-full mx-auto">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4">
              Create Your Account
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name Input */}
              <div className="space-y-1">
                <label className="text-xs md:text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  {...register("name", {
                    required: true,
                  })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all bg-white/50 backdrop-blur-sm"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email Input */}
              <div className="space-y-1">
                <label className="text-xs md:text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all bg-white/50 backdrop-blur-sm"
                  placeholder="Enter your email"
                />
              </div>

              {/* Password Input */}
              <div className="space-y-1">
                <label className="text-xs md:text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                  })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all bg-white/50 backdrop-blur-sm"
                  placeholder="Create a password"
                  required
                />
                {errors.password?.type === "required" && (
                  <span className="text-red-600 text-xs">
                    password is required
                  </span>
                )}
                {errors.password?.type === "length" && (
                  <span className="text-red-600 text-xs">
                    Password must be 6 characters
                  </span>
                )}
                {errors.password?.type === "maxLength" && (
                  <span className="text-red-600 text-xs">
                    Password must be less than 20
                  </span>
                )}
                {errors.password?.type === "pattern" && (
                  <span className="text-red-600 text-xs">
                    Password must have one Uppercase one lower case, one number
                    and one special character.
                  </span>
                )}
              </div>

              {/* Photo URL Input */}
              <div className="space-y-1">
                <label className="text-xs md:text-sm font-medium text-gray-700">
                  Photo URL
                </label>
                <input
                  type="url"
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all bg-white/50 backdrop-blur-sm"
                  placeholder="Enter photo URL"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl 
                          hover:from-purple-700 hover:to-pink-600 transition-all duration-300 font-medium
                          focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                Create Account
              </button>

              {/* Login Link */}
              <p className="text-center text-xs md:text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
