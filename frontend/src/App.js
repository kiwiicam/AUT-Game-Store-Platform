//imports
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//css
import './css/App.css';
//jsx pages
import Homepage from './pages/Homepage.jsx';
import Aboutpage from './pages/Aboutpage.jsx';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/about" element={<Aboutpage />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
