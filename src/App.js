import React from 'react';
import Navbar from './components/common/navbar';

function App() {
  return (
    <div>
      <Navbar/>
      <main className="p-6">
        <h1 className="text-2xl font-semibold text-gray-800">Welcome to the MTN Tracking System</h1>
      </main>
    </div>
  );
}

export default App;
