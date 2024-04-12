import React, { useState, useEffect } from 'react';
import Stack from './Stack.js';
import Header from '../Header/Header.js';
import { Pagination } from 'react-bootstrap';
import './DonationDashboard.css'; // Import the CSS file
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DonationDashboard() {
  const stacksPerPage = 4;
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1); 
  const [applicationData, setApplicationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/get-application',{withCredentials: true});
         console.log(response.data);
         console.log(response.status);
        const data = await response.data;
        console.log(data);
        setApplicationData(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate the indexes of stacks to be displayed on the current page
  const indexOfLastStack = currentPage * stacksPerPage;
  const indexOfFirstStack = indexOfLastStack - stacksPerPage;
  const currentStacks = applicationData.filter(app => !app.review).slice(indexOfFirstStack, indexOfLastStack);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleViewDetailsClick = (_id) => {
    navigate(`/application/${_id}`); 
  };

  // Pagination items
  const paginationItems = [];
  for (let number = 1; number <= Math.ceil(applicationData.length / stacksPerPage); number++) {
    paginationItems.push(
      <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
        {number}
      </Pagination.Item>
    );
  }

  return (
    <>
    <Header/>
      <div className='Dona-page'>
        <div className='Dona-head'><h1>Donations </h1></div>
        <div className="stack-container">
          {/* Display loading message while fetching data */}
          {loading ? (
            <div>Loading...</div>
          ) : (
            currentStacks.map(stack => (
              <Stack
                key={stack._id}
                _id={stack._id}
                imageUrl={stack.proofs[0].url}
                name={stack.contactDetails.name}
                location={stack.location}
                disasterType={stack.typeOfDisaster}
                createdAt={stack.createdAt}
                buttonTextView='View Details' onClick={() => handleViewDetailsClick(stack._id)}
                handleViewDetails={() => {}}
                handleUpdateStatus={() => {}}
              />
            ))
          )}
          {/* Pagination */}
          <div className="pagination-container">
            <Pagination>{paginationItems}</Pagination>
          </div>
        </div>
      </div>
    </>
  );
}

export default DonationDashboard;
