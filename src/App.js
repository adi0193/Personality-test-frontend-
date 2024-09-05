// import React from 'react';
// import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
// import Register from '../src/pages/Register';
// import Login from '../src/pages/Login';
// import './App.css';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path='/' element={<Register/>}/>
//         <Route path='/signup' element={<Register/>}/>
//         <Route path='/login' element={<Login/>}/>
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import { Navigate, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Register';
import Home from './pages/Home';
import { useState } from 'react';
import RefrshHandler from './RefrshHandler';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }

  return (
    <div className="App">
      <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<PrivateRoute element={<Home />} />} />
      </Routes>
    </div>
  );
}

export default App;