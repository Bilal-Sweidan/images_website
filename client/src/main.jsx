import React  from 'react';
import ReactDOM from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
// import reportWebVitals from './reportWebVitals.js';

// views
import Home from './views/Home'
import Sign_in from './views/signIn';
import Register from './views/Register'
import Admin from './views/Admin'
import User from './views/User'

// child componenets
import AddImages from "./components/Admin-AddImages";
import User_Home from "./components/User-Home";
import Upload_Image from "./components/Upload-Image";

import { createBrowserRouter,RouterProvider } from 'react-router-dom';
const router = createBrowserRouter([
  {
    path:'/',
    element: <Home/>
  },
  {
    path:'/sign-in',
    element:<Sign_in />
  },
  {
    path: '/Register',
    element: <Register/>
  },
  {
    path:'/Admin',
    element: <Admin/>,
    children: [
      {
        path: 'add-images',
        element: <AddImages/>
      }
    ]
  },
  {
    path: '/User',
    element: <User/>,
    children: [
      {
        path: '/User',
        element: <User_Home/>,
      },
      {
        path: "upload-image",
        element: <Upload_Image/>
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}/>
  // <React.StrictMode>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
