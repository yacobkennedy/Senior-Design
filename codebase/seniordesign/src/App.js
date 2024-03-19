import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Layout from './pages/Layout';
import Signup from './pages/Signup';

function App() {
  return (
    <div className='appcontainer'>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />}/> 
            <Route path="login" element={<Login />}/>
            <Route path="signup" element={<Signup />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
