import React from 'react'
import '../css/AboutPage.css';

import { RiArrowDropDownLine } from "react-icons/ri";
import Gamecard from '../components/Gamecard';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

function Aboutpage() {
  return (
    <div class="main">
      <h1>Purpose of the AUT Gamestore</h1>
      <p>This website is used to present the workings done by the students of COMP710 Game Programming. Our goal is to properly credit and display not only the authors and their work but their effort, time and tools used while making them. We hope that we may present the culmination of all the students' work done over the semester for future game developers or potential employers to see.</p>

      <h1>The Course:</h1>
      <p>The students are tasked with making a personal portfolio showing their work done in both an individual and group game programming assignment. They learn the theory and practical skill to not only create interactive media but the backend engine that runs it. Throughout the semester they learn key teamwork and management skills while being under a heavy time restraint causing development in their time management. They are taught about the relevant industry and its history, the standards within the industry and the culture that comes with it. The portfolio they make will show their technical and creative growth throughout the course and the outcomes of their individual and team assignments will further prove their capabilities and growth.</p>

      <h1>About Us</h1>
      <p>As third year students of computer and information sciences at AUT. We each chose to take this project for our capstone project. Each of us specialise in slightly different roles and reflected as much within the creation of the gamestore. Some of us have experience in the related course giving us more personal motivation when making the gamestore. It has been great experience for our future careers in whatever we do next. - Campbell Boulton, Joshua Knight, Blaine McDonald, Carne Soper, Sian Villeren.</p>

    </div>
  )
}

export default Aboutpage
