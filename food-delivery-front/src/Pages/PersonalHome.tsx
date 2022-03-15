import React, { useEffect, useState } from 'react';
import '../CSSsource/Home.css'
import '../CSSsource/Map.css'
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Geocode from "react-geocode";
import Autocomplete from 'react-google-autocomplete';
import { Descriptions } from 'antd';
import Map from './Map/';
import {loadMapApi} from "./utils/GoogleMapsUtils";
import { useHistory, useParams } from "react-router";
import RestaurantService from "../service/RestaurantService";
import { baseUrl } from '../config/constant';

const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel");

Geocode.setApiKey(`${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`);
Geocode.enableDebug();

interface Loc {
  latitude: number;
  longitude: number;
}

let storeres: any;
let storeguest: any;
let storefood: any;
let numres: any;

export default function PersonalHome() {
  
    const [guest, setGuest] = useState<any>('test');
    const [restaurant, setRestaurant] = useState<any>('test');
    const [food, setFood] = useState<any>('test');
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const [distanceInKm, setDistanceInKm] = useState<number>(-1);
    const [location, setLocation] = useState<Loc>();
    const [query, setQuery] = useState("");
    const [query2, setQuery2] = useState("");
    
    const { Guest_ID }  = useParams();  
    const history = useHistory();
    let refresh: boolean;
    refresh = false;

    useEffect(() => {
            const googleMapScript = loadMapApi();
            googleMapScript.addEventListener('load', function () {
                setScriptLoaded(true);
            });
    }, []);

    const renderlocation = () => {
            return (
                <div className='location'>
                    {`latitude is ${location?.latitude} and longtitude is ${location?.longitude}`}
                </div>
            );
    };

    const fetching = async () => {
        const res = await RestaurantService.fetchGuestLocation(Guest_ID);
        storeguest = res;
        console.log(storeguest);
        setGuest(res);
        const res2 = await RestaurantService.fetchAllRestaurants();
        storeres = res2;
        numres = storeres.length;
        console.log(numres);
        console.log(storeres);
        setRestaurant(res2);
        console.log(restaurant);
        const res3 = await RestaurantService.fetchAllFoods();
        storefood = res3;
        console.log(storefood);
        setFood(res3)
        console.log("fetch")

    };

    useEffect(() => {
        
        fetching();

        
    }, []);

    useEffect(() => {
        if (query2 === "") {
            if (query !== "") {
                console.log(query);
                let newres: any;
                newres = storeres.filter((post: any) => {
                    if (post.store_name.toLowerCase().includes(query.toLowerCase())) {
                        return post
                    }
                })
                console.log(newres);
                setRestaurant(newres);
                console.log(restaurant);
                
            }
            else {
                if (storeguest !== undefined) {
                    setRestaurant(storeres);
                }
                
                console.log(storeres);
            }
        }
        
    }, [query]);

    useEffect(() => {
        if (query === "") {
            if (query2 !== "") {
                console.log(query2);
                let newfood: any;
                let listres: string[];
                listres = [];
                newfood = storefood.filter((post: any) => {
                    if (post.food_name.toLowerCase().includes(query2.toLowerCase())) {
                        if (listres.length > 0) {
                            if (!listres.includes(post.restaurant_id)) {
                                listres.push(post.restaurant_id);
                            }
                        }
                        else {
                            listres.push(post.restaurant_id);
                        }
                        
                        return post
                    }
                })
                console.log(listres);
                console.log(newfood);
                let newres: any;
                newres = storeres.filter((post: any) => {
                    if (listres.length > 0) {
                        if (listres.includes(post.restaurant_id)) {
                            return post;
                        }
                    }
                })
                console.log(newres);
                setRestaurant(newres);
                console.log(restaurant);
            }
            else {
                if (storeguest !== undefined) {
                    setRestaurant(storeres);
                }
                
                console.log(storeres);
            }
        }
        
    }, [query2]);


    function handleClick() {
        //history.push(`/Home`);
        const win = window.open(`/Home`, "_self");
        win!.focus();
    }

    function handleClick2() {
        //history.push(`/Home/${ Guest_ID }/search/restaurant`);
        const win = window.open(`/Home/${ Guest_ID }/search/restaurant`, "_self");
        win!.focus();
    } 

    function handleClick3() {
        //history.push(`/Home/${ Guest_ID }/search/food`);
        const win = window.open(`/Home/${ Guest_ID }/search/food`, "_self");
        win!.focus();
    }

    

    return  (
        <div className='picHome2'>    
            <div className="content2">  
                DeliCompare 
            </div>
            <button className="buttonhome" onClick={handleClick}> Home </button>
            <button className="buttonsearch" onClick={handleClick2}> ค้นหาร้านอาหาร </button>
            <button className="buttonsearch2" onClick={handleClick3}> ค้นหาเมนูอาหาร </button>
            <input className='searchrestaurant' placeholder="โปรดใส่ชื่อร้านอาหารที่ต้องการ" onChange={event => setQuery(event.target.value)} />
            <input className='searchfood' placeholder="โปรดใส่ชื่อเมนูอาหารที่ต้องการ" onChange={event => setQuery2(event.target.value)} />
            
                {scriptLoaded && guest !== 'test' && restaurant !== 'test' && (
                        <Map
                        mapType={google.maps.MapTypeId.ROADMAP}
                        mapTypeControl={true}
                        restaurant={restaurant}
                        guest={guest}
                        history={history}
                        numres={numres}
                        />
                    )}
                    
            
        </div>
    );

}


