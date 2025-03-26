import React, { useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import './Dashboard.css';
import { Link } from 'react-router-dom'; // Add this import


ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSignOut = () => {
    // Add your signout logic here
    console.log('User signed out');
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Chart Data
  const pieData = {
    labels: ['Pending', 'Resolved'],
    datasets: [
      {
        data: [30, 70],
        backgroundColor: ['#f93a2b', '#2ee112'],
      },
    ],
  };

  const barData = {
    labels: ['IT', 'SE', 'DS', 'IM', 'CS'],
    datasets: [
      {
        label: 'Conflicts',
        data: [12, 19, 3, 5, 2],
        backgroundColor: '#3498db',
      },
    ],
  };

  return (
    <div className="dashboard-container">
      {/* Left Sidebar */}
      <div className="sidebar">
        <div className="logo"><img 
           src={require('../assets/logo-acadamiPlan.png')} 
           alt="AcademiPlan Logo" 
           className="logo-image"
         /></div>
        <nav>
          <ul>
            {['Dashboard', 'Conflict Resolution', 'Real Time Notifications', 'Generate Report'].map((item) => (
              <li 
                key={item} 
                className={activeTab === item ? 'active' : ''}
                onClick={() => handleTabClick(item)}
              >
               {item === 'Dashboard' ? (
          <Link to="/dashboard" >
            {item}
          </Link>
        ) : item === 'Conflict Resolution' ? (
          <Link to="/conflict-resolution" >
            {item}
          </Link>
        ) : item === 'Real Time Notifications' ? (
          <Link to="/real-time-notifications" >
            {item}
          </Link>
        ) : (
          <Link to="/generate-report" >
            {item}
          </Link>
        )}
      </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Header */}
        <header className="header">
          <h2 className='h2'>Dashboard</h2>
          <div className="search-container">
        <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
           <input 
               type="text" 
               placeholder="Type here to search..." 
               value={searchQuery}
               onChange={handleSearchChange}
           />
         </div>
          <div className="user-info">
          <button className="signout-btn" onClick={handleSignOut}>
               Signout
           </button>
            <div className="profile-pic">JD</div>
            <div className="user-details">
              <span className="greeting">Hello John</span>
              <span className="user-role">Administrator</span>
            </div>
          </div>
        </header>

        {/* Content Sections */}
        <div className="content-sections">
          {/* Conflict Distribution Section */}
          <section className="conflict-distribution">
            <h2>Distribution of Conflicts</h2>
            <div className="charts-container">
              <div className="chart-card">
                <Pie data={pieData} />
                <div className="chart-title">By Conflicts</div>
              </div>
            </div>
          </section>

          <section className="Different-Courses">
            <h2>Different Courses or Categories</h2>
            <div className="charts-container">
            <div className="chart-card">
               <div className="chart-wrapper">
                  <Bar 
                    data={barData}
                    options={{
                       maintainAspectRatio: false,
                       responsive: true
                    }}
                 />
            </div>
          <div className="chart-title">Monthly Trends</div>
           </div>
            </div>
          </section>

          {/* Right Side Section */}
          <section className="right-section">
            <div className="news-card">
              <h3>News for You</h3>
              <div className="news-item">
                <div className="news-percent">12%</div>
                <div className="news-content">
                  <div className="news-time">2:58 PM</div>
                  <div className="news-date">3/25/2023</div>
                </div>
              </div>
            </div>

            <div className="stats-card">
              <div className="stat-item">
                <div className="stat-label">Resolved Conflicts</div>
                <div className="stat-value">84%</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Pending Actions</div>
                <div className="stat-value">16</div>
              </div>
            </div>

            <div className="weather-card">
              <div className="weather-header">
                <div className="temperature">32°C</div>
                <div className="weather-condition">Mostly Sunny</div>
              </div>
              <div className="weather-footer">
                <div className="location">New York</div>
                <div className="time-date">
                  <span>2:58 PM</span>
                  <span>3/25/2023</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;