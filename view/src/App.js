import React, { useState,useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate} 
from 'react-router-dom';
import Login from './pages/Login/Login';
import Lenders from './pages/Lenders/Lenders';
import history from './services/history';
import {userConnect} from './store/userConnect';
import { checkToken } from './services/user';
import Layout from './layout/Default';
import "./App.css";


function App() {
  
  const [connect,setConnect] = useState(false);
  

  useEffect(() => {
    async function checkConnection(){
      if(localStorage.token)
      {
        const result = await checkToken();
        
        if(result.status == 200)
        {
          
          setConnect(true);
          console.log("result",result)
        }
      }
    }
    checkConnection();
  },[])


  return (
    <div>
      <Router history={history}>
        <div>
          <userConnect.Provider value={{connect,setConnect}}>
            <Layout/>
            <Routes>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/" element={ connect ? <Lenders/>  : <Navigate to="/login" />}></Route>
            </Routes>
          </userConnect.Provider>
        </div> 
    </Router>
    </div>
  );
}
 
export default App;