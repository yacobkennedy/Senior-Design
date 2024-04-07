import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Layout from './pages/Layout';
import Signup from './pages/Signup';
import Search  from './pages/Search';
import Location from './pages/Location';

function App() {
  return (
    <div className='appcontainer'>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />}/> 
            <Route path="login" element={<Login />}/>
            <Route path="signup" element={<Signup />}/>
            <Route path="search" element={<Search />}/>
            <Route path="location" element={<Location />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
