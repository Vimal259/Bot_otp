// Import necessary libraries
import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../config';
import Button from '../components/Button';



const AdminPanel = () => {
  const [userEmail, setUserEmail] = useState('');
  const [amount, setAmount] = useState('');

  const handleAddBalance = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/admin/add-balance`, {
        userEmail,
        amount,
      });

      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error('Error adding balance:', error);
    }
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
          onSubmit={handleAddBalance}
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
          <Button type="submit" className="btn-success" label="Add Balance" />
        </form>
        
      </div>
    </section>
  );
};

export default AdminPanel;
