import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="notfound-container">
      <h1 className="notfound-heading">404 - Page Not Found</h1>
      <p className="notfound-message">The page you&apos;re looking for doesn&apos;t exist.</p>
      <p className="notfound-suggestion">Please check the URL or go back to the homepage.</p>
      <a href="/" className="notfound-home-link">Go to Homepage</a>
    </div>
  );
};

export default NotFoundPage;