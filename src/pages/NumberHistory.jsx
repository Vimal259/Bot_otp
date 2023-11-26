import Sidebar from "../components/Sidebar";
import { tableContents } from "../constants";
import Button from "../components/Button";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../components/UserContext";
import Cookies from "js-cookie";
import { BASE_URL } from "../../config";


const NumberHistory = () => {
  const [feedbackMessage, setFeedbackMessage] = useState(
    "There is no message yet"
  );
  const { user, setUser } = useContext(UserContext);
  

  const enterFeedback = async () => {
    const values = {
      email: user.email,
      feedback: feedbackMessage,
    };
    const res = await axios.post(
      `${BASE_URL}/feedback?access_token=${Cookies.get("serv_auth")}`,
      values
    );

    if (res.status === 200) {
      console.log("Feedback sent Successfully");
    } else {
      console.log("Internal Server Error");
    }
  };

  return (
    <section className="flex flex-row pt-24">
      <Sidebar />
      <section className="flex flex-col justify-center w-full pt-24 padding-r max-container padding-l wide:padding-r padding-b">
        <div className="w-full max-w-[1000px] gap-8 card items-start">
          <div className="flex flex-col w-full gap-6">
            <h3 className="text-2xl font-semibold tracking-wide text-left">
              Number History
            </h3>
            <div className="overflow-x:auto;">
              <table>
                <thead className="rounded-lg">
                  <tr>
                    <td>S No.</td>
                    <td>ID</td>
                    <td>Date</td>
                    <td>Service</td>
                    <td>Price</td>
                    <td>Number</td>
                    <td>Status</td>
                    <td>Code from SMS</td>
                  </tr>
                </thead>
                <tbody>
                  {tableContents.map((item) => (
                    <tr key={0}>
                      <td>{9 + 1}</td>
                      <td>{item.ID}</td>
                      <td>{item.Date}</td>
                      <td>{item.Service}</td>
                      <td>{item.Price}</td>
                      <td>{item.Number}</td>
                      <td>{item.Status}</td>
                      <td>{item.Code}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="w-full gap-6">
            <h3 className="text-2xl font-semibold tracking-wide text-left">
              Submit Feedback
            </h3>
            <textarea
              className="py-4 text-left text-black bg-blue-100 mt-9 flex items-start justify-start text-lg leading-none rounded-xl min-w-[700px] max-sm:min-w-[300px] w-full min-h-[300px] px-7 font-[500]"
              placeholder="Enter your feedback here"
              onChange={(e) => setFeedbackMessage(e.target.value)}
            ></textarea>
            <button
              className="mt-6 button"
              onClick={() => {
                enterFeedback();
              }}
            >
              Submit Feedback
            </button>
          </div>
        </div>
      </section>
    </section>
  );
};

export default NumberHistory;
