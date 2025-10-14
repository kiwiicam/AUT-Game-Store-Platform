import React from "react";
import "../css/Aboutpage.css";

const Aboutpage = () => {
  return (
    <div className="about-page">
      {/* Top Section */}
      <section className="about-hero">
        <div className="about-container">
          <h1 className="about-title">About the Game Store</h1>
          <hr className="about-divider" />
          <p className="about-description">
            The game store showcases projects developed within <strong>COMP710 - Game Programming</strong>, a third-year 
            level 7 course offered at <strong>Auckland University of Technology (AUT)</strong>. This paper forms part of 
            the <strong>Software Development</strong> major, following the <strong>Game Development</strong> pathway. Throughout the 
            semester, students complete two core projects – an <strong>individual game (IGP)</strong> and a <strong>group 
            project (TGP)</strong>. Both projects are built using a custom <strong>C++ game framework</strong>, collaboratively 
            developed during the first weeks of the course.
          </p>
        </div>
      </section>

      {/* Game Framework Section */}
      <section className="framework-section">
        <div className="about-container framework-grid">
          <div className="framework-text">
            <h2>Game Framework</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet
              est nec felis cursus consequat in sed sem. Proin orci ante, dapibus at urna
              nec, posuere sollicitudin diam. Curabitur ullamcorper metus odio, non
              scelerisque justo egestas suscipit. Etiam sollicitudin nisl eu placerat
              mattis. Pellentesque placerat leo et tortor vestibulum finibus. Donec et
              lorem vel lectus aliquam accumsan. Suspendisse eget aliquet odio.
            </p>
            <p>
              Mauris sit amet est nec felis cursus consequat in sed sem. Proin orci ante,
              dapibus at urna nec, posuere sollicitudin diam. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit.
            </p>
          </div>
          <div className="framework-image">
            <div className="image-placeholder">Related Image</div>
          </div>
        </div>
      </section>

      {/* Project Section */}
      <section className="project-section">
        <div className="about-container project-grid">
          <div className="project-card">
            <h3>Project 1</h3>
            <p className="project-sub">Individual Game Project (IGP)</p>
            <hr />
            <p>
              Students are tasked with creating a complete 2D game individually using the game framework and supporting middleware. This project challenges students to apply key programming principles such as object-oriented programming, real-time simulation, graphics rendering, audio integration, and AI behaviour. Development follows a structured production pipeline – including pre-production design documentation, iterative development milestones, and a post-production reflection – simulating a professional game development process.
            </p>
          </div>

          <div className="project-card">
            <h3>Project 2</h3>
            <p className="project-sub">Team Game Project (TCG)</p>
            <hr />
            <p>
              Groups of 4-5 students collaborate to design an original 2D game using the game framework and more additional supporting middleware. This project aims to simulate an authentic production environment, with each team member responsible for a distinct gameplay or technical feature. This project, unlike the project 1, follows a full production cycle – from pre-production design and documentation to weekly development milestones and a final build showcase.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="timeline">
          <div className="timeline-line"></div>

          <div className="timeline-event" style={{ left: "5%" }}>
            <div className="dot"></div>
            <p>Week 1</p>
          </div>

          <div className="timeline-event" style={{ left: "25%" }}>
            <div className="dot"></div>
            <p>Week 4</p>
          </div>

          <div className="timeline-event" style={{ left: "45%" }}>
            <div className="dot"></div>
            <p>Week 6</p>
          </div>

          <div className="timeline-event" style={{ left: "65%" }}>
            <div className="dot"></div>
            <p>Week 9</p>
          </div>

          <div className="timeline-event" style={{ left: "80%" }}>
            <div className="dot"></div>
            <p>Week 10</p>
          </div>

          <div className="timeline-event" style={{ left: "93%" }}>
            <div className="dot"></div>
            <p>Week 13</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Aboutpage;
