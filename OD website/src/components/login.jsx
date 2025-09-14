import React from "react";

export default function Login({ register, setRegister, password, setPassword, onLogin }) {
  function handleSubmit(e) {
    e.preventDefault();
    if (!register.trim() || !password.trim()) {
      alert("Please enter both Register Number and Password");
      return;
    }
    onLogin(); // move to main stage
  }

  return (
    <div className="bg-neutral-900/50 p-10 rounded-3xl max-w-lg mx-auto mt-20 shadow-xl">
      <h2 className="text-2xl font-bold text-center mb-6 text-white drop-shadow-lg">
        Student Login
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm text-neutral-300 mb-1">Register Number</label>
          <input
            type="text"
            value={register}
            onChange={(e) => setRegister(e.target.value)}
            placeholder="Enter your register number"
            className="w-full p-3 rounded-xl bg-neutral-800 text-white outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block text-sm text-neutral-300 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full p-3 rounded-xl bg-neutral-800 text-white outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-purple-600 hover:bg-purple-700 transition-colors text-white font-bold py-3 rounded-xl shadow-lg"
        >
          Login
        </button>
      </form>
      <p className="text-center mt-4 text-neutral-400 text-sm">
        (Demo only — not connected to VITStudent)
      </p>
    </div>
  );
}
