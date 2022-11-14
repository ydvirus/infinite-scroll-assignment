import { Routes, Route } from 'react-router-dom';
import * as React from 'react';
import './App.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import { AuthProvider } from './utils/auth';
import { RequireAuth } from './utils/RequireAuth';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
