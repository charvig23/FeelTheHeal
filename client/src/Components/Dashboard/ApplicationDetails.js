import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ApplicationDetails.css';

function AppDetails() {
  const { id } = useParams();
  const [application, setApplication] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/application/${id}`,{withCredentials: true});
        console.log('API Response:', response.data);
        setApplication(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching application details:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id]);

  console.log('Application:', application);

  if (!application) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app-details">
      <div className='app-form'>
      <h1 className='Dona-head'>Application Details</h1>
      <div className="image">
  {application.proofs && application.proofs[0] && (
    <img src={application.proofs[0].url} alt='Image' style={{ width: '10%', height: '10%' }}/>
  )}
</div>
      <p><span>Name: </span>{application.contactDetails?.name}</p>
      <p><span>Email: </span>{application.contactDetails?.email}</p>
      <p><span>Phone: </span>{application.contactDetails?.phone}</p>
      <p><span>Date Of Birth: </span>{new Date(application.dateOfBirth).toLocaleDateString()}</p>
      <p><span>Address: </span>{application.contactDetails?.address}</p>
      <p><span>Location: </span>{application.location}</p>
      <p><span>Type of Disaster: </span>{application.typeOfDisaster}</p>
      <p><span>Details of Loss: </span>{application.detailsOfLoss}</p>
      <p><span>Compensation Amount: </span>{application.compensationAmount}</p>
      <p><span>Date of Disaster: </span>{new Date(application.dateOfDisaster).toLocaleDateString()}</p>
      <p><span>Bank Name: </span>{application.bankDetails?.bankName}</p>
      <p><span>Account Number: </span>{application.bankDetails?.accountNumber}</p>
      <p><span>Account Holder Name: </span>{application.bankDetails?.accountHolderName}</p>
      <p></p>
    </div>
    </div>
  );
}

export default AppDetails;
