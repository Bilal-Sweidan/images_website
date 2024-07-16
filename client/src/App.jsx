import { BrowserRouter, Routes, Route} from "react-router-dom"


import Home from './views/Home'
import Sign_in from './views/signIn';
import Register from './views/Register'
import Admin from './views/Admin'
import User from './views/User'

// child componenets
import AddImages from "./components/Admin-AddImages";
import User_Home from "./components/User-Home";
import Upload_Image from "./components/Upload-Image";
import './App.css'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
          
          </Route>

          <Route path='/sign-in' element={<Sign_in />}>

          </Route>
          
          <Route path='/register' element={<Register />}>
              
          </Route>

          <Route path="/Admin" element={<Admin/>}>
            <Route path="add-images" element={<AddImages/>}/>
          </Route>

          <Route path="/User" element={<User/>}>
            <Route path="/User" element={<User_Home/>}/>
            <Route path="upload-image" element={<Upload_Image/>}/>
          </Route>

        </Routes>
      </BrowserRouter>
    </>
    // <div className="App">
    // </div>
  );
}

export default App;
