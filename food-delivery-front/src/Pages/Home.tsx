import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router";
import '../CSSsource/Home.css'
import '../CSSsource/Map.css'
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Geocode from "react-geocode";
import Autocomplete from 'react-google-autocomplete';
import { Descriptions } from 'antd';
import HomeMap from './HomeMap/';
import {loadMapApi} from "./utils/GoogleMapsUtils";
import { baseUrl } from "../config/constant";
import { openPersonalButton } from './tab';
import RestaurantService from '../service/RestaurantService';

const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel");

  

Geocode.setApiKey(`${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`);
Geocode.enableDebug();

interface Loc {
  latitude: number;
  longitude: number;
}


export default function Home() {
  
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [distanceInKm, setDistanceInKm] = useState<number>(-1);
  const [location, setLocation] = useState<Loc>();
  const [guest, setGuest] = useState<any>('test');
  const history = useHistory();
  let newguest: any;

  useEffect(() => {
        const googleMapScript = loadMapApi();
        googleMapScript.addEventListener('load', function () {
            setScriptLoaded(true);
        });
  }, []);

  const renderlocation = () => {
        return (
            <div className='location'>
                {`latitude is ${location?.latitude} and longitude is ${location?.longitude}`}
            </div>
        );
  };

  const fetching = async () => {
    if (location?.latitude === undefined || location?.longitude === undefined) {
      console.log("lat undefine");
    }
    else {
      const result = await RestaurantService.fetchGuestByLatLng(location?.latitude,location?.longitude);
      newguest = result;

      console.log(newguest);
          
      if (newguest[0].guest_id === "000000000000000000000000") {

        const sendOption = {
            "latitude": location?.latitude.toString(),
            "longitude": location?.longitude.toString()
        };

        console.log(sendOption);

        const res = await fetch(`${baseUrl}/guest`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(sendOption)
        });
        console.log(res);

        const res2 = await RestaurantService.fetchGuestByLatLng(location?.latitude,location?.longitude);
        newguest = res2;

        console.log(newguest);
        //history.push(`/Home/${newguest[0].guest_id}`);
        const win = window.open(`/Home/${newguest[0].guest_id}`, "_self");
        win!.focus();
      }
      else {
        //history.push(`/Home/${newguest[0].guest_id}`);
        const win = window.open(`/Home/${newguest[0].guest_id}`, "_self");
        win!.focus();
      }
    }
    
    
  };

  
  return  (
      <div className='picHome'>    
          <button className="buttonconfirm" onClick={fetching}> ยืนยันตำแหน่งจัดส่ง </button>
          
          <div className="content">  
              DeliCompare
          </div>
          
          {scriptLoaded && (
                    <HomeMap
                      mapType={google.maps.MapTypeId.ROADMAP}
                      mapTypeControl={true}
                      setLocation={setLocation}
                    />
          )}
                
          
          
          { scriptLoaded && <input id="autocomplete" className='searchbar' placeholder='โปรดใส่ที่อยู่จัดส่ง' type="text" size={50}></input> }
          
          

      </div>
      
      
  );

}