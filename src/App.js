// import { useState ,useEffect} from 'react'
import TabCompo from "./TabCompo";
import {useEffect, useState} from "react";

function App() {
    const [data,setData]=useState([]);
    useEffect(()=>
        fetch("http://localhost:5000/api/icecreams")
            .then(r => r.json())
            .then(setData()))

  return (
      <div className="container-4">
        <h1>ICECREAM</h1>
          <TabCompo/>
      </div>

  )
}

export default App;
