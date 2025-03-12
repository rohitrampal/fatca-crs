import axios from "axios";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../redux/features/userSlice";

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
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const handleChange = (e)=>{
            setFormData({ ...formData, [e.target.name]:e.target.value })
        }

        const handleSubmit = async(e)=>{
            e.preventDefault();
            if(!formData.email || !formData.firstName || !formData.lastName || !formData.password || !formData.phoneNumber){
                setError('Empty fields not allowed');
                return
            }
            // alert('signup sent successfully')
            const data = {
                name : formData.firstName + " " + formData.lastName,
                email : formData.email,
                password : formData.password,
            }
            const response = await axios.post(`http://192.168.1.84:8080/api/auth/register`,data);
            
            console.log('data---->',formData)
            console.log('response---->',response.data)
            if(response.data.token){
                setError('');
                const payload = {
                    email: formData.email,
                    token: response.data?.token,
                    id: response.data?.id,
                }
                dispatch(login(payload))
                localStorage.setItem('token',response.data.token);
                localStorage.setItem('id',response.data?.id);
                navigate('/mof');
                // dispatch the payload data login to redux store
            }
        }        
        
    
  return (
    <>
    <div className="signup  w-96 mt-5 ml-5 ">
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
            <p className=" text-center">Already Have An Account</p>
            <Link to={'/mof/login'} className="login-button p-1 bg-blue-300 rounded-lg font-semibold text-white hover:text-black text-center">Login</Link>
        </form>
    </div>
    </>
  )
}
