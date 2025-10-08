import react from "react";
import "../css/Commentcard.css"
import { useEffect, useState } from "react";
import axios from "axios";
function Commentcard({ text, name,uid ,picsrc, date }) {
  console.log(uid);
  console.log("-----------");
  console.log("-----------");
  console.log("-----------");
  console.log("-----------");
  console.log("-----------");

        const [image, setImage] = useState();
  useEffect(() => {
    const getImage = async () => {
      try {
        const image = await axios.post(`http://localhost:8000/api/storage/getpfp`,
          {
            type: 'uid',
            id: uid
          })
        setImage(image.data.imageUrl);
      }
      catch (err) {
        alert(err.message);
      }
  }
    getImage();
  }, []);
    return (
        <div className="comment-card">
            <div className="left-section">
                <div className="profile-pic">
                    <img src={image} alt={name} />
                </div>

                <h2 className="small">{name}</h2>
            </div>
            <div className="right-section">
                <div className="comment-info">
                    <h3>Review by {name}</h3>
                    <h2>Date posted: {date}</h2>
                </div>
                <p>{text}</p>
            </div>

        </div>
    );
}

export default Commentcard
