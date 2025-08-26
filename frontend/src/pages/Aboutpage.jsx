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
      <p>This is a game store platform primarily for COMP710 game programming students to display the work they have done for the course. We hope that people from all walks of life can come and see the great work they have done and so the people behind the projects can prove their compitence in the field. Publishers can grow confidence in their abilities and get a sort of idea on how they performed by gaining feedback from an array of random users.</p>
      <img class="APImg" src="https://krikey-ai.ghost.io/content/images/size/w1200/2024/08/screen-shot-2.jpg" alt="" />
      <p class="FigureText">Picture of someones game.</p>
      <h1>About Us</h1>
      <p>This is our first real project ever for our capstone in our last year in our degree at AUT. We share empathy with the students whos work could be displayed here and support their journey with us.</p>
      <img class="APImg" src="https://s3.mordorintelligence.com/online-casual-games-market/online-casual-games-market-Online-Casual-Games-Market-Market-Share-by-Platform--2024-1750513864181.webp? Source: https://www.mordorintelligence.com/industry-reports/online-casual-games-market" alt="" />
      <p class="FigureText">Example Image.</p>
    </div>
  )
}

export default Aboutpage
