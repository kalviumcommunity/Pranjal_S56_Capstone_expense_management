import React from 'react';
import '../Styles/Friends.css'; 
import Layout from './Layout';
import tripImg from "../images/trip.png"

function Friends() {
  return (
    <Layout>
      <div id="center_column">
        <div className="topbar group">
          <img 
            src={tripImg} 
            alt="Trip Avatar" 
          />
          <h1>trip</h1>
          <div className="actions">
            <a className="btn btn-large btn-orange" data-toggle="modal" href="#add_bill">
              Add an expense
            </a>
            <a className="btn btn-large btn-mint" data-toggle="modal" href="#settle_up_form">
              Settle up
            </a>
          </div>
        </div>
        <div id="expenses">
          <div id="expenses_list">
            <div className="month-divider">
              <span>July 2024</span>
             
            </div>
            <div className="expense"  >
              <div className="summary">
                <div className="expense summary involved" data-date="2024-07-08T11:37:10Z" data-involved="true">
                  <div className="main-block">
                    <div className="date" title="2024-07-08T11:37:10Z">
                      Jul <div className="number">08</div>
                    </div>
                    <img 
                      src="https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/food-and-drink/other@2x.png" 
                      className="receipt" 
                      alt="Food and Drink"
                    />
                    <div className="header">
                      <span className="description">
                        <a href="#" onClick={(e) => e.preventDefault()}>lunch</a>
                      </span>
                    </div>
                  </div>
                  <div className="cost">
                    you paid<br />
                    <span className="number">$500.00</span>
                  </div>
                  <div className="you">
                    you lent<br />
                    <span className="positive">$375.00</span>
                  </div>
                  
                  <div className="category_picker"></div>
                </div>
              </div>
              <div className="users"></div>
            </div>
            <div className="expense" >
              <div className="summary">
                <div className="expense summary involved" data-date="2024-07-08T11:35:36Z" data-involved="true">
                  <div className="main-block">
                    <div className="date" title="2024-07-08T11:35:36Z">
                      Jul <div className="number">08</div>
                    </div>
                    <img 
                      src="https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/transportation/car@2x.png" 
                      className="receipt" 
                      alt="Transportation"
                    />
                    <div className="header">
                      <span className="description">
                        <a href="#" onClick={(e) => e.preventDefault()}>trip</a>
                      </span>
                    </div>
                  </div>
                  <div className="cost">
                    you paid<br />
                    <span className="number">$200.00</span>
                  </div>
                  <div className="you">
                    you lent<br />
                    <span className="positive">$150.00</span>
                  </div>
                  <div className="category_picker" style={{ display: 'none' }}>
                  </div>
                </div>
              </div>
              <div className="users"></div>
            </div>
          </div>
          <div id="load_more_expenses" style={{ display: 'none', textAlign: 'center' }}>
            <button 
              className="btn btn-large" 
              id="load_more_expenses_button" 
              style={{ marginBottom: '10px' }} 
              data-loading-text="Loading"
            >
              Show more
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Friends;
