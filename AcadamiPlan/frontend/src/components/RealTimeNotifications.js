import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import emailjs from 'emailjs-com'; // Add this import
import './Dashboard.css';

const RealTimeNotifications = () => {
  const [activeTab, setActiveTab] = useState('Real Time Notifications');
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationType, setNotificationType] = useState('Schedule Change');
  const [email, setEmail] = useState('');
const [searchQuery, setSearchQuery] = useState('');
  const [emailError, setEmailError] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSendNotification = (e) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    // EmailJS implementation
    emailjs.send(
      'service_m83037r',  // Replace with your EmailJS service ID
      'template_6gp5wcr', // Replace with your EmailJS template ID
      {
        to_email: email,
        title: notificationTitle,
        type: notificationType,
        Description: description,
        message: `Notification Type: ${notificationType}\nTitle: ${notificationTitle}`
      },
      emailjs.init('7LqSR-1n9ia2u4Hau')     // Replace with your EmailJS user ID
    )
    .then((response) => {
      console.log('Email sent!', response.status, response.text);
      alert(`Notification sent successfully to ${email}`);
      setEmail('');
      setNotificationTitle('');
      setEmailError('');
    })
    .catch((err) => {
      console.error('Failed to send email:', err);
      alert('Failed to send notification. Please try again.');
    });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const validateDescription = (text) => {
    if (text.trim().length < 10) {
      setDescriptionError('Description must be at least 10 characters');
      return false;
    }
    setDescriptionError('');
    return true;
  };

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
                 {item === 'RealTimeNotifications' ? (
                         <Link to="/real-time-notifications" >
                           {item}
                         </Link>
                       ) : (
                         <Link to={`/${item.toLowerCase().replace(' ', '-')}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
        <header className="header">
          <h2 className="h2">Real Time Notifications</h2>
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

        {/* Notification Sections */}
        <div className="notification-content">
          {/* Scan Notifications */}
          <section className="notification-section">
      <h3 >Send Notifications</h3>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={notificationTitle}
          onChange={(e) => setNotificationTitle(e.target.value)}
          placeholder="Enter notification title"
        />
      </div>
      <div className="form-group">
        <label>Type Selection</label>
        <select
          value={notificationType}
          onChange={(e) => setNotificationType(e.target.value)}
        >
          <option value="Schedule Change">Schedule Change</option>
          <option value="Room Change">Room Change</option>
          <option value="Emergency">Emergency</option>
          <option value="Other">Other</option>
        </select>
        <br></br>
        <br></br>
        <label>Message</label>
        <textarea
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            validateDescription(e.target.value);
          }}
          placeholder="Enter detailed description (minimum 10 characters)"
          className={descriptionError ? 'error' : ''}
          rows={5}
        />
        {descriptionError && (
          <span className="error-message">{descriptionError}</span>
        )}
      </div>
    
      <form onSubmit={handleSendNotification}>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError('');
                  }}
                  placeholder="Enter recipient email"
                  className={emailError ? 'error' : ''}
                />
                {emailError && <span className="error-message">{emailError}</span>}
              </div>
              <button type="submit" className="send-btn">
                Send Notification
              </button>
            </form>

    </section>
        </div>
      </div>
    </div>
  );
};

export default RealTimeNotifications;