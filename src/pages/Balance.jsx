// BalanceComponent.js
import React, { useEffect } from 'react';

import axios from 'axios';
import Cookies from "js-cookie";
import { useContext } from 'react';
import { UserContext } from "../components/UserContext"
import BASE_URL from "src/constants/helper.js"

function BalanceComponent() {
    const {user, setUser} = useContext(UserContext);
    console.log(user);

    useEffect(() => {
        console.log(user);
        const userId = user.email;

        const values = {
            'email': userId
        }

        const token = Cookies.get("serv_auth");
        const temp = async() => {await axios.get(`${BASE_URL}/test?access_token=${token}`, values)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error('Error fetching :', error);
            });
        }

        temp()

        // axios.get(`${BASE_URL}/balance?id=${userId}`)
        //     .then(response => {
        //         setUser(prevUser => ({ ...prevUser, balance: response.data.balance }));
        //     })
        //     .catch(error => {
        //         console.error('Error fetching balance:', error);
        //     });
    }, [user.id, setUser]);

    return (
        <div>
            <h1>User Balance</h1>
            <p>Email: {user.email}</p>
            <p>Balance: {user.balance}</p>
        </div>
    );
}

export default BalanceComponent;
