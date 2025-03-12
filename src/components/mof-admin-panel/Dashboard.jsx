import axios from "axios";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState("all");
  const [status,setStatus] = useState('all');
  const [institution,setInstitution] = useState('all');
  const [institutionData,setInstitutionData] = useState([]);


  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://192.168.1.84:8080/api/reports/get-all-rfi-reports`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Data from backend --->", response.data);
      setData(response.data);
      setFilteredData(response.data);
      setInstitutionData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    // Fetch data from the backend API
    fetchData();
  }, []);

  const applyFilters = (filterData,filterType,statusType)=>{
    return filterData.filter((item)=>{
      const typeMatch = filterType ==='all' || item.reportType === filterType;
      const statusMatch = statusType ==='all' || item.status === statusType;
      return typeMatch && statusMatch;
    })
  }

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);
    const filteredData = applyFilters(data, value, status);
    setFilteredData(filteredData);
    // if (value === "all") {
    //   // const filtered = data.filter((item) =>  (item.status === 'REJECTEDBYMINISTRY' || item.status ==='PENDING' || item.status === 'APPROVEDBYMINISTRY' ) );
    //   // setFilteredData(filtered);
    //   setFilteredData(data);
    // } else {
    //   const filtered = data.filter((item) => (item.reportType === value  ));
    //   setFilteredData(filtered);
    // }
  };
  const handleStatusChange = (e)=>{
    const value = e.target.value;
    setStatus(value);
    const filteredData = applyFilters(data, filter, value);
    setFilteredData(filteredData);
  }
  const handleInstitution =(e)=>{
    const value = e.target.value;
    setInstitution(value);
    const filteredData = data.filter((item)=>(item.regulatoryAuthority === value && item.status ==='APPROVEDBYMINISTRY' ));
    setInstitutionData(filteredData);
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4 text-center font-semibold bg-slate-400 rounded-lg p-2">All Reports </h1>
      <div className="mb-4 flex gap-x-4">
        <div>
          <label className="mr-2">Filter by:</label>
          <select
            value={filter}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          >
            <option value="all">All</option>
            <option value="FATCA">FATCA</option>
            <option value="CRS">CRS</option>
          </select>
        </div>
        <div>
          <label className="mr-2">Status: </label>
          <select
            value={status}
            onChange={handleStatusChange}
            className="p-2 border rounded"
          >
            <option value="all">All</option>
            <option value="APPROVEDBYRFI">Pending</option>
            <option value="APPROVEDBYMINISTRY">Approved</option>
            <option value="REJECTEDBYMINISTRY">Reject</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-1 ">
        {filteredData.length>0 ? (
          filteredData.map((report) => (
            <div key={report.reportId} className="p-4 border rounded-lg shadow-md shadow-slate-500 ">
              <p className="text-lg"><strong>RFI Institution Name:</strong> {report.institution.name}</p>
              <p><strong>Regulatory Authority:</strong> {report.regulatoryAuthority}</p>
              <p><strong>Report Id:</strong> {report.reportId}</p>
              <p><strong>Institution Classification:</strong> {report.institutionClassification}</p>
              {report.status ==="APPROVEDBYRFI" ? (<p><strong>Status:</strong> PENDING</p>):(<p><strong>Status:</strong> {report.status}</p>)}
              <p><strong>Creation Date:</strong>{' '}{report.registerDates.slice(0,10)}</p>
              <span className="text-sm text-gray-500"><strong>Report Type:</strong> {report.reportType}</span>
            </div>
          ))):(
            <p>No more Requests are Available...</p>
            )
        }
      </div>
      <div>
        <h2 className="text-2xl text-center font-semibold mb-4 mt-4 bg-slate-400 rounded-lg p-2">Reports Sent </h2>
        <div className="mb-4">
          <label className="mr-2">Global Regulator:</label>
          <select 
          value={institution}
          onChange={handleInstitution}
          className="p-2 border rounded"
          >
            <option value="IRS">IRS</option>
            <option value="OECD">OECD</option>
          </select>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-1">
          {institutionData.length>0 ? (
            institutionData.map((report) => (
              <div key={report.reportId} className="p-4 border rounded-lg shadow-md shadow-slate-500">
                <p className="text-lg"><strong>RFI Institution Name:</strong> {report.institution.name}</p>
                <p><strong>Regulatory Authority:</strong> {report.regulatoryAuthority}</p>
                <p><strong>Report Id:</strong> {report.reportId}</p>
                <p><strong>Institution Classification:</strong> {report.institutionClassification}</p>
                <p><strong>Status:</strong> {report.status}</p>
                <p><strong>Creation Date:</strong>{' '}{report.registerDates.slice(0,10)}</p>
                <span className="text-sm text-gray-500"><strong>Report Type: </strong>{report.reportType}</span>
              </div>
            ))):(
              <p>No Requests are Sent...</p>
              )
          }
        </div>
      </div>
    </div>
  );
}

