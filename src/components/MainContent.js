import React from 'react';
import Header from './Header';
import Footer from './Footer';

const MainContent = props => {
  return (
    <div>
      <Header {...props} />
      <div className="main">
        {props.content}
      </div>
      <Footer />
    </div>
  );
};

export default MainContent;