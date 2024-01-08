import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [message, setMessage]=useState("");
    const baseUrl = "http://localhost:5000";

    const navigate = useNavigate();


    //login user

    const login =async(formData)=>{
        const response = await fetch(`http://localhost:5000/users?email=${formData.email}&password=${formData.password}`, {method:"GET"});
        const users = await response.json();
        if(users.length > 0){
            setMessage("Logged in successfully");
            localStorage.setItem("todoUser", JSON.stringify(users[0]));
            setUser(users[0]);
            setTimeout(()=>{
                navigate("/task-list");
            }, 3000)
            
        }else{
            setMessage("Email/Password incorrect");
        }
    }


    //register user
    const register=async(formData)=>{        
        //fetch
        const config = {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify(formData)
        }
        const checkUser = await fetch(`http://localhost:5000/users?email=${formData.email}`, {method:"GET"});
        if(checkUser.ok){
            const user = await checkUser.json();
            if(user.length > 0){
                setMessage("user already exist");
            }else{
                const response = await fetch(`http://localhost:5000/users`, config);
                
                if(response.status === 201){
                    const user = await response.json();
                    setMessage("Registered Successfully");
                    localStorage.setItem("todoUser", JSON.stringify(user));
                    setUser(user);
                    setTimeout(()=>{
                        navigate("/task-list");
                    }, 3000)
                }else{
                    setMessage("something went wrong");
                }
            }
        }else{
            setMessage("something went wrong, please try again")
        }  
    }


    const logout = ()=>{
        localStorage.removeItem("todoUser");
        setUser(null);
        navigate("/");
    }
    



    //check user from localstorage
    const getLocalUser = async() => {
        let local = localStorage.getItem("todoUser");
        if(local){
            let userData = JSON.parse(local);
            const response = await fetch(`http://localhost:5000/users?email=${userData.email}`, {method:"GET"});
            if(response.ok){
                let userDetails = await response.json();
                if(userDetails.length > 0){
                    setUser(userData);
                }else{
                    localStorage.removeItem("todoUser");
                    navigate("/");
                }
            }else{
                console.log("something went wrong");
            }
        }     
        
    }

    useEffect(() => {
        getLocalUser();
    }, [])

    return (
        <AuthContext.Provider value={{
            user,
            login,
            message,
            setMessage,
            register,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;