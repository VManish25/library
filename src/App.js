import NavBar from "./components/NavBar";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./components/Home";
import ManageBooks from './components/ManageBooks'
import CreateBook from './components/CreateBook'
import React from "react";
import EditBook from './components/EditBook'

function App() {
  return <>
  <BrowserRouter>
    <div>
      <NavBar/>
    </div>
    <div className="container-fluid">
      <Routes>
          <Route path="/create" element={<CreateBook/>}/>
          <Route path="/manage" element={<ManageBooks/>}/>
          <Route path="/edit/:id" element={<EditBook/>}/>
          <Route path="/*" element={<Home/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  </>
}


export default App;
