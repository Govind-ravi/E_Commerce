import React, { useContext, useState } from "react";
import { FaLockOpen } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import APIs from "../APIs";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(APIs.resetPassword.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
  
      // Check if the response is OK and has a non-empty body
      if (response.ok) {
        const responseText = await response.text();
        const responseData = responseText ? JSON.parse(responseText) : {};
        console.log(responseData); // Inspect response data
  
        if (responseData.message) {
          alert(responseData.message);
        } else {
          alert('Instructions sent to your email.');
        }
      } else {
        const errorText = await response.text();
        setError(errorText || 'Failed to send email.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred.');
    }
  };
  
  

  return (
    <div className="primaryDiv w-[90%] sm:w-[70%] md:w-[50%] lg:w-[30%] p-6 px-12 mx-auto mt-10 rounded-lg shadow-lg font-semibold">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:gap-6">
        <FaLockOpen
          size={100}
          color="white"
          className="text-center my-5 self-center"
        />
        <h2 className="text-black text-2xl text-center mb-4">
          Reset Your Password
        </h2>
        <div>
          <div className="relative flex items-center justify-between rounded-lg">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              type="email"
              placeholder="Email"
              className="placeholder-slate-700 font-semibold w-full bg-transparent rounded-lg focus:outline-none"
              required
            />
            <MdEmail size={24} />
          </div>
          <div className="h-[0.075rem] mt-2 bg-black"></div>
        </div>
        {message && <p className="text-center text-green-600">{message}</p>}
        {error && <p className="text-center text-red-600">Error in sending mail, try later</p>}
        <button className="rounded-lg py-2 px-4 mx-auto bg-gray-800 text-white">
          Send Email
        </button>
        <Link to={"../signin"} className="text-center">
          Remember your password? Sign In
        </Link>
      </form>
    </div>
  );
};

export default ForgotPassword;
