import axios from "axios";
import { useState } from "react";
// import { VscEye } from "react-icons/vsc";
// import { VscEyeClosed } from "react-icons/vsc";

import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../redux/features/userSlice";
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error,setError] = useState('')
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = async(e) => {
        e.preventDefault()
        if(!email && !password){
            setError("Empty fields are not allowed")
            return
        }
        setError("");
        // console.log('login credentails--->', email,password);
        // alert('login successfully');
        const response = await axios.post(`http://192.168.1.84:8080/api/auth/login`,{email,password});
        console.log("response---->",response.data)
        if(response.data.token){
            localStorage.clear();
            localStorage.setItem('token',response.data.token)
            localStorage.setItem('id',response.data?.id);
            const payload = {
                email: email,
                token: response.data?.token,
                id: response.data?.id,
            }
            dispatch(login(payload))
            navigate('/mof');
        }
    }
    
  return (
    <>
    <div className="w-96 mt-5 ml-5" >
        <h1 className="login text-2xl font-semibold mb-5 text-center">Login Page</h1>
        {error && <h1 className="text-red-500">{error}</h1>}
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-2" >
        <div>
            <label 
            htmlFor="Email" 
            className=""
            >Email:</label>
            <br />
            <input 
            type="email" 
            name="email" 
            id="email"
            placeholder="email"
            value={email}
            onChange={e=>setEmail(e.target.value)}
            className="bg-slate-200 rounded-lg p-1 outline-none"
            />
        </div>
        <div>
            <label htmlFor="password">password:</label><br />
            
            <p className="flex">
                <input 
                type="password" 
                name="password" 
                id="password"
                placeholder="password"
                value={password}
                onChange={e=>setPassword(e.target.value)}
                className="outline-none bg-slate-200 rounded-lg p-1"
                />
            </p>
            {/* <VscEye /> */}
        </div>
        <button type="submit" className="p-1 bg-blue-300 rounded-lg font-semibold text-white hover:text-black">Login</button>
        <p className="text-center">Create New Account</p>
        <Link to={'/mof/signup'} className="p-1 bg-blue-300 rounded-lg font-semibold text-white hover:text-black text-center" >Signup</Link>
    </form>
    </div>
    </>
  )
}
