import React from "react";
import "../css/Developercard.css"
function Developercard({ name, age, picture, about, projects, email, phone, skills, link, forGame }) {
    return (
        <div className="developer-card">
            <div className="upper-card">
                <div className="student-pic">
                    <img src={picture}></img>
                </div>

                <div className="name-age">
                    <h1>{name}</h1>
                    <h2>{age}</h2>
                </div>
            </div>
            <h2>About me</h2>
            <div className="skinny-grey-line"></div>
            <p>{about}</p>
            <h2>Projects</h2>
            <div className="skinny-grey-line"></div>
            {forGame ?
                <div className="dev-project">
                    {projects.map((project, i) => (
                        <div key={i} className="project">
                            <img src={project.src} alt={project.name} />
                        </div>
                    ))}
                </div> :
                <div className="dev-project">
                    <div className="no">
                        <h2>
                            Games you are tagged in will appear on your developer cards
                        </h2>
                    </div>
                    <div className="no">
                        <h2>
                            Games you are tagged in will appear on your developer cards
                        </h2>
                    </div>
                </div>

            }
            <div className="email-div"><h2>Email</h2> <h2>{email}</h2></div>
            <div className="skinny-grey-line"></div>
            <div className="email-div"><h2>Phone</h2> <h2>{phone}</h2></div>
            <div className="skinny-grey-line"></div>
            <div className="email-div"><h2>Skills</h2></div>
            <div className="skinny-grey-line"></div>
            <div className="skills-div">
                <div className="upper-skills">
                    <h2>{skills[0]}</h2>
                    <h2>{skills[1]}</h2>
                </div>
                <div className="lower-skills">
                    <h2>{skills[2]}</h2>
                    <h2>{skills[3]}</h2>
                </div>
            </div>
            <div className="skinny-grey-line"></div>
            <div className="button-con" onClick={() => window.open(link, '_blank').focus()}>
                <button className="port-button">View portfolio</button>
            </div>


        </div>
    )
}

export default Developercard