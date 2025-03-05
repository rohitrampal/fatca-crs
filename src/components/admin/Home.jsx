// import { useState } from "react";
import { Link } from "react-router-dom";
import { IoReorderThree } from "react-icons/io5";

export default function Home() {
    // const [isSidebarVisible, setSidebarVisible] = useState(true);
  return (
    <>
    <div>
        <div className='sidebar m-2 flex justify-between'>
            <div>
            <button><IoReorderThree  className="text-3xl"/></button>
            
            </div>
            <div >
                <span><Link to={'/login'} >Login</Link></span>{'/'}
                <span><Link to={'/signup'} >signup</Link></span>
            </div>

        </div>
        <div>
        <nav className="h-96 w-fit bg-slate-600">
          <ul>
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/stats">Stats</Link>
            </li>
            <li>
              <Link to="/requests">Requests</Link>
            </li>
            
          </ul>
        </nav>
        </div>
    </div>
    </>
  )
}
