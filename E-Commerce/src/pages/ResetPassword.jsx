import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/reset-password/${token}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Error resetting password.');
    }
  };

  return (
    <div className="bg-[#cc80f9] w-[90%] sm:w-[30%] p-6 px-12 mx-auto mt-10 rounded-lg shadow-lg font-semibold">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <h2 className="text-black text-2xl text-center mb-4">Enter New Password</h2>
        <div className="relative flex items-center justify-between rounded-lg">
          <input
            name="password"
            type="password"
            placeholder="New Password"
            className="placeholder-slate-700 font-semibold w-full bg-transparent rounded-lg focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="h-[0.075rem] mt-2 bg-black"></div>
        {message && <p className="text-green-500 text-center">{message}</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        <button type="submit" className="rounded-lg py-2 px-4 mx-auto bg-gray-800 text-white">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
