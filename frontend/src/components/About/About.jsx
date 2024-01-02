// Import necessary libraries and components
import React from 'react';
import Helmet from 'react-helmet';

import './About.css';
import store from '../../images/store.jpg';

// Home component
const About = () => {
  return (
    <div>
      {/* Helmet for setting document title */}
      <Helmet title="Electro Shop - Your Electronics Destination" />

      {/* Banner section */}
      <div className="banner">
        <p>About Our Shop</p>
        <h1>We are little but we have great products</h1>
      </div>

      {/* About section */}
      <div className="about-section">
        <h2 className="homeHeading">About Us</h2>
        <div className="about-content">
          <div className="about-image">
            <img src={store} alt="" />
          </div>
          <div className="about-text">
            <p>
              Our philosophy We always strive to build trust with everyone and
              make sure we offer the best service and experience. How many times
              have you bought something online and you didn’t know what happened
              after that … Things like “where is my item?” Or “how do I use or
              configure the product I just received?”, “Why not answer my
              questions?”, Etc … We know how annoying it is to buy something
              online and not be able to contact the seller about anything
              thereafter … Well, this is what it’s all about in Electroshop. We
              are there for you no matter what, and we will go the extra mile to
              make your experience with us happy. Yes, whatever you need, just
              “contact us” and we are here for you.
            </p>
            <p>
              Our objective We ensure that all of our orders are shipped within
              1 business day only. What this means to you is that when you buy
              something from us, you can be sure that we will ship it as soon as
              possible as we process our orders on a daily basis. And if you are
              trying to find shipping costs on our website, there are none
              because we offer FREE shipping. So full transparency and no
              surprises in the box. We know what it’s like to take the time to
              add your items to your shopping cart and then at checkout an
              amazing shipping cost … so we’ve incorporated the best deals into
              our products without charging you for shipping.
            </p>
            <p>
              Our store In fact, you can find the best deals in our store for
              all our products and we always have our best deals at very
              affordable prices. Feel free to compare our prices online with any
              local or online retailer because we are confident that our prices
              (including shipping) will give you the best deal, service, and
              quality assurance you are looking for when shopping online. We
              also keep track of the latest trends that are at our fingertips
              and if you can’t find what you’re looking for, let us know and
              we’ll provide it for you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
