import React, { useState, useEffect } from "react";
function Navbar() {
 


  const [lat, setlat] = useState(0);
  const [lon, setlon] = useState(0);
  const [dataw, setdataw] = useState({});
  const [inpval ,setval ] =useState('');
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setlat(position.coords.latitude);
        setlon(position.coords.longitude);
        console.log(`Latitude: ${lat}, Longitude: ${lon}`);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }

    
  },[]);
   const handlechange = (event) => {
    setval(event.target.value);
    console.log(inpval); 
  };
  const fetchapi = ( )=>{
      fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon=${lon}&appid=60efc753bb3e74b872e7cb9f105529fe`
    )
      .then((response) => response.json())
      .then((data) => setdataw(data.main))
      .catch((error) => console.error(error));

 
  }
  
   

  return (
    <>
      <div className="text-xl flex flex-row justify-center mt-[10px]">
        <input value={inpval} type="text" className="border -black" onChange={handlechange}   ></input>
        <div className="bg-black text-white rounded-full ml-[16px]">
          <div className=" px-[8px]">
            <button onClick={fetchapi} >Search</button>
          </div>
        </div>
      </div>

      <div className="flex flex-col rounded-full border-black border-[2px] mt-[10px]">
        <p>Temperature : {dataw.feels_like ?? "loading"}</p>
        <p>Temperature : {dataw.temp ?? "loading"}</p>
        <p>
          Temperature Range: {dataw.temp_min} K - {dataw.temp_max} K
        </p>

        <p>Pressure: {dataw.pressure} hPa</p>

        <p>Humidity: {dataw.humidity}%</p>
      </div>
    </>
  );
}
export default Navbar;
