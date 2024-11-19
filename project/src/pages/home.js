import './home.css';
import React from 'react';
import { Link } from 'react-router-dom';
import topRightImage from './logoo.png';

function Home() {
  return (
    <div className="App">
      <div className="container-one">
        <img src={topRightImage} alt="Top Right" className="top-right-image" />
        <h2>CODE.DS</h2>

        <div className="code-ds">
          <h1 id="code">CODE.</h1>
          <h1 id="ds">ds</h1>
        </div>
        <p className="subheading">
          A DSA code learning platform.<br />
          Elevate your coding skills with our carefully selected<br />
          data structures and algorithm problems.
        </p>
        <p className="sub">Start your problem-solving journey now!</p>
      </div>

      <div className="container-two">
        {/* Logout button on the top right */}
        <Link to="/"><button className="logout-button">Logout</button></Link>

        <div id="hi">
          <h1>Problems</h1>
        </div>
        <div id="outbox">
          <div className="lol">
            <div className="problem-item">
              <h3>TWO SUM</h3>
              <Link to="/twosum">
                <button>SOLVE</button>
              </Link>
            </div>
            <div className="problem-item">
              <h3>ADD TWO</h3>
              <Link to="/addtwonumbers">
                <button>SOLVE</button>
              </Link>
              <h3>Median</h3>
              <Link to="/medianoftwosortedarrays">
                <button>SOLVE</button>
              </Link>
              <h3>pallindrome</h3>
              <Link to="/longestpalindromicsubstring">
                <button>SOLVE</button>
              </Link>
              <h3>zigzagconversion</h3>
              <Link to="/zigzagconversion">
                <button>SOLVE</button>
              </Link>
              <h3>reverseinteger</h3>
              <Link to="/reverseinteger">
                <button>SOLVE</button>
              </Link>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
