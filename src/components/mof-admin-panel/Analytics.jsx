import React, { useEffect, useState } from 'react'
import registerCharts from './charts/registerCharts'
import DoughnutChart from './charts/DoughnutChart';
import axios from 'axios';
registerCharts();

export default function Analytics() {
  // for rfi reports 
  const [rfiReportYearFilter, setRfiReportYearFilter] = useState('2025');
  const [rfiReportYearData, setRfiReportYearData] = useState([]);
  const [rfiReportLabelsData,setRfiReportLabelsData] = useState([]);

  // for rfi registrations
  const [rfiYearFilter, setRfiYearFilter] = useState('2025');
  const [rfiYearData, setRfiYearData] = useState([]);
  const [rfiLabelsData,setRfiLabelsData] = useState([]);


  // logic for RFI Reports 
  const rfiReportsLabels = rfiReportLabelsData;
  const rfiReportsDataValues = rfiReportYearData;
  const backgroundColor = [
    "rgb(255,0,0)",
    "rgb(255,128,0)",
    "rgb(255,255,0)",
    "rgb(75, 192, 192)",
    "rgb(153, 102, 255)",
    "rgb(255, 210, 128)",
    "rgb(77,53,47)",
    "rgb(0,255,255)",
    "rgb(255,0,128)",
    "rgb(255,0,255)",
    "rgb(0,128,255)",
    "rgb(0,255,0)",
  ]
  const rfiReportsTitleText = 'Rfi Reports';
  const fetchRfiReportData = async()=>{
    const response = await axios.post(`http://192.168.1.84:8080/api/analytics/rfi-reports-data?year=${rfiReportYearFilter}`,{},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
    console.log('data for rfi reports--->',response.data);
    setRfiReportLabelsData(Object.keys(response.data));
    setRfiReportYearData(Object.values(response.data));
  }
  useEffect(()=>{
    fetchRfiReportData();
  },[rfiReportYearFilter])
  
  const handleRfiReportYearChange = async(e)=>{
    const value = e.target.value;
    setRfiReportYearFilter(value);
    // const filterData = data.filter((item)=>item.year === value );
    // setFilteredData(filterData);
  }



  // logic for RFI Registrations
  const rfiLabels = rfiLabelsData;
  const rfiDataValues = rfiYearData;
  
  const rfititleText = 'Rfi Registrations';
  const fetchRfiData = async()=>{
    const response = await axios.post(`http://192.168.1.84:8080/api/analytics/rfi-registration-data?year=${rfiYearFilter}`,{},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
    console.log('data for rfi registration--->',response.data);
    setRfiLabelsData(Object.keys(response.data));
    setRfiYearData(Object.values(response.data));
  }
  useEffect(()=>{
    fetchRfiData();
  },[rfiYearFilter])
  
  const handleRfiYearChange = async(e)=>{
    const value = e.target.value;
    setRfiYearFilter(value);
    // const filterData = data.filter((item)=>item.year === value );
    // setFilteredData(filterData);
  }
  return (
    <>
    {/* rfi reports  chart */}
    <div className='container  '>
    <h1 className='text-center text-2xl font-semibold p-2 rounded-lg bg-slate-400'>RFI Report Analysis</h1>
      <p className='p-2'>
        <label>Year: </label>
        <select 
        value={rfiReportYearFilter} 
        onChange={handleRfiReportYearChange} 
        className="p-2 border rounded"
        >
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
        </select>
      </p>
      <div className='graph max-w-[40%] h-36 lg:h-full sm:max-w-[40%] sm:h-36 md:max-w-[60%]  lg:max-w-[70%] w-[100%] shadow-lg p-3 '>
        <DoughnutChart labels={rfiReportsLabels} dataValues={rfiReportsDataValues} backgroundColor={backgroundColor} titleText={rfiReportsTitleText}/>
      </div>
    </div>
    {/* rfi registration chart*/}
    <div className='mt-10  '>
      <h2 className='text-center text-2xl font-semibold p-2 rounded-lg bg-slate-400'>RFI Registration Analysis</h2>
      <p className='p-2'>
        <label>Year: </label>
        <select 
        value={rfiYearFilter} 
        onChange={handleRfiYearChange} 
        className="p-2 border rounded"
        >
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
        </select>
      </p>
      <div className='graph max-w-[40%] h-36 lg:h-full sm:max-w-[40%] md:max-w-[60%] lg:max-w-[70%] w-[100%] shadow-lg p-3 '>
        <DoughnutChart labels={rfiLabels} dataValues={rfiDataValues} backgroundColor={backgroundColor} titleText={rfititleText}/>
      </div>
    </div>
    </>
  )
}

