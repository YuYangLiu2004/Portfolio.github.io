// skyscanner-lite-prototype/src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import your components and screens
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ResultsScreen from './screens/ResultsScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import ConfirmationScreen from './screens/ConfirmationScreen';

import './App.css'; // Your main app styles

// VVVVVVVVVV ADD THIS LINE VVVVVVVVVV
// Get the PUBLIC_URL environment variable.
// For local dev (npm start), it's usually "" or "/".
// For build (npm run build), it's derived from the "homepage" in package.json.
const publicUrl = process.env.PUBLIC_URL || "";
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

function App() {
  const [searchResults, setSearchResults] = useState(null);
  const [selectedFlight, setSelectedFlight] = useState(null);

  // Your handleSearch and handleBookFlight functions here...
  const handleSearch = (searchParams) => {
    console.log("App.js: Searching with params:", searchParams);
    const mockResults = [ /* ... your mock flight data ... */ ];
    setSearchResults(mockResults);
  };

  const handleBookFlight = (flightToBook) => {
    console.log("App.js: Selected flight for booking:", flightToBook);
    setSelectedFlight(flightToBook);
  };


  return (
    // VVVVVVVVVV UPDATE THIS LINE VVVVVVVVVV
    <Router basename={publicUrl}>
    {/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */}
      <div className="App">
        <Header />
        <main className="main-content-area">
          <Routes>
            <Route path="/" element={<HomeScreen onSearch={handleSearch} />} />
            <Route
              path="/results"
              element={searchResults ? <ResultsScreen results={searchResults} onBookFlight={handleBookFlight} /> : <Navigate to="/" replace />}
            />
            <Route
              path="/checkout"
              element={selectedFlight ? <CheckoutScreen flight={selectedFlight} /> : <Navigate to={searchResults ? "/results" : "/"} replace />}
            />
            <Route path="/confirmation" element={<ConfirmationScreen />} />
            <Route path="*" element={<Navigate to="/" replace />} /> {/* Catch-all */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;