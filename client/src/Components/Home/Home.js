import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import './Home.css';
import Header from '../Header/Header.js';
function Home() {
    const [activeIndex, setActiveIndex] = useState(0);

    const handlePrev = () => {
        setActiveIndex(activeIndex === 0 ? items.length - 1 : activeIndex - 1);
    };

    const handleNext = () => {
        setActiveIndex(activeIndex === items.length - 1 ? 0 : activeIndex + 1);
    };

    const items = [
        { 
            id: 1, 
            src: '77.jpg', 
            alt: 'Slide 1', 
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 3.85 2.64 7.1 6.19 8H4c-1.1 0-2 .9-2 2v2h4v-4c0-1.1.9-2 2-2h3.45c-.26-.73-.45-1.51-.53-2.32C8.18 17.39 6 15.09 6 12c0-3.31 2.69-6 6-6s6 2.69 6 6c0 3.09-2.18 5.39-5.92 7.16C17.98 14.51 18 13.26 18 12c0-4.42-3.58-8-8-8zm5 10.5h-2v2h-1.5v-2H9v-1.5H11v-2h1.5v2H15v1.5z"/>
                </svg>
            ), 
            caption: { 
                title: 'Get Donations for post-disaster Recovery', 
                content: 'Support post-disaster recovery efforts through donations.' 
            } 
        },
        { 
            id: 2, 
            src: '51.jpg', 
            alt: 'Slide 2', 
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10c0-5.52-4.48-10-10-10zm-1 15v-2h2v2h-2zm0-4h2v3h-2v-3z"/>
                </svg>
            ), 
            caption: { 
                title: 'Teleconsulation for relief', 
                content: 'Extend relief through teleconsultation services.' 
            } 
        },
        { 
            id: 3, 
            src: '53.jpg', 
            alt: 'Slide 3', 
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-2h2v2h-2zm0-4h2v3h-2v-3z"/>
                </svg>
            ), 
            caption: { 
                title: 'Restore your peace of mind', 
                content: 'Find solace and restore peace of mind through our services.' 
            } 
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 3000); // Advance slide every 3 seconds

        return () => clearInterval(interval); // Clear the interval on component unmount
    }, [activeIndex]);

    return (
        <div>
        <Header/>
        <div className='homepage-container'>
        <div className='homepage-content'>
            {/* Carousel */}
            <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {items.map((item, index) => (
                        <div key={item.id} className={`carousel-item ${index === activeIndex ? 'active' : ''}`}>
                            <img src={item.src} className="d-block w-100" alt={item.alt} style={{ height: '26rem' }}/>
                            <div className="carousel-caption d-none d-md-block" style={{fontWeight:'bolder', color:'white'}}>
                                <h2>{item.caption.title}</h2>
                                <p>{item.caption.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="carousel-control-prev" type="button" onClick={handlePrev}>
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" onClick={handleNext}>
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
                {/* Bootstrap Cards */}
                <div className='Card-container'>
                    {items.slice(0, 3).map((item) => (
                        <Card key={item.id} className="mb-2 home-card" bg="light" text="dark" style={{ width: '18rem',height:'16rem' }}>
                           <Card.Header style={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{item.icon}</Card.Header>
                            <Card.Body>
                                <Card.Title>{item.caption.content}</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
                {/* End of Bootstrap Cards */}
                <div className='About-us-heading'><h2>About us</h2></div>
                <div className='About-us'>
            <div className='About-us-para'>
                <h3>About the Initiative</h3>
                <p> of the image for accessibility purposes.
                     Also, ensure that you have the necessary setup to render this component within your React application.
                     f description of the image for accessibility purposes. Also, ensure that you have the necessary setup 
                     to render this component within your React application.
                </p>
            </div>
            <div className='About-us-img'>
                <img className='About-img' src="67.avif" alt="Description of image" />
            </div>
            
        </div>
        <div className='About-us'>
           
            <div className='About-us-img'>
                <img className='About-img' src="55.avif" alt="Description of image" />
            </div>
            <div className='About-us-para'>
                <h3>About the Team</h3>
                <p> of the image for accessibility purposes.
                     Also, ensure that you have the necessary setup to render this component within your React application.
                     f description of the image for accessibility purposes. Also, ensure that you have the necessary setup 
                     to render this component within your React application.
                </p>
            </div>
            </div>
            </div>
            </div>
            </div>
    
    );
}

export default Home;
