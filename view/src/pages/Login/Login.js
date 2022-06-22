import React, {useState,useContext} from 'react';
import {useNavigate } from "react-router-dom";
import {userConnect} from '../../store/userConnect';
import {login} from '../../services/user';
import "./Login.css";

function Login(){

  const {connect,setConnect} = useContext(userConnect);
  let navigate = useNavigate();
  const [message,setMessage] = useState();
  const [state , setState] = useState({
    userName : "",
    password : ""
  });
  
  const redirectToLenders = () => {
    navigate('/');
  }

  const sendDetailsToServer = async () => {
    if(state.userName.length && state.password.length) {
      const result = await login(state.userName,state.password);
      if(result.status === 200){
        console.log("token",)
        localStorage.token = result.data.token;
        setConnect(true);
        redirectToLenders();
      }
      else{
        setMessage('error'); 
      }
    }
    else
    {
      setMessage('please enter valid userName and password')   
    } 
  }

  const handleChange = (e) => {
    const {id , value} = e.target;
    setState(prevState => ({
        ...prevState,
        [id] : value
    }))
  }

    return (
    <div className="card col-12 col-lg-4 login-card mt-2 hv-center login">
      <form>
          <div className="form-group text-left">
            <label>UserName</label>
            <input type="text" 
                    className="form-control" 
                    id="userName"  
                    value={state.userName}
                    onChange={handleChange}
            />
            </div>
            <div className="form-group text-left">
                <label>Password</label>
                <input type="password" 
                    className="form-control" 
                    id="password" 
                    value={state.password}
                    onChange={handleChange}
                />
            </div>
            <button 
                type="button"
                className="btn btn-dark mb-2"
                onClick={sendDetailsToServer}
            >Login
            </button>
            <br />
        </form>
        <div style={{color:"red"}}>{message}</div>
      </div>
    );

}
export default Login;