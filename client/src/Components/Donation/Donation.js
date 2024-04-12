import React, { useState,useEffect } from 'react';
import './Donation.css';
import Header from '../Header/Header.js';
import axios from 'axios';
import { Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Timer from '../Timer/Timer.js';
// Sample data for listings
// const listingsData = [
//   { 
//     id: 1, 
//     image: '6.jpg', 
//     description: 'This earthquake caused significant damage to infrastructure and homes in the affected areas.', 
//     type: 'Earthquake', 
//     location: 'Nepal, India', 
//     compensation: 1000, 
//     deadline: '2024-04-15', 
//     tags: ['Earthquake', 'emergency'], 
//   },
//   { 
//     id: 2, 
//     image: '30.avif', 
//     description: 'This earthquake caused significant damage to infrastructure and homes in the affected areas.', 
//     type: 'Tsunami', 
//     location: 'Nepal, India', 
//     compensation: 2000, 
//     deadline: '2024-04-25', 
//     tags: ['Tsunami', 'emergency'], 
//   },
//   { 
//     id: 3, 
//     image: '29.jpeg', 
//     description: 'This earthquake caused significant damage to infrastructure and homes in the affected areas.', 
//     type: 'Flood', 
//     location: 'Delhi, India', 
//     compensation: 3000, 
//     deadline: '2024-04-5', 
//     tags: ['flood', 'emergency'], 
//   },
//   // Add more listing data as needed
// ];

const Donation = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  // const [filteredListings, setFilteredListings] = useState(applicationData);
  const [applicationData, setApplicationData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/approved/applications',{withCredentials: true});
      const data = await response.data;
      setApplicationData(data.data);
      console.log(data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const [filteredListings, setFilteredListings] = useState(applicationData);
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    applicationData(e.target.value);
  };

  // Function to filter listings based on search term
  const filterListings = (term) => {
    const filtered = applicationData.filter(listing =>
      listing.typeOfDisaster.toLowerCase().includes(term.toLowerCase()) ||
      listing.location.toLowerCase().includes(term.toLowerCase())
    );
    setApplicationData(filtered);
  };

  // Function to sort listings by deadline
  const sortByDeadline = () => {
    const sortedListings = [...applicationData].sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    setApplicationData(sortedListings);
  };

  // Function to sort listings by compensation
  const sortByCompensation = () => {
    const sortedListings = [...applicationData].sort((a, b) => a.compensationAmount - b.compensationAmount);
    setApplicationData(sortedListings);
  };
  
  const handleViewDetailsClick = (_id) => {
    navigate(`/application/${_id}`); 
  };

  
  return (
    <>
      <Header />
      <div className="listings-container">
        <div className='img-container'>
          <h1 className='donation-heading'>Donate to people in need</h1>
          <input type="text" placeholder="Search by type of disaster and location" value={searchTerm} onChange={handleSearchChange} />
          <div>
            <div className="sort-buttons">
              <button className="donate-sort-buttons" onClick={sortByDeadline}>Sort by Deadline</button>
              <button className="donate-sort-buttons" onClick={sortByCompensation}>Sort by Compensation</button>
            </div>
          </div>
          {applicationData.map(listing => (
            <div className="listing-item" key={listing._id}>
              <div className="listing-image">
                <img src={listing.proofs[0].url} alt={listing.type} />
              </div>
              <div className="listing-details">
                <h2>{listing.typeOfDisaster}</h2>
                <p>Description: {listing.detailsOfLoss}</p>
                <p>Location: {listing.location}</p>
                <p>Compensation: ₹{listing.compensationAmount}</p>
                <Timer deadline={new Date(listing.deadline)} />
                <button onClick={() => handleViewDetailsClick(listing._id)}>View Details</button>
              </div>
              <div>
            {/* <button className='donate-button'>Donate</button> */}
          </div> 
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Donation;


