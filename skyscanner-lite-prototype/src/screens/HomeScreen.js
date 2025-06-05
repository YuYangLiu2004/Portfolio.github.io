// src/screens/HomeScreen.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import './HomeScreen.css';

function HomeScreen({ onSearch }) {
  const [fromLocation, setFromLocation] = useState('London (LHR)');
  const [toLocation, setToLocation] = useState('Tokyo (NRT)');
  const [departDate, setDepartDate] = useState('2024-08-15'); // Use YYYY-MM-DD for date input
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState('1'); // Store as string for select value
  const [isOneWay, setIsOneWay] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchParams = {
      from: fromLocation,
      to: toLocation,
      depart: departDate,
      return: isOneWay ? null : returnDate,
      passengers: parseInt(passengers), // Convert to number
      oneWay: isOneWay,
    };
    onSearch(searchParams); // Pass data up to App.js
    navigate('/results');    // Navigate to results page
  };

  return (
    <section id="home-search-screen" className="screen-section py-5">
      <div className="container">
        <h2 className="section-title-app text-center mb-4">Find Your Next Adventure</h2>
        <div className="search-form-container mx-auto" style={{ maxWidth: '800px', backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.075)' }}>
          <form onSubmit={handleSubmit}>
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label htmlFor="fromLocation" className="form-label"><i className="fas fa-plane-departure"></i> From:</label>
                <input type="text" className="form-control" id="fromLocation" value={fromLocation} onChange={(e) => setFromLocation(e.target.value)} required />
              </div>
              <div className="col-md-6">
                <label htmlFor="toLocation" className="form-label"><i className="fas fa-plane-arrival"></i> To:</label>
                <input type="text" className="form-control" id="toLocation" value={toLocation} onChange={(e) => setToLocation(e.target.value)} required />
              </div>
            </div>
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label htmlFor="departDate" className="form-label"><i className="fas fa-calendar-alt"></i> Depart:</label>
                <input type="date" className="form-control" id="departDate" value={departDate} onChange={(e) => setDepartDate(e.target.value)} required />
              </div>
              <div className="col-md-6">
                <label htmlFor="returnDate" className="form-label"><i className="fas fa-calendar-alt"></i> Return (Optional):</label>
                <input type="date" className="form-control" id="returnDate" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} disabled={isOneWay} />
              </div>
            </div>
            <div className="row g-3 mb-4 align-items-end">
              <div className="col-md-6">
                <label htmlFor="passengers" className="form-label"><i className="fas fa-user-friends"></i> Passengers:</label>
                <select className="form-select" id="passengers" value={passengers} onChange={(e) => setPassengers(e.target.value)}>
                  <option value="1">1 Adult</option>
                  <option value="2">2 Adults</option>
                  <option value="3">3 Adults</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <div className="col-md-6 d-flex align-items-center justify-content-start pt-3"> {/* Adjusted for alignment */}
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="oneWay" checked={isOneWay} onChange={(e) => setIsOneWay(e.target.checked)} />
                  <label className="form-check-label" htmlFor="oneWay"> One-way </label>
                </div>
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-search custom-btn"> {/* Added custom-btn */}
                <i className="fas fa-search"></i> Search Flights
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default HomeScreen;