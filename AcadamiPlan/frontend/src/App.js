import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ConflictResolution from './components/ConflictResolution';
import RealTimeNotifications from './components/RealTimeNotifications';
import emailjs from 'emailjs-com';
emailjs.init('7LqSR-1n9ia2u4Hau');  // Initialize with your user ID

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/conflict-resolution" element={<ConflictResolution />} />
        <Route path="/real-time-notifications" element={<RealTimeNotifications />} />
        {/* Optional: Add a 404 page for unmatched routes */}
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;