import React from 'react'
import '../css/AboutPage.css';

import { RiArrowDropDownLine } from "react-icons/ri";
import Gamecard from '../components/Gamecard';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

function Aboutpage() {
  return (
    <div class="main">
      <h1>About the AUT Gamestore</h1>
      <p>This is a game store platform primarily for COMP710 game programming students to display the work they have done for the course.</p>
    </div>
  )
}

export default Aboutpage
