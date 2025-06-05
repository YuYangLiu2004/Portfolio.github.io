// src/components/FlightCard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import './FlightCard.css';

function FlightCard({ flight, onBookFlight }) {
    const [showDetails, setShowDetails] = useState(false);
    const navigate = useNavigate();

    const handleBookNowClick = () => {
        onBookFlight(flight); // Pass the selected flight up to App.js
        navigate('/checkout'); // Navigate to the checkout page
    };

    return (
        <div className="flight-card card mb-3">
        <div className="card-body">
            <div className="row align-items-center">
            <div className="col-lg-7">
                <div className="d-flex align-items-center mb-2">
                {flight.logoUrl && <span className="airline-logo me-2"><img src={flight.logoUrl} alt={flight.airline} style={{maxHeight: '30px'}} /></span>}
                <div className="flight-times fw-bold">{flight.departTime} {flight.from} <i className="fas fa-long-arrow-alt-right mx-1"></i> {flight.arriveTime} {flight.to}</div>
                </div>
                <div className="flight-details-summary small text-muted">
                {flight.cheapest && <span className="tag tag-cheapest me-1">Cheapest</span>}
                {flight.direct && <span className="tag tag-quickest me-1">Direct</span>}
                Duration: {flight.duration} <span className="mx-1">|</span> Stops: {flight.stops}
                {flight.stops > 0 && flight.stopovers && ` (${flight.stopovers.join(', ')})`}
                </div>
            </div>
            <div className="col-lg-2 flight-price text-lg-end mt-2 mt-lg-0">
                <h4 className="mb-0" style={{color: 'var(--primary-color)'}}>${flight.price}</h4>
            </div>
            <div className="col-lg-3 text-lg-end mt-2 mt-lg-0">
                <button
                className="btn btn-sm btn-view-details btn-outline-primary mb-1 d-block w-100"
                type="button"
                onClick={() => setShowDetails(!showDetails)}
                aria-expanded={showDetails}
                aria-controls={`details-${flight.id}`}
                >
                {showDetails ? 'Hide Details' : 'View Details'} <i className={`fas ${showDetails ? 'fa-chevron-up' : 'fa-chevron-down'} ms-1`}></i>
                </button>
                <button onClick={handleBookNowClick} className="btn btn-sm btn-book-now custom-btn d-block w-100">
                Book Now
                </button>
            </div>
            </div>
            {/* Collapsible Details Section */}
            {showDetails && (
            <div className="flight-details-collapsible mt-3 pt-3 border-top" id={`details-${flight.id}`}>
                <h6>Flight Segments:</h6>
                <ul>
                {flight.details.segments.map((segment, index) => (
                    <li key={index}>
                    {segment.flightNo}: {segment.from} {segment.depart} <i className="fas fa-plane mx-1"></i> {segment.to} {segment.arrive} ({segment.duration})
                    </li>
                ))}
                </ul>
                {flight.details.layovers && flight.details.layovers.length > 0 && (
                <>
                    <h6>Layovers:</h6>
                    <ul>
                    {flight.details.layovers.map((layover, index) => (
                        <li key={index}>{layover.airport}: {layover.duration}</li>
                    ))}
                    </ul>
                </>
                )}
                <h6>Baggage Allowance:</h6>
                <p className="mb-0 small">{flight.details.baggage}</p>
            </div>
            )}
        </div>
        </div>
    );
}

export default FlightCard;