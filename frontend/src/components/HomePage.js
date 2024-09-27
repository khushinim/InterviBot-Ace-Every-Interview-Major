import React from 'react';
import Header from './Header';
import Footer from './Footer';

const HomePage = () => {
  return (
    <div>
      <Header />
      <main>
        <h1>Welcome to the Home Page!</h1>
        <p>You have successfully logged in.</p>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
