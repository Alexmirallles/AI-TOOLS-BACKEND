import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error,seterror]= useState(false)
  const [message,setMessage]=useState('')
  const [ success,setsuccess]=useState(false)
  const [loading,setloading]=useState(false)
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  const loginAction = async (data) => {   
    try {
        setloading(true)
      const response = await fetch(`${config.apiUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.data.token) {
        console.log("here")
        localStorage.setItem('email',res.data.admin.email)
        localStorage.setItem('token',res.data.token)
        setUser(JSON.stringify(res.data));
        setToken(res.data.token);
        navigate('/admin/dashboard')
        setloading(false)
        setsuccess(true)
      }

    } catch (err) {
        seterror(true)
        setMessage("Log in Failed")
        setloading(false)
    }
  };


  return (
    <AuthContext.Provider value={{ token, user, loginAction,error,message,loading,success }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};