// // import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { IoReorderThree } from "react-icons/io5";
// import Profile from "./SemiProfile";
// // import { useEffect, useState } from "react";
// import { CiHome } from "react-icons/ci";
// import { TbBrandGoogleAnalytics, TbHexagonLetterRFilled } from "react-icons/tb";
// import { IoIosLogOut,IoIosLogIn  } from "react-icons/io";
// import { ImProfile } from "react-icons/im";
// import { FaCodePullRequest } from "react-icons/fa6";
// import { useDispatch, useSelector } from 'react-redux'
// import { logout, selectUser } from "../../redux/features/userSlice";

// export default function Home() {
//     // const [isSidebarVisible, setSidebarVisible] = useState(true);
//     // const [isLoggedin, setIsLoggedin] = useState(false)
//     const user = useSelector(selectUser);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     // console.log("user details in  redux---->",user);    
//     // useEffect(()=>{
//     //   const loggedinData = localStorage.getItem('token');
//     //   if(loggedinData) setIsLoggedin(true)
//     // },[isLoggedin])

//     const handleLogout =()=>{
//       // localStorage.removeItem("token");
//       localStorage.clear()
//       dispatch(logout());
//       navigate('/mof/login');
//     }
//   return (
//     <>
//     <div>
//         <div className="flex ">
//           <nav className=" h-[668px] sm:h-[600px] md:h-[700px] lg:h-[825px] w-44 bg-slate-700 text-gray-300 p-2 lg:text-xl sm:text-sm  ">
//             <ul className="flex flex-col gap-y-5 ">
//               <li className="flex hover:bg-slate-800 hover:rounded-lg p-1">
//                 <CiHome className="mt-1 mr-1"/> <Link to="/mof">Dashboard</Link>
//               </li>
//               <li className="flex hover:bg-slate-800 hover:rounded-lg p-1">
//                 <ImProfile className="mt-1 mr-1"/> <Link to="/mof/profile">Profile</Link>
//               </li>
//               <li className="flex hover:bg-slate-800 hover:rounded-lg p-1">
//                 <TbBrandGoogleAnalytics className="mt-1 mr-1"/> <Link to="/mof/analytics">Analytics</Link>
//               </li>
//               <li className="flex hover:bg-slate-800 hover:rounded-lg p-1">
//                 <FaCodePullRequest className="mt-1 mr-1"/> <Link to="/mof/report-requests">Reports Requests</Link>
//               </li>
//               <li className="flex hover:bg-slate-800 hover:rounded-lg p-1">
//                 <TbHexagonLetterRFilled className="mt-1 mr-1"/> <Link to="/mof/rfi-requests">RFI Registration</Link>
//               </li>
//               { user  ? 
//               ( <li className="flex hover:bg-slate-800 hover:rounded-lg p-1">
//                   <IoIosLogOut className="mt-1 mr-1"/><button onClick={handleLogout}>Logout</button>
//                 </li> ):
//               ( 
//               <li className="flex hover:bg-slate-800 hover:rounded-lg p-1">
//                 <IoIosLogIn className="mt-1 mr-1"/><Link to={'/mof/login'} >Login</Link></li>
//               )
//               }
//             </ul>
//           </nav>
//           <div className="">
          
//           </div>
//         </div>

//     </div>
//     </>
//   )
// }

//         {/* <div className='sidebar m-2 flex justify-between'>
//             <div>
//             <button><IoReorderThree  className="text-3xl"/></button>
            
//             </div>
//             <div >
//               { isLoggedin ?
//               ( 
//                 <Profile />
//                ):
//               (
//                 <Link to={'/login'} >Login</Link>
//               )
//               }
                
//             </div>

//         </div> */}



import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoReorderThree } from "react-icons/io5";
import { CiHome } from "react-icons/ci";
import { TbBrandGoogleAnalytics, TbHexagonLetterRFilled } from "react-icons/tb";
import { IoIosLogOut, IoIosLogIn } from "react-icons/io";
import { ImProfile } from "react-icons/im";
import { FaCodePullRequest } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from "../../redux/features/userSlice";

export default function Home() {
    const [isSidebarVisible, setSidebarVisible] = useState(window.innerWidth >= 640);
    const user = useSelector(selectUser);
    console.log('data in  redux user--->',user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const handleResize = () => {
            setSidebarVisible(window.innerWidth >= 640);
        };
        
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    const handleLogout = () => {
        localStorage.clear();
        dispatch(logout());
        navigate('/mof/login');
    };

    const toggleSidebar = () => {
        setSidebarVisible((prev) => !prev);
    };

    return (
        <>
            <div>
                <div className={`h-[668px] sm:h-[600px] md:h-[700px] lg:h-[825px] w-44 bg-slate-700 text-gray-300 p-2 lg:text-xl sm:text-sm ${!isSidebarVisible  ? 'h-fit lg:h-fit md:h-fit sm:h-fit w-fit':''}`}>
                    <button 
                        onClick={toggleSidebar} 
                        className=" bg-slate-700 text-gray-300 hover:bg-slate-800 "
                    >
                        <IoReorderThree className="text-3xl" />
                    </button>
                    {isSidebarVisible && (
                        <nav className="">
                            <ul className="flex flex-col gap-y-5">
                                <li className="flex hover:bg-slate-800 hover:rounded-lg p-1">
                                    <CiHome className="mt-1 mr-1" /> <Link to="/mof">Reports History</Link>
                                </li>
                                <li className="flex hover:bg-slate-800 hover:rounded-lg p-1">
                                    <ImProfile className="mt-1 mr-1" /> <Link to="/mof/profile">Profile</Link>
                                </li>
                                <li className="flex hover:bg-slate-800 hover:rounded-lg p-1">
                                    <TbBrandGoogleAnalytics className="mt-1 mr-1" /> <Link to="/mof/analytics">Analytics</Link>
                                </li>
                                <li className="flex hover:bg-slate-800 hover:rounded-lg p-1">
                                    <FaCodePullRequest className="mt-1 mr-1" /> <Link to="/mof/report-requests">Reports Requests</Link>
                                </li>
                                <li className="flex hover:bg-slate-800 hover:rounded-lg p-1">
                                    <TbHexagonLetterRFilled className="mt-1 mr-1" /> <Link to="/mof/rfi-requests">RFI Registration</Link>
                                </li>
                                {user ? (
                                    <li className="flex hover:bg-slate-800 hover:rounded-lg p-1">
                                        <IoIosLogOut className="mt-1 mr-1" /><button onClick={handleLogout}>Logout</button>
                                    </li>
                                ) : (
                                    <li className="flex hover:bg-slate-800 hover:rounded-lg p-1">
                                        <IoIosLogIn className="mt-1 mr-1" /><Link to={'/mof/login'}>Login</Link>
                                    </li>
                                )}
                            </ul>
                        </nav>
                    )}
                </div>
            </div>
        </>
    );
}
