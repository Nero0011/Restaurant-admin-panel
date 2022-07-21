import React from 'react'
import Topbar from './components/Topbar/Topbar';
import Sidebar from './components/Sidebar/Sidebar';
import Home from './components/Home/Home';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Topbar />
      <div className='container'>
        <Sidebar />
        <div className='otherPages'>
          <Home />
        </div>
      </div>
    </div>
  );
}

export default App;
