//imports
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//css
import './css/App.css';
//jsx pages
import Homepage from './pages/Homepage.jsx';
import Aboutpage from './pages/Aboutpage.jsx';
import Accountpage from './pages/Accountpage.jsx';
import Signup from './pages/Signup.jsx';
import Signin from './pages/Signin.jsx';
import Forgotpw from './pages/Forgotpw.jsx';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/about" element={<Aboutpage />} />
      <Route path="/account" element={<Accountpage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/forgotpw" element={<Forgotpw />} />
      
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
