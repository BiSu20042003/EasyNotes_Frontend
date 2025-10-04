import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = ({ message }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '60vh', 
      textAlign: 'center',
      padding: '20px',
      backgroundColor: 'var(--bs-body-bg)', 
      color: 'var(--bs-body-color)' 
    }}>
      
        <div className="alert alert-danger" role="alert" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '15px',
          width: 'fit-content',
          maxWidth: '80vw',
          margin: '0 auto',
          padding: '20px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
        }}>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>{message || "Something went wrong!"}</h4>
          <Link to="/classrooms" className="btn btn-outline-primary">
            <i className="fa-solid fa-house me-2"></i>Go to Home
          </Link>
        </div>
      
    </div>
  );
};

export default ErrorPage;