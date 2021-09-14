import React, { useState,useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route} 
from 'react-router-dom';
import Login from '../Login/Login';
import Lenders from '../Lenders/Lenders';
import history from '../../services/history';
import {userContext} from '../../services/userContext';
import { checkToken } from '../../services/request/user';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
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
        }
      }
    }
    checkConnection();
  },[])


  return (
    <div>
      <Router history={history}>
        <div>
          <userContext.Provider value={{connect,setConnect}}>
            <NavigationBar></NavigationBar>
            <Switch>
              <Route exact path="/" ><Lenders /></Route>
              <Route path="/login" > <Login/></Route>
            </Switch>
          </userContext.Provider>
        </div> 
    </Router>
    </div>
  );
}
 
export default App;