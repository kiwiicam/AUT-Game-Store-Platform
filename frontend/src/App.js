//imports
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//css
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css';
import './css/Global.css'
//jsx pages
import Homepage from './pages/Homepage.jsx';
import Aboutpage from './pages/Aboutpage.jsx';
import Accountpage from './pages/Accountpage.jsx';
import Signup from './pages/Signup.jsx';
import Signin from './pages/Signin.jsx';
import Forgotpw from './pages/Forgotpw.jsx';
import VerifyEmail from './pages/VerifyEmail.jsx';
import Header from './components/Header.jsx';
import HeaderLayout from './components/HeaderLayout.jsx';
import Gamepage from './pages/Gamepage.jsx';
import Browse from './pages/Browse.jsx';
import GamepageAdmin from './pages/GamepageAdmin.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*Routes with header*/}
        <Route element={<HeaderLayout />}>
          <Route path="/browse" element={<Browse />}/>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<Aboutpage />} />
          <Route path="/account" element={<Accountpage />} />
          <Route path="*" element={<h1 style={{ color: 'red', marginTop: '100px' }}>404 Not Found</h1>} />
          <Route path="/games/:gameName" element={<Gamepage />} />
          <Route path="/admin/:gameName" element={<GamepageAdmin />} />
        </Route>
        {/*Routes without header (all auth routes)*/}
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/forgotpw" element={<Forgotpw />} />
        <Route path="/verify" element={<VerifyEmail />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
