import { useState } from "react";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error,setError] = useState('')
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault()
        if(!email && !password){
            setError("Empty fields are not allowed")
            return
        }
        console.log('login credentails--->', email,password);
        alert('login successfully');
        setError("");
        navigate('/');
    }
  return (
    <>
    <div className="w-96 mt-20 ml-32" >
        <h1 className="login text-2xl font-semibold mb-5">Login Page</h1>
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
            
            <input 
            type="password" 
            name="password" 
            id="password"
            placeholder="password"
            value={password}
            onChange={e=>setPassword(e.target.value)}
            className="outline-none bg-slate-200 rounded-lg p-1"
            />
            {/* <VscEyeClosed />
            <VscEye /> */}
        </div>
        <button type="submit" className="p-1 bg-blue-300 rounded-lg font-semibold text-white hover:text-black">Login</button>
    </form>
    </div>
    </>
  )
}
