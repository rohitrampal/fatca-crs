// import axios from "axios"
// import { useEffect, useState } from "react";

// export default function ReportRequests() {
//   const[reports,setReports] = useState([]);
//   const [selectedReport, setSelectedReport] = useState(null);
//   const fetchReports = async()=> {
//     const res = await axios.get(`http://192.168.1.84:8080/api/reports/get-all-pending-reports`,{
//       headers:{
//         Authorization:`Bearer ${localStorage.getItem('token')}`,
//         'Content-Type':'application/json',
//       }
//     });
//     console.log(res.data);
//     setReports(res.data)
//   }
//   useEffect(()=>{
//     fetchReports();
//   },[])

//   const handleReview = (report)=>{
//     setSelectedReport(report)
//     console.log("data in report--->",report);
//     console.log("data in selectedReport--->",selectedReport);

//   }
//   const downloadFile = (fileName, fileData) => {
//     if (!fileData) return;
  
//     try {
      
      
//       const blob = new Blob([fileData]);
  
//       // Create a download link
//       const url = URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.download = fileName || 'download.xml'; // Set the file name
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error('Failed to download file:', error);
//     }
//   };
//   const handleAccept = async(reportId)=>{
//     console.log("Accept clicked",reportId)
//     const approvedByUserId = localStorage.getItem('id');
//     // send notification that you have accept the request
//     const accept = await axios.post(`http://192.168.1.84:8080/api/reports/approve-report-ministry/${reportId}/${approvedByUserId}`,{},{
//       headers:{
//         Authorization:`Bearer ${localStorage.getItem('token')}`,
//         'Content-Type':'application/json',
//       }
//     });
//     console.log('after accepting req--->',accept)
//     setReports(reports.filter(e=>e.reportId !== reportId ))
//     console.log("data remaining",reports);
//   }
//   const handleReject = async(reportId)=>{
//     // console.log("Reject clicked")
//     const approvedByUserId = localStorage.getItem('id');
//     // send it back for correction
//     const reject = await axios.post(`http://192.168.1.84:8080/api/reports/reject-report-ministry/${reportId}/${approvedByUserId}`,{},{
//       headers:{
//         Authorization:`Bearer ${localStorage.getItem('token')}`,
//         'Content-Type':'application/json',
//       }
//     });
//     console.log('after rejecting req--->',reject)
//     setReports(reports.filter(e=>e.reportId !== reportId ))
//     console.log("data remaining",reports);
//   }
//   const handleCloseReview = ()=>{
//     setSelectedReport(null);
//   }
//   return (
//     <>
//     <div>
      
//       <h1 className="text-2xl font-bold text-center">Reports Request</h1>
//       <div className="p-2">
//         <table className=" border-collapse border border-black">
//           <thead>
//             <tr className="p-2 border border-black ">
//               <th>Name of Institution</th>
//               <th>Giin</th>
//               <th>Report Type</th>
//               <th>Regulatory Authority</th>
//               <th>file Name</th>
//               <th className="col-span-3 ">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {reports.length > 0 ? (
//               reports.map((report,index)=>(
//                 <tr key={index} className="text-center">
//                   <td>{report.institution.name}</td>
//                   <td>{report.institution.giin}</td>
//                   <td>{report.reportType}</td>
//                   <td>{report.regulatoryAuthority}</td>
//                   <td>{report.fileName}</td>
//                   <td><button className="p-1 rounded-md bg-blue-400" onClick={()=>handleReview(report)}>Review</button></td>
//                   <td><button className="p-1 rounded-md bg-green-400" onClick={()=>handleAccept(report.reportId)}>Accept</button></td>
//                   <td><button className="p-1 rounded-md bg-orange-300" onClick={()=>downloadFile(report.fileName,report.fileData)}>Download</button></td>
//                   <td><button className="p-1 rounded-md bg-red-400" onClick={()=>handleReject(report.reportId)}>Reject</button></td>
//                 </tr>
//               ))
//             ):(
//               <p>No Available Reports...</p>
//             )
//             }
//           </tbody>
//         </table>
//       </div>
//     </div>
//     <div>
//     {selectedReport && (
//                 <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center ">
//                     <div className="bg-white p-6 rounded-xl shadow-lg max-w-2xl w-full h-[600px] overflow-auto">
//                         <h3 className="text-2xl font-bold mb-4">Request Details</h3>
//                         <p><strong>File Name:</strong> {selectedReport.fileName}</p>
//                         <p><strong>Report Type:</strong> {selectedReport.reportType}</p>
//                         <p ><strong>file Data:</strong> {selectedReport.fileData}</p>

//                         {/* <p><strong>Telephone:</strong> {selectedReport.telephone}</p>
//                         <p><strong>Business Address:</strong> {selectedReport.businessAddress}</p>
//                         <p><strong>Country of Incorporation:</strong> {selectedReport.countryOfIncorporation}</p>
//                         <p><strong>License Authority:</strong> {selectedReport.licenseAuthority}</p>
//                         <p><strong>Trade License Number:</strong> {selectedReport.tradeLicenseNumber}</p>
//                         <p><strong>Date of Incorporation:</strong> {selectedReport.dateOfIncorporation}</p> */}

//                         <div className="mt-6 flex gap-4">
//                             {/* <button onClick={() =>{ handleCloseReview(); handleAccept(selectedReport.reportId)}} className="bg-green-500 rounded-md p-1">Approve</button>
//                             <button onClick={() =>  {handleCloseReview(); handleReject(selectedReport.reportId)}} className="bg-red-500 rounded-md p-1">Reject</button> */}
//                             <button onClick={handleCloseReview} className="bg-gray-500 rounded-md p-1">Close</button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//     </div>
//     </>
//   )
// }
















import axios from "axios";
import { useEffect, useState } from "react";

export default function ReportRequests() {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  const fetchReports = async () => {
    try {
      const res = await axios.get(
        `http://192.168.1.84:8080/api/reports/get-all-pending-reports`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setReports(res.data);
    } catch (error) {
      console.error("Failed to fetch reports:", error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleReview = (report) => {
    setSelectedReport(report);
  };

  const downloadFile = (fileName, fileData) => {
    if (!fileData) return;
    try {
      const blob = new Blob([fileData]);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName || "download.xml";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download file:", error);
    }
  };

  const handleAccept = async (reportId) => {
    try {
      const approvedByUserId = localStorage.getItem("id");
      await axios.post(
        `http://192.168.1.84:8080/api/reports/approve-report-ministry/${reportId}/${approvedByUserId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setReports(reports.filter((e) => e.reportId !== reportId));
    } catch (error) {
      console.error("Failed to accept report:", error);
    }
  };

  const handleReject = async (reportId) => {
    try {
      const approvedByUserId = localStorage.getItem("id");
      await axios.post(
        `http://192.168.1.84:8080/api/reports/reject-report-ministry/${reportId}/${approvedByUserId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setReports(reports.filter((e) => e.reportId !== reportId));
    } catch (error) {
      console.error("Failed to reject report:", error);
    }
  };

  const handleCloseReview = () => {
    setSelectedReport(null);
  };

  return (
    <>
      <div className="p-4">
        <h1 className="text-3xl font-bold text-center p-2 bg-slate-400 rounded-lg">Reports Request</h1>
        <div className="grid gap-4 mt-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {reports.length > 0 ? (
            reports.map((report, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg shadow-lg bg-white flex flex-col gap-2"
              >
                <p>
                  <strong>Institution:</strong> {report.institution.name}
                </p>
                <p>
                  <strong>Giin:</strong> {report.institution.giin}
                </p>
                <p>
                  <strong>Report Type:</strong> {report.reportType}
                </p>
                <p>
                  <strong>Authority:</strong> {report.regulatoryAuthority}
                </p>
                <p>
                  <strong>File:</strong> {report.fileName}
                </p>
                <div className="flex justify-around mt-2">
                  <button
                    className="p-2 rounded-md bg-blue-500 text-white"
                    onClick={() => handleReview(report)}
                  >
                    Review
                  </button>
                  <button
                    className="p-2 rounded-md bg-green-500 text-white"
                    onClick={() => handleAccept(report.reportId)}
                  >
                    Accept
                  </button>
                  <button
                    className="p-2 rounded-md bg-orange-400 text-white"
                    onClick={() => downloadFile(report.fileName, report.fileData)}
                  >
                    Download
                  </button>
                  <button
                    className="p-2 rounded-md bg-red-500 text-white"
                    onClick={() => handleReject(report.reportId)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No Available Reports...</p>
          )}
        </div>
      </div>

      {selectedReport && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-2xl w-full h-[600px] overflow-auto">
            <h3 className="text-2xl font-bold mb-4">Request Details</h3>
            <p>
              <strong>File Name:</strong> {selectedReport.fileName}
            </p>
            <p>
              <strong>Report Type:</strong> {selectedReport.reportType}
            </p>
            <p>
              <strong>File Data:</strong> {selectedReport.fileData}
            </p>

            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={handleCloseReview}
                className="bg-gray-500 rounded-md p-2 text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
