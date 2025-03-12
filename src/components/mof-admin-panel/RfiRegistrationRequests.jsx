// import axios from "axios";
// import { useEffect, useState } from "react"

// export default function RfiRegistrationRequests() {
//   // const data = [
// //     {
// //       "dateOfIncorporation": "12:12",
// //       "countryOfIncorporation": "India",
// //       "businessAdddressCountry": "234-B Punjab, India",
// //       "contactFirstName": "Akshat",
// //       "contactLastName": "Thakur",
// //       "telephone": "7891452364",
// //       "businessAddress": "234-B Zirakpur, Punjab, India",
// //       "licenseAuthority": "ISO",
// //       "tradeLicenseNumber": "123321"
// //     },
// //     {
// //       "dateOfIncorporation": "10:30",
// //       "countryOfIncorporation": "India",
// //       "businessAdddressCountry": "45 MG Road, Mumbai, Maharashtra",
// //       "contactFirstName": "Rahul",
// //       "contactLastName": "Sharma",
// //       "telephone": "9123456789",
// //       "businessAddress": "45 MG Road, Andheri, Mumbai, Maharashtra, India",
// //       "licenseAuthority": "FSSAI",
// //       "tradeLicenseNumber": "567891"
// //     },
// //     {
// //       "dateOfIncorporation": "09:15",
// //       "countryOfIncorporation": "India",
// //       "businessAdddressCountry": "78 Connaught Place, Delhi",
// //       "contactFirstName": "Priya",
// //       "contactLastName": "Verma",
// //       "telephone": "9812345678",
// //       "businessAddress": "78 Connaught Place, New Delhi, India",
// //       "licenseAuthority": "GSTIN",
// //       "tradeLicenseNumber": "765432"
// //     },
// //     {
// //       "dateOfIncorporation": "14:00",
// //       "countryOfIncorporation": "India",
// //       "businessAdddressCountry": "123 Lal Bagh, Bangalore, Karnataka",
// //       "contactFirstName": "Vikram",
// //       "contactLastName": "Rao",
// //       "telephone": "9876543210",
// //       "businessAddress": "123 Lal Bagh, Jayanagar, Bangalore, Karnataka, India",
// //       "licenseAuthority": "MCA",
// //       "tradeLicenseNumber": "345678"
// //     },
// //     {
// //       "dateOfIncorporation": "11:45",
// //       "countryOfIncorporation": "India",
// //       "businessAdddressCountry": "67 Salt Lake, Kolkata, West Bengal",
// //       "contactFirstName": "Ananya",
// //       "contactLastName": "Sen",
// //       "telephone": "9871234567",
// //       "businessAddress": "67 Salt Lake, Sector V, Kolkata, West Bengal, India",
// //       "licenseAuthority": "SEBI",
// //       "tradeLicenseNumber": "876543"
// //     },
// //     {
// //       "dateOfIncorporation": "16:20",
// //       "countryOfIncorporation": "India",
// //       "businessAdddressCountry": "12 Charminar, Hyderabad, Telangana",
// //       "contactFirstName": "Kiran",
// //       "contactLastName": "Das",
// //       "telephone": "9123987654",
// //       "businessAddress": "12 Charminar Road, Hyderabad, Telangana, India",
// //       "licenseAuthority": "RBI",
// //       "tradeLicenseNumber": "234567"
// //     }
// // ];
//   const[rfiRequest, setRfiRequest] = useState([]);
//   // const[notifications,setNotifications] = useState([]);

//   const fetchData = async()=>{
//     const res = await axios.get(`http://192.168.1.84:8080/api/institutions/get-all-institutions`,{
//       headers:{
//         Authorization:`Bearer ${localStorage.getItem('token')}`,
//         'Content-Type':'application/json',
//       }
//     });
//     console.log(res)
//     setRfiRequest(res.data);
    
//   }
//   useEffect(()=>{
//     fetchData();
//   },[])
//   const [selectedRequest, setSelectedRequest] = useState(null);

  

//     const handleReview = (request) => {
//       console.log('req',request)
//         setSelectedRequest(request);
//         console.log("data in selectedRequests--->",selectedRequest)
//     };

//     const handleCloseReview = () => {
//         setSelectedRequest(null);
//     };
  
//   const handleAccept = async(institutionId)=>{
//     console.log("Accept clicked",institutionId)
//     const approvedByUserId = localStorage.getItem('id');
//     // send notification that you have accept the request
//     const accept = await axios.post(`http://192.168.1.84:8080/api/institutions/approve/${institutionId}/${approvedByUserId}`,{},{
//       headers:{
//         Authorization:`Bearer ${localStorage.getItem('token')}`,
//         'Content-Type':'application/json',
//       }
//     });
//     console.log('after accepting req--->',accept)
//     setRfiRequest(rfiRequest.filter(e=>e.institutionId !== institutionId ))
//     console.log("data remaining",rfiRequest);
//   }
//   const handleReject = async(institutionId)=>{
//     // console.log("Reject clicked")
//     const approvedByUserId = localStorage.getItem('id');
//     // send it back for correction
//     const reject = await axios.post(`http://192.168.1.84:8080/api/institutions/reject/${institutionId}/${approvedByUserId}`,{},{
//       headers:{
//         Authorization:`Bearer ${localStorage.getItem('token')}`,
//         'Content-Type':'application/json',
//       }
//     });
//     console.log('after rejecting req--->',reject)
//     setRfiRequest(rfiRequest.filter(e=>e.institutionId !== institutionId ))
//     console.log("data remaining",rfiRequest)
//   }

//   return (
//     <>
//       <div className="pt-2 pb-2">
//         <p className="text-center text-2xl font-bold">Reporting Financial Institution (RFI)</p>
//       </div>
      
//       <div className="p-2">
//         <table className="border border-black ">
//           <tr className="border border-black ">
//             <th>Contact FirstName</th>
//             <th>Contact LastName</th>
//             <th>Name of Institution</th>
//             <th>telephone</th>
//             <th>GIIN</th>
//             <th>License Authority</th>
//             <th>Trade LicenseNumber</th>
//             <th>Status</th>
//             <th className="col-span-3 ">Action</th>
//           </tr>
        
//       {rfiRequest.map((req,index)=>(
//           <tr key={index} className="text-center ">

//               <td>{req.contactFirstName}</td>
//               <td>{req.contactLastName}</td>
//               <td>{req.name}</td>
//               <td>{req.telephone}</td>
//               <td>{req.giin}</td>
//               <td>{req.licenseAuthority}</td>
//               <td>{req.tradeLicenseNumber}</td>
//               <td>{req.status}</td>
            
//             <td><button type="button" className="bg-blue-400 p-1 rounded-md" onClick={()=>handleReview(req)}>Review</button></td> 
//             <td><button type="button" className="bg-green-400 p-1 rounded-md" onClick={()=>handleAccept(req.institutionId)}>Accept</button></td> 
//             <td><button type="button" className="bg-red-400 p-1 rounded-md" onClick={()=>handleReject(req.institutionId)}>Reject</button></td> 
//           </tr>
//         ))
        
//         }
//         </table>
//       </div>
//       <div>
//       {selectedRequest && (
//                 <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
//                     <div className="bg-white p-6 rounded-xl shadow-lg max-w-2xl w-full">
//                         <h3 className="text-2xl font-bold mb-4">Request Details</h3>
//                         <p><strong>First Name:</strong> {selectedRequest.contactFirstName}</p>
//                         <p><strong>Last Name:</strong> {selectedRequest.contactLastName}</p>
//                         <p><strong>Telephone:</strong> {selectedRequest.telephone}</p>
//                         <p><strong>Business Address:</strong> {selectedRequest.businessAddress}</p>
//                         <p><strong>Country of Incorporation:</strong> {selectedRequest.countryOfIncorporation}</p>
//                         <p><strong>License Authority:</strong> {selectedRequest.licenseAuthority}</p>
//                         <p><strong>Trade License Number:</strong> {selectedRequest.tradeLicenseNumber}</p>
//                         <p><strong>Date of Incorporation:</strong> {selectedRequest.dateOfIncorporation}</p>

//                         <div className="mt-6 flex gap-4">
//                             <button onClick={() =>{ handleCloseReview(); handleAccept(selectedRequest.institutionId)}} className="bg-green-500 rounded-md p-1">Approve</button>
//                             <button onClick={() =>  {handleCloseReview(); handleReject(selectedRequest.institutionId)}} className="bg-red-500 rounded-md p-1">Reject</button>
//                             <button onClick={handleCloseReview} className="bg-gray-500 rounded-md p-1">Close</button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//       </div>
      
//     </>
//   )
// }















import axios from "axios";
import { useEffect, useState } from "react";

export default function RfiRegistrationRequests() {
    const [rfiRequest, setRfiRequest] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);

    const fetchData = async () => {
        const res = await axios.get(`http://192.168.1.84:8080/api/institutions/get-all-institutions`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            }
        });
        setRfiRequest(res.data);
        console.log(res.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleReview = (request) => {
        setSelectedRequest(request);
    };

    const handleCloseReview = () => {
        setSelectedRequest(null);
    };

    const handleAccept = async (institutionId) => {
        const approvedByUserId = localStorage.getItem('id');
        await axios.post(`http://192.168.1.84:8080/api/institutions/approve/${institutionId}/${approvedByUserId}`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            }
        });
        setRfiRequest(rfiRequest.filter(e => e.institutionId !== institutionId));
    };

    const handleReject = async (institutionId) => {
        const approvedByUserId = localStorage.getItem('id');
        await axios.post(`http://192.168.1.84:8080/api/institutions/reject/${institutionId}/${approvedByUserId}`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            }
        });
        setRfiRequest(rfiRequest.filter(e => e.institutionId !== institutionId));
    };

    return (
        <div className="p-4">
            <h1 className="text-center text-3xl font-bold mb-6 p-2 bg-slate-400 rounded-lg">Reporting Financial Institution (RFI) Requests</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                { rfiRequest.length >0 ? (
                    rfiRequest.map((req, index) => (
                        <div key={index} className="bg-white shadow-lg rounded-2xl p-4 border">
                            <h2 className="text-xl font-semibold mb-2">{req.name}</h2>
                            <p className="text-gray-600"><strong>Contact:</strong> {req.contactFirstName} {req.contactLastName}</p>
                            <p className="text-gray-600"><strong>Telephone:</strong> {req.telephone}</p>
                            <p className="text-gray-600"><strong>License Authority:</strong> {req.licenseAuthority}</p>
                            <p className="text-gray-600"><strong>Status:</strong> {req.status}</p>
                            <div className="flex justify-between mt-4">
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => handleReview(req)}>Review</button>
                                <button className="bg-green-500 text-white px-4 py-2 rounded-md" onClick={() => handleAccept(req.institutionId)}>Accept</button>
                                <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => handleReject(req.institutionId)}>Reject</button>
                            </div>
                        </div>
                    
                    ))):(
                        <p className="text-center">No Available RFI Requests ...</p>
                    )
                }
            </div>

            {selectedRequest && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-xl shadow-lg max-w-2xl w-full">
                        <h3 className="text-2xl font-bold mb-4">Request Details</h3>
                        <div className="space-y-2">
                            <p><strong>First Name:</strong> {selectedRequest.contactFirstName}</p>
                            <p><strong>Last Name:</strong> {selectedRequest.contactLastName}</p>
                            <p><strong>Telephone:</strong> {selectedRequest.telephone}</p>
                            <p><strong>Business Address:</strong> {selectedRequest.businessAddress}</p>
                            <p><strong>Country of Incorporation:</strong> {selectedRequest.countryOfIncorporation}</p>
                            <p><strong>License Authority:</strong> {selectedRequest.licenseAuthority}</p>
                            <p><strong>Trade License Number:</strong> {selectedRequest.tradeLicenseNumber}</p>
                            <p><strong>Date of Incorporation:</strong> {selectedRequest.dateOfIncorporation}</p>
                        </div>
                        <div className="mt-6 flex gap-4">
                            <button onClick={() => { handleCloseReview(); handleAccept(selectedRequest.institutionId); }} className="bg-green-500 text-white px-4 py-2 rounded-md">Approve</button>
                            <button onClick={() => { handleCloseReview(); handleReject(selectedRequest.institutionId); }} className="bg-red-500 text-white px-4 py-2 rounded-md">Reject</button>
                            <button onClick={handleCloseReview} className="bg-gray-500 text-white px-4 py-2 rounded-md">Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
