import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Signup() {
        const initialState = {
            firstName:'',
            lastName:'',
            phoneNumber:'',
            email:'',
            password:'',
        }
        const [formData, setFormData] = useState(initialState);
        const [error, setError] = useState('');
        const navigate = useNavigate();
        const handleChange = (e)=>{
            setFormData({ ...formData, [e.target.name]:e.target.value })
        }

        const handleSubmit = (e)=>{
            e.preventDefault();
            if(!formData.email || !formData.firstName || !formData.lastName || !formData.password || !formData.phoneNumber){
                setError('Empty fields not allowed');
                return
            }
            console.log('data---->',formData)
            alert('signup successfully')
            setError('');
            navigate('/login');
        }        
        
    
  return (
    <>
    <div className="signup  w-96 mt-20 ml-32 ">
        <h1 className="signup-form-heading text-2xl font-semibold text-center ">SignUp Form</h1>
        {error && <div className="error text-red-500">{error}</div>}
        <form onSubmit={handleSubmit} className="form-signup flex flex-col gap-y-2">
            <div >
                <label htmlFor="firstName">First Name:</label><br />
                <input type="text" name="firstName" id="firstName"
                placeholder="enter your first name"
                value={formData.firstName}
                onChange={handleChange}
                className="firstName outline-none bg-slate-200 p-1 rounded-md"
                 />
            </div>
            <div>
                <label htmlFor="lastName">Last Name:</label><br />
                <input type="text" name="lastName" id="lastName"
                placeholder="enter your last name"
                value={formData.lastName}
                onChange={handleChange}
                className="lastName outline-none bg-slate-200 p-1 rounded-md"
                 />
            </div>
            <div >
                <label htmlFor="phoneNumber">Phone Number:</label><br />
                <input type="tel" name="phoneNumber" id="phoneNumber"
                placeholder="enter your phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="phoneNumber outline-none bg-slate-200 p-1 rounded-md"
                 />
            </div>
            <div >
                <label htmlFor="email">Email:</label><br />
                <input type="email" name="email" id="email"
                placeholder="enter your email"
                value={formData.email}
                onChange={handleChange}
                className="email outline-none bg-slate-200 p-1 rounded-md"
                 />
            </div>
            <div>
                <label htmlFor="password">Password:</label><br />
                <input type="password" name="password" id="password"
                placeholder="enter your password"
                value={formData.password}
                onChange={handleChange}
                className="password outline-none bg-slate-200 p-1 rounded-md"
                 />
            </div>
            <button type="submit" className="submit-signup p-1 bg-blue-300 rounded-lg font-semibold text-white hover:text-black ">SignUp</button>
        </form>
    </div>
    </>
  )
}
