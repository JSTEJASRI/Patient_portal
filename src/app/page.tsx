'use client';

import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Header from "./header"
import Patient from "./patient";
 
const HealthDashBoard = () => {   
  const [isLoading, setLoader] = useState(true)
  interface Patient {
    name: string;
    gender: string;
    age: number;
    profile_picture: string;
    diagnosis_history: Array<any>;
    diagnostic_list: Array<any>;
    lab_results: Array<any>;
  }

  interface BloodPressure {
    systolic: {
      value: number;
      levels: string;
    };
    diastolic: {
      value: number;
      levels: string;
    };
  }

  const [patients, setPatients] = useState<Patient[]>([])
  const [selectedPatient, setSelectedPatient] = useState(0);
  const [currBloodPress, setCurrBllodPress] = useState<any[]>([]);
  const [searchPatient, setSearchPatient] = useState("");

  const getData  = async ()=> {
    const url = "https://fedskillstest.coalitiontechnologies.workers.dev/";
    try {
      const BeareToke = "Basic Y29hbGl0aW9uOnNraWxscy10ZXN0"
      const response = await fetch(url, {headers:{authorization: BeareToke}});
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();

      setPatients(json)
      setLoader(false)
      
    } catch (error) {
      console.error(error);
    }
  }
 
  useEffect(()=>{
    getData()
  },[])

  const bloodPressureData = [
    { month: "Oct 2023", systolic: 130, diastolic: 85 },
    { month: "Nov 2023", systolic: 142, diastolic: 88 },
    { month: "Dec 2023", systolic: 125, diastolic: 82 },
    { month: "Jan 2024", systolic: 138, diastolic: 85 },
    { month: "Feb 2024", systolic: 150, diastolic: 90 },
    { month: "Mar 2024", systolic: 160, diastolic: 78 },
  ];


  const getBloodPressureData = (patient:Patient)=>{
    return patient.diagnosis_history.map(data=>{
      return {
        month : `${data.month} ${data.year}`,
        systolic: data.blood_pressure.systolic.value,
        diastolic: data.blood_pressure.diastolic.value,
        sys_level: data.blood_pressure.systolic.levels,
        dis_level: data.blood_pressure.diastolic.levels,
        heart_rate: data.heart_rate,
        temperature: data.temperature,
        respiratory_rate: data.respiratory_rate
      }
  })
  }
 
  const diagnosticsList = [
    {
      id: 1,
      problem: "Hypertension",
      description: "Chronic high blood pressure",
      status: "Under Observation",
    },
    {
      id: 2,
      problem: "Type 2 Diabetes",
      description: "Insulin resistance and elevated blood sugar",
      status: "Cured",
    },
    {
      id: 3,
      problem: "Asthma",
      description: "Recurrent episodes of bronchial constriction",
      status: "Inactive",
    },
  ];
 
  const patientVitals = {
    respirationRate: { value: 20, unit: "bpm", status: "Normal" },
    temperature: { value: 98.6, unit: "°F", status: "Normal" },
    heartRate: { value: 78, unit: "bpm", status: "Lower than Average" },
  };

  const getPatients = ()=>{
    if(searchPatient === "" || !searchPatient){
      return patients;
    }
    
    return patients.filter(p=>p?.name.toLowerCase()?.indexOf(searchPatient.toLowerCase()) !== -1)
  }
 
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header/>
 
      {!isLoading && <div className="flex flex-1 overflow-hidden">
        <div className="w-64 bg-white shadow-sm overflow-y-auto">
        
 <Patient setSearchPatient={setSearchPatient}/>
          <div className="mt-2">
            { getPatients().map((patient, index) => (
              <div
                key={index}
                className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer ${
                  index === selectedPatient ? "bg-blue-50" : ""
                }`}
                onClick={() => setSelectedPatient(index)}
              >
                <img
                  src={patient.profile_picture}
                  alt={patient.name}
                  className="w-9 h-9 rounded-full"
                />
                <div className="ml-3">
                  <p className="text-sm font-medium">{patient.name}</p>
                  <p className="text-xs text-gray-500">{`${patient.gender}, ${patient.age}`}</p>
                </div>
                <button className="ml-auto text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
     
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 grid grid-cols-3 gap-6">
            <div className="col-span-2 bg-white rounded-md shadow p-5">
              <h2 className="text-lg font-medium text-gray-700">
                Diagnosis History
              </h2>
 
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-md font-medium">Blood Pressure</h3>
                  <div className="flex items-center text-sm">
                    <span>Last 6 months</span>
                    <svg
                      className="h-4 w-4 ml-1 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
 
                <div className="h-64 flex">
                 <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={getBloodPressureData(patients[selectedPatient])}
                      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                      onClick={(data)=>{
      
                        setCurrBllodPress(data.activePayload || [])
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="systolic"
                        stroke="#B794F4"
                        activeDot={{ r: 8 }}
                        strokeWidth={2}
                        name="Systolic"
                      />
                      <Line
                        type="monotone"
                        dataKey="diastolic"
                        stroke="#4299E1"
                        strokeWidth={2}
                        name="Diastolic"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                  <div className="basis-64">
                  {currBloodPress?.[0] && <div className="mt-2">
                  <div className="flex  items-center">
                    <div className="w-3 h-3 rounded-full bg-purple-400 mr-2"></div>
                    <span className="text-sm">Systolic</span>
                  </div>
                  <div className="text-md font-bold">{currBloodPress?.[0]?.payload?.systolic || 'N/A'}</div>
                  <div className="text-xs text-green-500 flex items-center">
                    <svg
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                    {currBloodPress?.[0]?.payload?.sys_level}
                  </div>
                </div>}
 
               {currBloodPress?.[0] &&  <div className="mt-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
                    <span className="text-sm">Diastolic</span>
                  </div>
                  <div className="text-md font-bold"> {currBloodPress?.[0]?.payload?.diastolic}</div>
                  <div className="text-xs text-red-500 flex items-center">
                    <svg
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6"
                      />
                    </svg>
                    {currBloodPress?.[0]?.payload?.dis_level}
                  </div>
                </div>}
                  </div>
                </div>
 
                
              </div>
 
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="p-2 bg-white rounded-md" style={{borderRadius: "50%"}}>
                    <img src="respiratory.png" alt="Your SVG Image" width="96" height="96" />
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      Respiration Rate
                    </span>
                  </div>
                  <div className="text-2xl font-bold">
                    {currBloodPress?.[0]?.payload?.respiratory_rate?.value}{" "}
                    <span className="text-sm font-normal">bpm</span>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    {currBloodPress?.[0]?.payload?.respiratory_rate?.levels}
                  </div>
                </div>
 
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="p-2 bg-white rounded-md"  style={{borderRadius: "50%"}}>
                    <img src="temperature.png" alt="Your SVG Image" width="96" height="96" />
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      Temperature
                    </span>
                  </div>
                  <div className="text-2xl font-bold">
                  {currBloodPress?.[0]?.payload?.temperature?.value}{" "}
                    <span className="text-sm font-normal">°F</span>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                  {currBloodPress?.[0]?.payload?.temperature?.levels}{" "}
                  </div>
                </div>
 
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="p-2 bg-white rounded-md"  style={{borderRadius: "50%"}}>
                    <img src="HeartBPM.png" alt="Your SVG Image" width="96" height="96" />
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      Heart Rate
                    </span>
                  </div>
                  <div className="text-2xl font-bold">
                  {currBloodPress?.[0]?.payload?.heart_rate?.value}{" "}
                    <span className="text-sm font-normal">bpm</span>
                  </div>
                  <div className="text-xs text-red-500 flex items-center mt-1">
                    <svg
                      className="h-3 w-3 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6"
                      />
                    </svg>
                    {currBloodPress?.[0]?.payload?.heart_rate?.levels}{" "}
                  </div>
                </div>
              </div>
 
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-700">
                  Diagnostic List
                </h3>
                <div className="mt-4 border rounded-md overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Problem/Diagnosis
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {patients[selectedPatient]?.diagnostic_list?.map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {item.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.description}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                item.status === "Under Observation"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : item.status === "Cured"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
 
            <div className="bg-white rounded-md shadow">
              <div className="flex flex-col items-center p-6 border-b">
                <img
                  src={patients[selectedPatient].profile_picture}
                  alt={patients[selectedPatient].name}
                  className="w-32 h-32 rounded-full object-cover"
                />
                <h2 className="mt-4 text-xl font-medium">
                  {patients[selectedPatient].name}
                </h2>
                <p className="text-sm text-gray-500">Dental Patient</p>
                <p className="text-xs text-gray-400">August 23, 1986</p>
 
                <div className="w-full mt-6 space-y-4">
                  <div className="flex items-center text-sm">
                    <svg
                      className="h-4 w-4 text-gray-500 mr-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                    <span className="text-gray-600">Gender</span>
                    <span className="ml-auto">{patients[selectedPatient].gender}</span>
                  </div>
 
                  <div className="flex items-center text-sm">
                    <svg
                      className="h-4 w-4 text-gray-500 mr-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span className="text-gray-600">Contact Info</span>
                    <span className="ml-auto">(435) 555-0123</span>
                  </div>
 
                  <div className="flex items-center text-sm">
                    <svg
                      className="h-4 w-4 text-gray-500 mr-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-gray-600">Emergency Contacts</span>
                    <span className="ml-auto">(435) 555-0129</span>
                  </div>
 
                  <div className="flex items-center text-sm">
                    <svg
                      className="h-4 w-4 text-gray-500 mr-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    <span className="text-gray-600">Insurance Provider</span>
                    <span className="ml-auto">Sunrise Health Insurance</span>
                  </div>
                </div>
 
                <button className="mt-6 w-full bg-teal-500 text-white py-2 rounded-md font-medium">
                  Show All Information
                </button>
              </div>
 
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-700">
                  Lab Results
                </h3>
                <div className="mt-4 space-y-3 overflow-scroll ">
                  {patients[selectedPatient]?.lab_results?.map((data, index)=>{
                    return <div key = {index} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                    <span className="text-sm">{data}</span>
                    <button>
                      <svg
                        className="h-5 w-5 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                    </button>
                  </div>
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>}
    </div>
  );

}

export default HealthDashBoard;
