import axios from "axios"
import { useEffect, useState } from "react";

export default function RegisteredRfi() {
    const[data, setData] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const fetchRegisteredRfi = async()=>{
        const response = await axios.get(`http://192.168.1.84:8080/api/institutions/get-all-institutions-approved`,{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          });
        console.log(response.data);
        setData(response.data);
    }
    useEffect(()=>{
        fetchRegisteredRfi();
    },[])
    const handleReview = (request) => {
        setSelectedRequest(request);
    };

    const handleCloseReview = () => {
        setSelectedRequest(null);
    };
  return (
    <>
    <div className="p-4">
        <h1 className="p-2 rounded-md text-center text-2xl font-bold bg-slate-400 mb-6">Registered RFI</h1>
        <div className="grid grid-cols-1 gap-6  md:grid-cols-2 lg:grid-cols-3">
            {data.length>0?(
                data.map((item, index)=>(
                    <div key={index} className="bg-white shadow-lg rounded-2xl p-4 border">
                        <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                        <p className="text-gray-600"><strong>Contact:</strong> {item.contactFirstName} {item.contactLastName}</p>
                        <p className="text-gray-600"><strong>Telephone:</strong> {item.telephone}</p>
                        <p className="text-gray-600"><strong>License Authority:</strong> {item.licenseAuthority}</p>
                        <p className="text-gray-600"><strong>GIIN:</strong> {item.giin}</p>
                        <div className="flex justify-between mt-4">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => handleReview(item)}>Review</button>
                        </div>
                    </div>
                ))
            )
            :( <p className="text-center">No More Data...</p> )
            }
        </div>
        {selectedRequest && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-xl shadow-lg max-w-2xl w-full">
                        <h3 className="text-2xl font-bold mb-4">RFI Details</h3>
                        <div className="space-y-2">
                            <p><strong>First Name:</strong> {selectedRequest.contactFirstName}</p>
                            <p><strong>Last Name:</strong> {selectedRequest.contactLastName}</p>
                            <p><strong>Telephone:</strong> {selectedRequest.telephone}</p>
                            <p><strong>Business Address:</strong> {selectedRequest.businessAddress}</p>
                            <p><strong>Country of Incorporation:</strong> {selectedRequest.countryOfIncorporation}</p>
                            <p><strong>License Authority:</strong> {selectedRequest.licenseAuthority}</p>
                            <p><strong>Trade License Number:</strong> {selectedRequest.tradeLicenseNumber}</p>
                            <p><strong>Date of Incorporation:</strong> {selectedRequest.dateOfIncorporation}</p>
                            <p><strong>GIIN:</strong> {selectedRequest.giin}</p>
                        </div>
                        <div className="mt-6 flex gap-4">
                            <button onClick={handleCloseReview} className="bg-gray-500 text-white px-4 py-2 rounded-md">Close</button>
                        </div>
                    </div>
                </div>
            )}
    </div>
    </>
  )
}
