import React, { useState, useEffect } from "react";

function Navbar() {
 


  const [lat, setlat] = useState(0);
  const [lon, setlon] = useState(0);
  const [dataw, setdataw] = useState({});
  const [inpval ,setval ] =useState('');
  const [cities,setcities ] =useState([]);
  var clat;
  var clong;

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
   

      fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=60efc753bb3e74b872e7cb9f105529fe`
    )
      .then((response) => response.json())
      .then((data) => setdataw(data.main))
      .catch((error) => console.error(error));
    
    
  },[]);
 
  const fetchapi = ( lat , lon )=>{
      fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=60efc753bb3e74b872e7cb9f105529fe`
    )
      .then((response) => response.json())
      .then((data) => setdataw(data.main))
      .catch((error) => console.error(error));
    }

  const getcities = async(event)=>{

    setval(event.target.value);
    try {
      const response = await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${event.target.value}`,
    { headers: {
    'X-RapidAPI-Key': '444ee46966msh18542d01dfcf30ep1a7e05jsn3d059f92d0bc',
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
    }
  }
    ); 
      const json = await response.json();
      setcities(json.data);
      console.log(cities)
  } catch (error) {
      // setcities(null);
      console.error('Failed to fetch cities:', error);
  }
  }
  function getlat(lat ,long) {

    console.log("Button clicked:",lat,long );
    fetchapi(lat,long); 
}
  
   

  return (
    <>
    
    
      <div className="text-xl flex flex-row justify-center mt-[10px]">
        <input value={inpval} type="text" className="border -black" onChange={getcities}></input>
        
     
        <div className="bg-black text-white rounded-full ml-[16px]">
          <div className=" px-[8px]">
            <button  onClick={fetchapi} >Search</button>
          </div>
        </div>
      </div>
         <div>
        
        {cities?.length > 0 ? cities.map(data => (
                
                    <h2> 
                    <button latitude="85" longitude="95" onClick={() => getlat(clat=data.latitude,clong=data.longitude)} >
                    <div className="border-b-[2px]" >
                    {data.name}

                    </div>

                     </button> </h2>
                   )) : <p>Loading cities...</p>}
        </div>
       


      <div className="flex flex-col rounded-full border-black border-[2px] mt-[100px]">
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
