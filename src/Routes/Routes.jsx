import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layoute/MainLayout";
import Home from "../Home/Home";
import Signup from "../AuthProvider/Signup";
import Login from "../AuthProvider/Login";



export const router = createBrowserRouter([
    {
        path: '/' , 
        element: <MainLayout></MainLayout> , 
        children : [
            {
                path : '/' , 
                element : <Home></Home>
            } , 
            {
                path: 'signup' , 
                element: <Signup></Signup>
            } , 
            {
                path:'login' , 
                element: <Login></Login>
            } , 
        ]
    }
])