import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const ConflictResolution = () => {
  const [activeTab, setActiveTab] = useState('Conflict Resolution');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConflict, setSelectedConflict] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [conflicts, setConflicts] = useState([
    {
      id: 101,
      courseName: 'Introduction to Programming',
      lectureHall: 'Hall G603',
      time: '10:00 AM - 11:00 AM',
      module: 'CS101',
      instructor: 'Prof. Smith',
      resolved: false
    },
    {
      id: 102,
      courseName: 'Database Management Systems',
      lectureHall: 'Hall G606',
      time: '11:00 AM - 12:00 PM',
      module: 'CS102',
      instructor: 'Prof. Johnson',
      resolved: true
    },
    {
      id: 103,
      courseName: 'Web Development',
      lectureHall: 'Hall B501',
      time: '02:00 PM - 04:00 PM',
      module: 'CS103',
      instructor: 'Prof. Williams',
      resolved: false
    },
    {
        id: 104,
        courseName: 'ITPM',
        lectureHall: 'Hall A1102',
        time: '15:00 AM - 17:30 PM',
        module: 'CS108',
        instructor: 'Prof. Nimal',
        resolved: false
      },
    {
      id: 105,
      courseName: 'Network Security',
      lectureHall: 'Hall A601',
      time: '08:30 AM - 10:30 AM',
      module: 'CS104',
      instructor: 'Prof. Brown',
      resolved: true
    }
  ]);

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleResolve = (conflictId) => {
    setConflicts(conflicts.map(conflict => 
      conflict.id === conflictId ? {...conflict, resolved: !conflict.resolved} : conflict
    ));
  };

  const handleDelete = (conflictId) => {
    setConflicts(conflicts.filter(conflict => conflict.id !== conflictId));
  };

  const handleEdit = (conflict) => {
    setEditingId(conflict.id);
    setEditData({...conflict});
  };

  const handleSave = () => {
    setConflicts(conflicts.map(conflict => 
      conflict.id === editingId ? {...editData} : conflict
    ));
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleViewDetails = (conflictId) => {
    const conflict = conflicts.find(c => c.id === conflictId);
    setSelectedConflict({
      ...conflict,
      conflictingCourses: [
        { id: 101, name: 'Introduction to Programming' },
        { id: 102, name: 'Data Structures' }
      ],
      involvedLecturers: [
        { id: 201, name: 'Dr. John Doe' },
        { id: 202, name: 'Dr. Jane Smith' }
      ],
      suggestedSolutions: [
        'Move "Introduction to Programming" to Hall B at 11:00 AM',
        'Reschedule "Data Structures" to 2:00 PM in Hall C'
      ]
    });
    setIsModalOpen(true);
  };

   // Add modal close handler
   const closeModal = () => {
    setIsModalOpen(false);
    setSelectedConflict(null);
  };

  // Add modal component
  const ConflictDetailsModal = () => (
    <div className="modal-overlay">
      <div className="conflict-modal">
        <div className="modal-header">
          <h3>Conflict Details - ID: {selectedConflict?.id}</h3>
          <button className="close-btn" onClick={closeModal}>×</button>
        </div>
        
        <div className="modal-content">
          <div className="detail-section">
            <h4>Basic Information</h4>
            <p><strong>Course Name:</strong> {selectedConflict?.courseName}</p>
            <p><strong>Lecture Hall:</strong> {selectedConflict?.lectureHall}</p>
            <p><strong>Time:</strong> {selectedConflict?.time}</p>
            <p><strong>Status:</strong> 
              <span className={`status-badge ${selectedConflict?.resolved ? 'resolved' : 'pending'}`}>
                {selectedConflict?.resolved ? 'Resolved' : 'Pending'}
              </span>
            </p>
          </div>

          <div className="detail-section">
            <h4>Conflicting Courses</h4>
            <ul>
              {selectedConflict?.conflictingCourses?.map(course => (
                <li key={course.id}>{course.name} (ID: {course.id})</li>
              ))}
            </ul>
          </div>

          <div className="detail-section">
            <h4>Involved Lecturers</h4>
            <ul>
              {selectedConflict?.involvedLecturers?.map(lecturer => (
                <li key={lecturer.id}>{lecturer.name} (ID: {lecturer.id})</li>
              ))}
            </ul>
          </div>

          <div className="detail-section">
            <h4>Suggested Solutions</h4>
            <ol>
              {selectedConflict?.suggestedSolutions?.map((solution, index) => (
                <li key={index}>{solution}</li>
              ))}
            </ol>
          </div>

          <div className="modal-actions">
            <button className="approve-btn">Yes</button>
            <button className="maybe-btn">Hails</button>
            <button className="reject-btn">No</button>
          </div>
        </div>
      </div>
    </div>
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
                 {item === 'Dashboard' ? (
          <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
            {item}
          </Link>
        ): item === 'Real Time Notifications' ? (
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
          <h2 className="h2">Conflict Resolution</h2>
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

        {/* Conflicts Table */}
        <div className="conflicts-table">
          <table>
            <thead>
              <tr>
                <th>Conflict ID</th>
                <th>Course Name</th>
                <th>Module</th>
                <th>Instructor</th>
                <th>Lecture Hall</th>
                <th>Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {conflicts.map((conflict) => (
                <tr key={conflict.id}>
                  <td>#{conflict.id}</td>
                  <td>
                    {editingId === conflict.id ? (
                      <input
                        type="text"
                        name="courseName"
                        value={editData.courseName}
                        onChange={handleEditChange}
                      />
                    ) : (
                      conflict.courseName
                    )}
                  </td>
                  <td>
                    {editingId === conflict.id ? (
                      <input
                        type="text"
                        name="module"
                        value={editData.module}
                        onChange={handleEditChange}
                      />
                    ) : (
                      conflict.module
                    )}
                  </td>
                  <td>
                    {editingId === conflict.id ? (
                      <input
                        type="text"
                        name="instructor"
                        value={editData.instructor}
                        onChange={handleEditChange}
                      />
                    ) : (
                      conflict.instructor
                    )}
                  </td>
                  <td>
                    {editingId === conflict.id ? (
                      <input
                        type="text"
                        name="lectureHall"
                        value={editData.lectureHall}
                        onChange={handleEditChange}
                      />
                    ) : (
                      conflict.lectureHall
                    )}
                  </td>
                  <td>
                    {editingId === conflict.id ? (
                      <input
                        type="text"
                        name="time"
                        value={editData.time}
                        onChange={handleEditChange}
                      />
                    ) : (
                      conflict.time
                    )}
                  </td>
                  <td>
                    <span className={`status-badge ${conflict.resolved ? 'resolved' : 'pending'}`}>
                      {conflict.resolved ? 'Resolved' : 'Pending'}
                    </span>
                  </td>
                  <td>
                    {editingId === conflict.id ? (
                      <>
                        <button className="save-btn" onClick={handleSave}>
                          💾 Save
                        </button>
                        <button className="cancel-btn" onClick={handleCancel}>
                          ❌ Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button 
                          className={`resolve-btn ${conflict.resolved ? 'resolved' : ''}`}
                          onClick={() => handleResolve(conflict.id)}
                        >
                          ✅ Resolve
                        </button>
                        <button 
                          className="edit-btn"
                          onClick={() => handleEdit(conflict)}
                        >
                          ✏️ Edit
                        </button>
                        <button 
                          className="delete-btn"
                          onClick={() => handleDelete(conflict.id)}
                        >
                          🗑️ Delete
                        </button>
                        <button 
                          className="details-btn"
                          onClick={() => handleViewDetails(conflict.id)}
                        >
                          🔍 Details
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Add modal render */}
      {isModalOpen && <ConflictDetailsModal />}
    </div>
  );
};

export default ConflictResolution;