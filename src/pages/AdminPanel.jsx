// Import necessary libraries
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../config';
import Button from '../components/Button';
import Cookies from "js-cookie";
import { useContext } from "react";
import { UserContext } from "../components/UserContext";
import { useNavigate } from 'react-router-dom';


const AdminPanel = () => {
  const [userEmail, setUserEmail] = useState('');
  const [amount, setAmount] = useState('');
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(user.email != 'Qwerty@gmail.com' && user.email != ''){
      navigate('/profile');
    }
  }, [user])

  const handleAddBalance = async (event) => {
    try {
      const response = await axios.post(`${BASE_URL}/admin/add-balance?access_token=${Cookies.get("serv_auth")}`, {
        userEmail,
        amount,
      });
      event.preventDefault();

      console.log(response.data);
      // event.preventDefault(); 
    } catch (error) {
      console.error('Error adding balance:', error);
    }

    // event.preventDefault();
  };

  return (
    <section className="flex flex-row items-center justify-center w-full pt-40 padding-r max-container padding-l wide:padding-r padding-b">
      <div className="card">
        <h2 className="text-4xl font-[550] tracking-wider text-center">
          Admin Panel
        </h2>
        <br />
        <form
          className="flex flex-col justify-center gap-6"
          // onSubmit={() => {handleAddBalance()}}
        >
          <div>
            <label htmlFor="userEmail">User Email:</label>
            <input
              type="email"
              id="userEmail"
              placeholder="Enter user email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="amount">Amount:</label>
            <input
              type="text"
              id="amount"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <button className="btn-success button" onClick={() => {handleAddBalance()}}> Add Balance</button>
        </form>
        
      </div>
    </section>
  );
};

export default AdminPanel;
