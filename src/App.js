import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const accessKey = ""; // add your unsplash access key here

  const fetchImages = async () => {
    try {
      const response = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${text}&client_id=${accessKey}`);
      const data = await response.json();
      const results = data.results;
      setImages(results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (text.trim() !== "") {
      fetchImages();
    }
  }, [text]);

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-sm">
            <input
              type="text"
              className="search"
              placeholder="Type to search"
              onChange={(e) => setText(e.target.value)}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 frame">
            <p className="result">RESULTS :</p>
            {images.map((image) => (
              <img key={image.id} src={image.urls.small} alt={image.alt_description} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
