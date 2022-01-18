import React, { useState, useEffect } from 'react';
import './App.css';
import RingLoader from "react-spinners/RingLoader";
 
function Spacetagram() {
  const[loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    setTimeout( () => {
      setLoading(false)
    },1500)
  }, [])

  const [data, setData] = useState([]);
  const url = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=fhaz&api_key=Vh2Rna2q29xW1udPeJLmGz6TATlHcry1mjk1CH0U";

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      console.log(json);
      setData(json.photos);
    } catch (error) {
      console.log("error", error);
    }
  }
  const like = (index) => {
    if (data[index].like === undefined || data[index].like === false) {
      data[index].like = true;
    }
    else {
      data[index].like = false;
    }

    console.log(data[index].like);

    setData([...data]);
  };

  const getLabel = (index) => {
    if (data[index].like) {
      return 'Unlike';
    }
    else {
      return 'Like';
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function loadImage(loading) {
    if (loading) {
      return <div className="load">
      <h1>The Rover images are loading......</h1>
      <RingLoader size={500} color={"#9c0101"} loading={loading} />
      </div>
    }
    else {
      return (<div className='container'>
        <header>Spacestagram</header>
        <a className ='nasalink'href='https://api.nasa.gov/'><h3> Brought to you by NASA's image API </h3></a>
        {
          data.map((photo, index) => {
            return <div className='img-box'>
             <a href='https://www.nasa.gov/topics/technology/index.html'><img src={photo.img_src} key={index} className='image' alt='' /> </a>
              <div className='des-container'>
                <h2> {photo.rover.name} - {photo.camera.full_name}</h2>
                <h4>{photo.earth_date}</h4>
                <button className='butt-like' onClick={() => like(index)}>{getLabel(index)} </button>
              </div>  
            </div>;
          })
        }

      </div>);
    }
  }


  return (
    <div className='loads'>
        {loadImage(loading)}
    </div>
  ); 
}

export default Spacetagram;