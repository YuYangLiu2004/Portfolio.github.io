// src/screens/ConfirmationScreen.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// import './ConfirmationScreen.css';

function ConfirmationScreen() {
  const location = useLocation();
  const bookingRef = location.state?.bookingRef || 'N/A';
  // const flightDetails = location.state?.flightDetails; // You can use this to display more details

  return (
    <section id="confirmation-screen" className="screen-section bg-light py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="confirmation-message card card-body text-center p-4 p-md-5" style={{backgroundColor: '#d1e7dd', color: '#0f5132', border: '1px solid #badbcc'}}>
              <i className="fas fa-check-circle fa-3x mb-3"></i>
              <h2 className="section-title-app mb-3" style={{color: '#0f5132'}}>Booking Confirmed!</h2>
              <p>Thank you for booking with SkyScanner Lite.</p>
              <p>Your booking reference is: <strong>{bookingRef}</strong></p>
              <p>A confirmation email with your flight details has been (not really, this is a demo!) sent to your registered email address.</p>
              <hr className="my-4" />
              <Link to="/" className="btn btn-success custom-btn">Search for Another Flight</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ConfirmationScreen;