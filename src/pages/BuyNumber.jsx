import Sidebar from "../components/Sidebar";
import { servers, services } from "../constants";
import serverIcon from "../assets/icons/server-icon.svg";
import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { useContext } from "react";
import { UserContext } from "../components/UserContext";
import { BASE_URL } from "../../config";
import axios from 'axios';
import Cookies from "js-cookie";


//Need to work on responsiveness
const BuyNumber = () => {
  const [selectedServer, setSelectedServer] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("+91**********");
  const [message, setMessage] = useState("There is no message yet");
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [serverEndpoint, setServerEndpoint] = useState("");
  const [numberId, setNumberId] = useState(null);
  const { user, setUser } = useContext(UserContext);
  const [price, setPrice] = useState(null);
  const [sms, Setsms] = useState(undefined);
  

  const handleServerClick = async (server) => {
    setSelectedServer(server.value);
    

    try {
      // Find the selected server by value
      setServerEndpoint(server.apiEndpoint);
      
      try {
        const response = await fetch(`${BASE_URL}/services${server.value}`);
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    } catch (error) {
      console.error("Error fetching data from server:", error);
    }
  };

  const handleServiceClick = (serviceCode, Price) => {
    if (parseFloat(user.balance) > parseFloat(Price)) {
      setSelectedService(serviceCode);
      setPrice(Price);

      
    } else {
      alert("Balance is LOW");
    }
  };

  const getNumber = async () => {
    
    var apiEndpoint = "";
    apiEndpoint = `${serverEndpoint}&action=getNumber&service=${selectedService}&country=22`;
    
    try {
      // Make an API call to get the number
      const response = await fetch(apiEndpoint);
      
      
      const data = await response.text(); // Assume the response is text
      var extractedNumberId = "";
      var extractedPhoneNumber = "";

      // Extract parts from the response
      [extractedNumberId, extractedPhoneNumber] = data.split(":").slice(1);

      // Update the state with the obtained phone number
      setNumberId(extractedNumberId);
      setPhoneNumber(extractedPhoneNumber);
      // Start fetching status recursively
    } catch (error) {
      console.error("Error fetching number:", error);

      // Placeholder for the error message
      setMessage("Error obtaining number. Please try again.");
    }
  };

  useEffect(() => {
    // action on update
    console.log(numberId);
    if (numberId !== null) {
      getStatus(serverEndpoint, numberId);
    }

    const fun = async () => {
      if (sms != undefined) {
        const requestData = {
          email: user.email,
          service: selectedService,
          price: price,
          number: phoneNumber,
          status: "success",
          code_sms: sms,
        };

        const res = await axios.post(
          `${BASE_URL}/add-history?access_token=${Cookies.get("serv_auth")}`,
          requestData
        );
        if (res.status === 200) {
          user.balance = res.data.balance;
          setUser(user);
          console.log("Successfully added history");
        } else {
          console.log("Internal Server Error");
        }
      }
    };

    fun();
  }, [numberId, sms]);

  const getStatus = async (serverEndpoint, numberId) => {
    const statusEndpoint = `${serverEndpoint}&action=getStatus&id=${numberId}`;
    
    

    try {
      // Make an API call to get the status
      const response = await fetch(statusEndpoint);
      var data = await response.text(); // Assume the response is text

      // Update the state with the obtained status
      if (data != "STATUS_WAIT_CODE" && data != "STATUS_CANCEL") {
        data = data.split(":")[1];
        setMessage(data);
        Setsms(data);
        clearTimeout();
      }
      setMessage(data);

      // Fetch status again after 2 seconds
      setTimeout(() => {
        getStatus(serverEndpoint, numberId);
      }, 2000);
    } catch (error) {
      console.error("Error fetching status:", error);

      // Placeholder for the error message
      setMessage("Error obtaining status. Please try again.");
    }
  };

  const cancelOptions = async () => {
    
    const cancelEndpoint = `${serverEndpoint}&action=setStatus&id=${numberId}&status=8`;
    

    try {
      // Make an API call to set the status to 8 (or the appropriate status code)
      const response = await fetch(cancelEndpoint);
      const data = await response.text(); // Assume the response is text

      // Placeholder for any logic based on the cancellation response
      console.log("Cancellation response:", data);
    } catch (error) {
      console.error("Error cancelling:", error);
    }

    // Additional logic if needed after cancelling
    // For example, clearing state, redirecting, etc.
    setNumberId(null);
    setPhoneNumber("+91**********");
    setSelectedServer(0);
    setSelectedService(0);
    setMessage("Cancelled successfully");
    window.location.reload();
  };

  const nextSMS = async (serverEndpoint, numberId) => {
    const nextSmsEndpoint = `${serverEndpoint}&action=setStatus&id=${numberId}&status=3`;

    try {
      // Make an API call to set the status to 3 (or the appropriate status code)
      const response = await fetch(nextSmsEndpoint);
      const data = await response.text(); // Assume the response is text
      getStatus(serverEndpoint, numberId);

      // Placeholder for any logic based on the next SMS response
      console.log("Next SMS response:", data);
    } catch (error) {
      console.error("Error processing next SMS:", error);
    }

    setMessage("Processing next SMS");
  };

  return (
    <section className="flex flex-row pt-24">
      <Sidebar />
      <section className="flex flex-col justify-center w-full pt-24 padding-r max-container padding-l wide:padding-r padding-b">
        <div className="w-full max-w-[1000px] gap-8 card items-start">
          <div className="w-full gap-6">
            <h3 className="text-2xl font-semibold tracking-wide text-left">
              1. Select Server
            </h3>
            <ul className="grid w-full grid-cols-2 mt-5 max-sm:grid-cols-1 max-sm:grid-flow-row">
              {servers.map((server) => (
                <li
                  key={server.value}
                  className={`flex flex-row items-center justify-start w-full gap-5 py-4 mx-2 max-w-[400px] my-4 text-lg font-semibold leading-none tracking-wider ${
                    selectedServer === server.value
                      ? "bg-blue-500 text-white"
                      : "bg-blue-100 hover:bg-blue-500 hover:text-white"
                  } px-7 rounded-xl `}
                  onClick={() => handleServerClick(server)}
                >
                  <span>{server.value}.</span>
                  <img
                    src={serverIcon}
                    className="text-white bg-white"
                    alt="Server Icon"
                  />
                  <span>{server.label}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full gap-6">
            <h3 className="text-2xl font-semibold tracking-wide text-left">
              2. Select Service
            </h3>
            <ul className="grid w-full grid-cols-2 mt-5 max-sm:grid-cols-1 max-sm:grid-flow-row">
              {services.map((service) => (
                <li
                  key={service.id}
                  className={`flex flex-row items-center justify-start w-full gap-5 py-4 mx-2 max-w-[400px] my-4 text-lg font-semibold leading-none tracking-wider ${
                    selectedService === service.id
                      ? "bg-blue-500 text-white"
                      : "bg-blue-100 hover:bg-blue-500 hover:text-white"
                  } px-7 rounded-xl `}
                  onClick={() =>
                    handleServiceClick(service.servicecode, service.price)
                  }
                >
                  <span>{service.id}.</span>
                  {/* Display service-specific data */}
                  <span>{service.servicename}</span>
                  <span>{`$${service.price}`}</span>
                  {/* Add more details as needed */}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-row gap-6 max-sm:flex-col">
            <button
              label="Buy a Number"
              className="text-black bg-transparent border-2 button border-primary"
              onClick={() => {
                getNumber();
              }}
            >
              Buy a number
            </button>
            <button
              label="cancel"
              className="text-black bg-transparent border-2 button border-primary"
              onClick={() => {
                cancelOptions();
              }}
            >
              Cancel
            </button>
          </div>
          <div className="w-full gap-6">
            <h3 className="text-2xl font-semibold tracking-wide text-left">
              3. Phone Number
            </h3>
            <div className="py-4 text-left text-black bg-blue-100 mt-9 button">
              {phoneNumber}
            </div>
          </div>
          <div className="w-full gap-6">
            <h3 className="text-2xl font-semibold tracking-wide text-left">
              4. Waiting for SMS
            </h3>
            <div className="py-4 text-left text-black bg-blue-100 mt-9 flex items-start justify-start text-lg leading-none rounded-xl min-w-[700px] max-sm:min-w-[300px] w-full min-h-[300px] px-7 font-[500]">
              {message}
            </div>
          </div>
          <div className="flex flex-row gap-6">
            <button
              label="Buy a Number"
              className="text-black bg-transparent border-2 button border-primary"
              onClick={() => {
                getSMS();
              }}
            >
              Buy a number
            </button>
            <button
              label="Next SMS"
              className="text-black bg-transparent border-2 button border-primary"
              onClick={() => nextSMS()}
            >
              Next SMS
            </button>
          </div>
        </div>
      </section>
    </section>
  );
};

export default BuyNumber;
