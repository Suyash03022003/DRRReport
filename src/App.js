import React, { useState, useEffect } from 'react';
import './App.css';

function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${year}-${month}-${date}`;
}

function App() {
  const [startDate, setStartDate] = useState(new Date(getDate()));
  const [endDate, setEndDate] = useState(new Date(getDate()));
  const [numberofdays, setNumberofdays] = useState(0);
  const [currentDate, setCurrentDate] = useState("");
  const [leadCount, setLeadCount] = useState(0);
  const [expectedDRR, setExpectedDRR] = useState(0);
  const [data, setData] = useState([]);

  const calculateNumberOfDays = () => {
    const startTime = startDate.getTime();
    const endTime = endDate.getTime();
    const Difference_In_Time = endTime - startTime;
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    Difference_In_Days = Math.abs(Difference_In_Days);
    return Difference_In_Days;
  };

  const updateData = () => {
    lastUpdatedDateandTime();
    calculateleadCount();
    const variable = {
      start: startDate.toISOString().slice(0, 10),
      end: endDate.toISOString().slice(0, 10),
      month: startDate.getMonth() + 1,
      numberofDays: numberofdays,
      leadCountValue: leadCount,
      expectedDRR: expectedDRR,
      lastUpdated: currentDate
    };
    setData([...data, variable]);
  };

  useEffect(() => {
    const newNumberofdays = calculateNumberOfDays();
    setNumberofdays(newNumberofdays);
    const lastUpdateddattime = lastUpdatedDateandTime();
    setCurrentDate(lastUpdateddattime);
    const DRR = Math.floor(leadCount / numberofdays);
    setExpectedDRR(DRR);
    console.log();
  }, [startDate, endDate, leadCount]);

  const startDateChange = (event) => {
    const { value } = event.target;
    setStartDate(new Date(value));
  };

  const endDateChange = (event) => {
    const { value } = event.target;
    setEndDate(new Date(value));
  };

  const textChange = (event) => {
    const { value } = event.target;
    setLeadCount(Number(value));
  };

  const calculateleadCount = () => {
    const DRR = leadCount / numberofdays;
    setExpectedDRR(DRR);
  }

  const addData = (event) => {
    event.preventDefault();
    updateData();
  };

  function formatDate(date) {
    const mm = date.getMonth() + 1;
    const dd = date.getDate();
    const yyyy = date.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  };

  function formatTime(date) {
    const mm = date.getMonth() + 1;
    const dd = date.getDate();
    const yyyy = date.getFullYear();
    const h = date.getHours();
    const m = date.getMinutes();
    const s = date.getSeconds();
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hh = h % 12 || 12; // Convert 0 to 12 if necessary
    return `${yyyy}-${mm}-${dd} ${hh}:${m}:${s} ${ampm}`;
  }

  function lastUpdatedDateandTime() {
    const date = new Date();
    const formattime = formatTime(date);
    return formattime;
  }

  function cancelDiv () {
    var div = document.getElementById('addInfo');
    div.remove();
  }

  return (
    <div>
      <button className='addnew'>Add New</button>
      <table id='table'>
        <thead>
          <tr>
            <td>Action</td>
            <td>Id</td>
            <td>Start Date</td>
            <td>End Date</td>
            <td>Month</td>
            <td>Number of Days</td>
            <td>Lead Count</td>
            <td>Excluded DRR</td>
            <td>Last Updated</td>
          </tr>
        </thead>
        <tbody>
          <tr id='addInfo'>
            <td>N/A</td>
            <td>N/A</td>
            <td>
              <input
                type="date"
                onChange={startDateChange}
                min={getDate()}
              />
            </td>
            <td>
              <input
                type="date"
                onChange={endDateChange}
                min={startDate.toISOString().slice(0, 10)}
              />
            </td>
            <td>{startDate.getMonth() + 1}</td>
            <td>{numberofdays}</td>
            <td>
              <input
                type="number"
                onChange={textChange}
              />
            </td>
            <td></td>
            <td>
              <button type="submit" onClick={addData}>Save</button>
              <button onClick={cancelDiv}>Cancel</button>
            </td>
          </tr>
          {data.map((row, index) => (
            <tr key={index}>
              <td></td>
              <td>{index + 1}</td>
              <td>{formatDate(new Date(row.start))}</td>
              <td>{formatDate(new Date(row.end))}</td>
              <td>{row.month}</td>
              <td>{row.numberofDays}</td>
              <td>{row.leadCountValue}</td>
              <td>{row.expectedDRR}</td>
              <td>{row.lastUpdated}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
