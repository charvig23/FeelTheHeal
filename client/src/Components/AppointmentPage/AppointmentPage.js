import React, { useState } from 'react';
import Header from '../Header/Header.js';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './AppointmentPage.css';

const AppointmentPage = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState('');

  // Sample data for doctors
  const doctors = [
    { 
      id: 1, 
      name: 'Dr. Jiya Malik', 
      specialization: 'Psychiatrist', 
      experience: '10 years', 
      consultationFee: '$100', 
      patientsTreated: 500,
      image: '101.jpeg' // Add image file name or URL
    },
    { 
      id: 2, 
      name: 'Dr. Jane Smith', 
      specialization: 'Sr. Pyschologist', 
      experience: '8 years', 
      consultationFee: '$80', 
      patientsTreated: 700,
      image: '113.jpeg' // Add image file name or URL
    },
    { 
      id: 3, 
      name: 'Dr. John Doe', 
      specialization: 'Counseling Psychologist', 
      experience: '10 years', 
      consultationFee: '$100', 
      patientsTreated: 500,
      image: '99.jpeg' // Add image file name or URL
    },
    { 
      id: 4, 
      name: 'Dr. Renu Bharti', 
      specialization: 'Pyschologist', 
      experience: '10 years', 
      consultationFee: '$100', 
      patientsTreated: 500,
      image: '102.jpeg'// Add image file name or URL
    },
    
    { 
      id: 5, 
      name: 'Dr. Charvi Gupta', 
      specialization: 'Psychotherapist', 
      experience: '17 years', 
      consultationFee: '$150', 
      patientsTreated: 500,
      image: '105.jpeg' // Add image file name or URL
    },
    { 
      id: 6, 
      name: 'Dr. Chirag Verma', 
      specialization: 'Psychotherapist', 
      experience: '15 years', 
      consultationFee: '$100', 
      patientsTreated: 500,
      image: '111.jpeg' // Add image file name or URL
    },
    { 
      id: 7, 
      name: 'Dr. Riddhi Rustagi', 
      specialization: 'Pyschologist', 
      experience: '14 years', 
      consultationFee: '$100', 
      patientsTreated: 400,
      image: '104.jpeg' // Add image file name or URL
    },
    { 
      id: 8, 
      name: 'Dr. Ritu Rani', 
      specialization: 'Pyschologist', 
      experience: '6 years', 
      consultationFee: '$70', 
      patientsTreated: 300,
      image: '105.jpeg' // Add image file name or URL
    },
    // Add more doctors with their respective information
  ];

  // Sample time slots
  const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setError(''); // Reset error when doctor is selected
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setError(''); // Reset error when date is selected
  };

  const handleTimeSlotSelect = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
    setError(''); // Reset error when time slot is selected
  };

  const handleConfirmAppointment = () => {
    if (!selectedDoctor) {
      setError('Please select a doctor.');
    } else if (!selectedDate) {
      setError('Please select a date.');
    } else if (!selectedTimeSlot) {
      setError('Please select a time slot.');
    } else {
      // Here you can implement logic to book the appointment
      setShowConfirmation(true);
    }
  };

  const handleDownloadReceipt = () => {
    // Generate receipt text
    const receiptText = `
      Appointment Confirmed!
      Date: ${moment(selectedDate).format('MMMM Do YYYY')}
      Time Slot: ${selectedTimeSlot}
      Doctor: ${selectedDoctor.name}
      Specialization: ${selectedDoctor.specialization}
      
    `;

    // Create a blob with the receipt text
    const blob = new Blob([receiptText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    // Create a link element to trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.download = 'appointment_receipt.txt';
    document.body.appendChild(link);

    // Click the link to initiate the download
    link.click();

    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <>
    <Header/>
    <div className="appointment-page">
      {!showConfirmation ? (
        <>
        <div className="Book_Appointment">
          <h1>Book an Appointment</h1></div>
          <h2>Select a Date</h2>
          <div className="date-picker">
            {/* Here you can use any date picker component */}
            <input 
              type="date" 
              min={moment().format('YYYY-MM-DD')} // Set minimum date to today
              onChange={(e) => handleDateSelect(e.target.value)} 
            />
          </div>
          <h2>Select a Time Slot</h2>
          <div className="time-slots">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                className={selectedTimeSlot === slot ? 'selected' : ''}
                onClick={() => handleTimeSlotSelect(slot)}
              >
                {slot}
              </button>
            ))}
          </div>
          <h2>Select a Doctor</h2>
          <div className="doctor-list">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className={`doctor-card ${selectedDoctor && selectedDoctor.id === doctor.id ? 'selected' : ''}`}
                onClick={() => handleDoctorSelect(doctor)}
              >
                <img src={doctor.image} alt={doctor.name} /> {/* Display the image */}
                <h3>{doctor.name}</h3>
                <p>{doctor.specialization}</p>
                <p>Years of Experience: {doctor.experience}</p>
                <p>Consultation Fee: {doctor.consultationFee}</p>
                <p>Patients Treated: {doctor.patientsTreated}</p>
              </div>
            ))}
          </div>
          <div className="confirm-button">
            <button onClick={handleConfirmAppointment}>Book Appointment</button>
            {error && <p className="error-message">{error}</p>} {/* Display error message with error-message class */}
          </div>
        </>
      ) : (
        <div className='confirmation-bg'>
        <div className="confirmation">
          <h2>Appointment Confirmed!</h2>
          <p>Your teleconsultation appointment with the doctor has been scheduled. Kindly ensure your availability at the appointed time. The designated doctor will reach out to you accordingly.</p>
          <p>Doctor: {selectedDoctor.name}</p>
          <p>Specialization: {selectedDoctor.specialization}</p>
          <p>Date: {moment(selectedDate).format('MMMM Do YYYY')}</p>
          <p>Time Slot: {selectedTimeSlot}</p>
          <button onClick={handleDownloadReceipt}>Download Receipt</button>
        </div>
        </div>
      )}
    </div>
    </>
  );
};

export default AppointmentPage;
