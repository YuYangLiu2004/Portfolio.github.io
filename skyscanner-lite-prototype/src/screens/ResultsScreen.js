// src/screens/ResultsScreen.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import FlightCard from '../components/FlightCard';
// import './ResultsScreen.css';

function ResultsScreen({ results, onBookFlight }) {
  const [filteredResults, setFilteredResults] = useState(results || []);
  const [sortBy, setSortBy] = useState('price'); // 'price' or 'duration'
  const [stopsFilter, setStopsFilter] = useState('Any');
  // Add more filter states if needed (price range, departure times)

  const location = useLocation(); // To get search params if needed for display

  // Effect to update filteredResults when original results or filters change
  useEffect(() => {
    if (!results) {
        setFilteredResults([]);
        return;
    }
    let tempResults = [...results];

    // Apply stops filter
    if (stopsFilter !== 'Any') {
      const numStops = parseInt(stopsFilter);
      tempResults = tempResults.filter(flight => flight.stops === numStops);
    }

    // Apply sorting
    if (sortBy === 'price') {
      tempResults.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'duration') {
      // Basic duration sort (assumes duration is like "16h 00m")
      // A more robust solution would convert duration to minutes
      tempResults.sort((a, b) => {
        const parseDuration = (d) => {
          const parts = d.match(/(\d+)h\s*(\d*)m?/);
          return parts ? parseInt(parts[1]) * 60 + (parseInt(parts[2]) || 0) : Infinity;
        };
        return parseDuration(a.duration) - parseDuration(b.duration);
      });
    }
    setFilteredResults(tempResults);
  }, [results, sortBy, stopsFilter]);


  if (!results || results.length === 0) {
    return (
      <section className="screen-section py-5 text-center">
        <div className="container">
          <h2>No Flights Found</h2>
          <p>Sorry, we couldn't find any flights for your criteria.</p>
          <Link to="/" className="btn btn-primary custom-btn mt-3">Try Another Search</Link>
        </div>
      </section>
    );
  }

  // Example: Displaying original search query (you'd get this from state or query params)
  const displayQuery = `Flights from ${results[0]?.from || 'Origin'} to ${results[0]?.to || 'Destination'}`;


  return (
    <section id="flight-results-screen" className="screen-section bg-light py-5">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="section-title-app text-start mb-0">Flight Results</h2>
          <Link to="/" className="btn btn-outline-secondary btn-sm">Modify Search</Link>
        </div>
        <p className="text-center text-muted">{displayQuery}</p>

        {/* Filters Bar */}
        <div className="filters-bar card card-body mb-4">
          <div className="row g-2 align-items-center">
            <div className="col-md-3">
              <label htmlFor="filterStops" className="form-label small mb-1">Stops:</label>
              <select id="filterStops" className="form-select form-select-sm" value={stopsFilter} onChange={(e) => setStopsFilter(e.target.value)}>
                <option value="Any">Any</option>
                <option value="0">Non-stop</option>
                <option value="1">1 Stop</option>
                <option value="2">2 Stops</option>
              </select>
            </div>
            {/* Add Price Range Filter (e.g., two input fields or a range slider component) */}
            {/* Add Departure Time Filter */}
            <div className="col-md-3">
              <label htmlFor="sortBy" className="form-label small mb-1">Sort by:</label>
              <select id="sortBy" className="form-select form-select-sm" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="price">Price (Low-High)</option>
                <option value="duration">Duration (Shortest)</option>
              </select>
            </div>
            {/* <div className="col-md-2 d-grid">
              <button className="btn btn-sm btn-primary mt-3 custom-btn">Apply Filters</button>
            </div> */}
          </div>
        </div>

        {filteredResults.length > 0 ? (
            filteredResults.map(flight => (
              <FlightCard key={flight.id} flight={flight} onBookFlight={onBookFlight} />
            ))
        ) : (
            <p className="text-center mt-4">No flights match your current filters.</p>
        )}

        {/* Optional: Load More Button if implementing pagination */}
        {/* <div className="text-center mt-4">
          <button className="btn btn-outline-secondary">Load More Results</button>
        </div> */}
      </div>
    </section>
  );
}

export default ResultsScreen;