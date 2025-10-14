import react from "react";
import "../css/Commentcard.css"
import { useEffect, useState } from "react";
import axios from "axios";
function Commentcard({ text, name,uid ,picsrc, date }) {
            const dateFormat =  new Date(date).toLocaleString('en-NZ');


        const [image, setImage] = useState();
  useEffect(() => {
    const getImage = async () => {
      //    if (picsrc == null || picsrc === undefined || picsrc === '') {
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
 //   }
  //  else
   // {
      //const image = picsrc;
    //  setImage(image); 
  //  }
  }
    getImage();
  }, []);
    return (
        <div className="comment-card">
            <div className="left-section">
                <div className="profile-pic">
                    <img src={picsrc} alt={name} />
                </div>

                <h2 className="small">{name}</h2>
            </div>
            <div className="right-section">
                <div className="comment-info">
                    <h3>Review by {name}</h3>

                    <h2>Date posted: {dateFormat}</h2>
                </div>
                <p>{text}</p>
            </div>

        </div>
    );
}

export default Commentcard
