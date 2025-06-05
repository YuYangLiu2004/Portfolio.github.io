// src/screens/CheckoutScreen.js
import React, { useState } from 'react';
import { useNavigate, Navigate }
from 'react-router-dom';
// import './CheckoutScreen.css';

function CheckoutScreen({ flight }) {
  const navigate = useNavigate();
  // Form states
  const [title, setTitle] = useState('Mr.');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  // ... more form states for DOB, payment

  if (!flight) {
    // If no flight is selected (e.g., user directly navigates here), redirect
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!firstName || !lastName) {
      alert('Please fill in passenger details.');
      return;
    }
    // In a real app, process payment here (mocked)
    console.log('Processing payment for:', flight, { title, firstName, lastName });
    // Navigate to confirmation page
    navigate('/confirmation', { state: { bookingRef: `SKL-${Date.now().toString().slice(-6)}`, flightDetails: flight } });
  };

  const totalPrice = flight.price + (flight.taxesAndFees || 75); // Assuming a mock tax

  return (
    <section id="checkout-screen" className="screen-section py-5">
      <div className="container">
        <h2 className="section-title-app text-center mb-4">Review Your Flight & Checkout</h2>
        <div className="row">
          <div className="col-lg-7 order-lg-1">
            <div className="checkout-form card card-body">
              <h3 className="section-title-app fs-5 text-start mb-3">Passenger Details</h3>
              <form onSubmit={handleSubmit}>
                <div className="row g-3 mb-3">
                  <div className="col-md-4">
                    <label htmlFor="title" className="form-label">Title</label>
                    <select id="title" className="form-select" value={title} onChange={e => setTitle(e.target.value)}>
                      <option>Mr.</option><option>Ms.</option><option>Mrs.</option><option>Dr.</option>
                    </select>
                  </div>
                  <div className="col-md-8">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input type="text" className="form-control" id="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} required />
                  </div>
                </div>
                <div className="row g-3 mb-3">
                  <div className="col-md-7">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="lastName" value={lastName} onChange={e => setLastName(e.target.value)} required />
                  </div>
                  <div className="col-md-5">
                    <label htmlFor="dob" className="form-label">Date of Birth</label>
                    <input type="date" className="form-control" id="dob" required/>
                  </div>
                </div>

                <h3 className="section-title-app fs-5 text-start mt-4 mb-3">Payment Information (Mock)</h3>
                <div className="mb-3">
                  <label htmlFor="cardNumber" className="form-label">Card Number</label>
                  <input type="text" className="form-control" id="cardNumber" placeholder="XXXX XXXX XXXX XXXX" />
                </div>
                <div className="row g-3 mb-3">
                  <div className="col-md-4"><label htmlFor="expiryDate" className="form-label">Expiry (MM/YY)</label><input type="text" className="form-control" id="expiryDate" placeholder="MM/YY" /></div>
                  <div className="col-md-3"><label htmlFor="cvv" className="form-label">CVV</label><input type="text" className="form-control" id="cvv" placeholder="XXX" /></div>
                  <div className="col-md-5"><label htmlFor="nameOnCard" className="form-label">Name on Card</label><input type="text" className="form-control" id="nameOnCard" /></div>
                </div>
                <div className="form-check mb-4">
                  <input className="form-check-input" type="checkbox" value="" id="termsAndConditions" required />
                  <label className="form-check-label" htmlFor="termsAndConditions">I agree to the terms and conditions.</label>
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-confirm-pay custom-btn">
                    <i className="fas fa-lock"></i> Confirm & Pay ${totalPrice.toFixed(2)}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-5 order-lg-2">
            <div className="checkout-summary card card-body sticky-lg-top" style={{ top: '20px' }}> {/* Adjust top for sticky */}
              <h3 className="section-title-app fs-5 text-start mb-3">Flight Summary</h3>
              <p className="mb-1 small"><strong>Flight:</strong> {flight.airline} - {flight.from} to {flight.to}</p>
              <p className="mb-1 small"><strong>Times:</strong> {flight.departTime} <i className="fas fa-long-arrow-alt-right mx-1"></i> {flight.arriveTime}</p>
              <p className="mb-1 small"><strong>Duration:</strong> {flight.duration}, <strong>Stops:</strong> {flight.stops}</p>
              <p className="mb-3 small"><strong>Passengers:</strong> 1 Adult {/* Adjust dynamically */}</p>
              <div className="price-item"><span className="text-muted">Flight Price:</span><span>${flight.price.toFixed(2)}</span></div>
              <div className="price-item"><span className="text-muted">Taxes & Fees (Est.):</span><span>${(flight.taxesAndFees || 75).toFixed(2)}</span></div>
              <div className="price-item price-total mt-2 pt-2 border-top"><span>Total (USD):</span><span>${totalPrice.toFixed(2)}</span></div>
              <div className="text-center mt-3 secure-payment-icons">
                <i className="fab fa-cc-visa fa-2x mx-1"></i><i className="fab fa-cc-mastercard fa-2x mx-1"></i>
                <i className="fab fa-cc-amex fa-2x mx-1"></i><i className="fas fa-lock fa-lg mx-1" style={{color: 'var(--primary-color)'}}></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CheckoutScreen;