import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaFilePdf, FaFileExcel, FaDownload } from 'react-icons/fa';
import './Dashboard.css';

const GenerateReport = () => {
  const [activeTab, setActiveTab] = useState('Generate Report');
  // State for all three report sections
  const [dates, setDates] = useState({
    conflict: { startDate: null, endDate: null },
    notification: { startDate: null, endDate: null },
    unresolved: { startDate: null, endDate: null }
  });
  
  const [downloadType, setDownloadType] = useState({
    conflict: 'PDF',
    notification: 'Excel',
    unresolved: 'Excel'
  });
  
  const [loading, setLoading] = useState({
    conflict: false,
    notification: false,
    unresolved: false
  });

  const handleDateChange = (type, field, date) => {
    setDates(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: date
      }
    }));
  };

  const handleDownloadTypeChange = (type, value) => {
    setDownloadType(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handleGenerateReport = (type) => {
    if (!dates[type].startDate || !dates[type].endDate) {
      alert('Please select both start and end dates');
      return;
    }
    
    setLoading(prev => ({...prev, [type]: true}));
    
    // Simulate report generation
    setTimeout(() => {
      setLoading(prev => ({...prev, [type]: false}));
      alert(`${type.replace(/([A-Z])/g, ' $1')} report generated successfully as ${downloadType[type]}!`);
    }, 1500);
  };

  // Report section component to avoid repetition
  const ReportSection = ({ type, title }) => (
    <section className="report-section">
      <div className="report-header">
        <h3>{title}</h3>
        <div className="company-branding">
          <span>ACADEMIPLAN</span>
          <img 
            src={require('../assets/logo-acadamiPlan.png')} 
            alt="Company Logo" 
            className="report-logo"
          />
        </div>
      </div>
      
      <div className="report-controls">
        <div className="form-group">
          <label>Select Date Range</label>
          <div className="date-range-picker">
            <DatePicker
              selected={dates[type].startDate}
              onChange={(date) => handleDateChange(type, 'startDate', date)}
              placeholderText="Start Date"
              selectsStart
              startDate={dates[type].startDate}
              endDate={dates[type].endDate}
            />
            <DatePicker
              selected={dates[type].endDate}
              onChange={(date) => handleDateChange(type, 'endDate', date)}
              placeholderText="End Date"
              selectsEnd
              startDate={dates[type].startDate}
              endDate={dates[type].endDate}
              minDate={dates[type].startDate}
            />
          </div>
        </div>
        
        <div className="form-group">
          <label>Select Download Type</label>
          <select
            value={downloadType[type]}
            onChange={(e) => handleDownloadTypeChange(type, e.target.value)}
          >
            <option value="PDF">PDF</option>
            <option value="Excel">Excel</option>
          </select>
          {downloadType[type] === 'PDF' ? (
            <FaFilePdf className="file-icon" />
          ) : (
            <FaFileExcel className="file-icon" />
          )}
        </div>
        
        <button 
          className="generate-btn"
          onClick={() => handleGenerateReport(type)}
          disabled={loading[type]}
        >
          {loading[type] ? (
            'Generating...'
          ) : (
            <>
              <FaDownload /> Generate Report
            </>
          )}
        </button>
      </div>
    </section>
  );

  return (
    <div className="dashboard-container">
      {/* Left Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <img 
            src={require('../assets/logo-acadamiPlan.png')} 
            alt="AcademiPlan Logo" 
            className="logo-image"
          />
        </div>
        <nav>
          <ul>
            {['Dashboard', 'Conflict Resolution', 'Real Time Notifications', 'Generate Report'].map((item) => (
              <li 
                key={item} 
                className={activeTab === item ? 'active' : ''}
                onClick={() => setActiveTab(item)}
              >
                <Link to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}>
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header className="header">
          <h2 className="h2">Generate Report</h2>
          <div className="user-info">
            <button className="signout-btn" onClick={() => console.log('Signed out')}>
              Signout
            </button>
            <div className="profile-pic">JD</div>
            <div className="user-details">
              <span className="greeting">Hello John</span>
              <span className="user-role">Administrator</span>
            </div>
          </div>
        </header>

        {/* Report Sections */}
        <div className="report-container">
          <ReportSection 
            type="conflict" 
            title="Generate Conflict Summary" 
          />
          
          <ReportSection 
            type="notification" 
            title="Notification History" 
          />
          
          <ReportSection 
            type="unresolved" 
            title="Unresolved Conflict Report" 
          />
        </div>
      </div>
    </div>
  );
};

export default GenerateReport;