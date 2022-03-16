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
let distance: number[];
let newres: any;
let check: any;
check = false;
let count = 0;
let count2 = 0;
let count3 = 0;
let maxcount3 = 0;
let pagenum: number;
pagenum = 1;


export default function SearchFood() {
  
    const [guest, setGuest] = useState<any>('test');
    const [restaurant, setRestaurant] = useState<any>('test');
    const [showrestaurant, setShowRestaurant] = useState<any>([]);
    const [query, setQuery] = useState("");
    const [food, setFood] = useState<any>('test');
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const [reload, setReload] = useState(false);
    const [reload2, setReload2] = useState<any>(false);
    const [reload3, setReload3] = useState<any>(false);
    const [countstate, setCountState] = useState<any>(0);
    const { Guest_ID }  = useParams();  
    const history = useHistory();

    let shoppingcart: any;
    let oneres: any;
    
    

    const fetching = async () => {
        const res = await RestaurantService.fetchGuestLocation(Guest_ID);
        storeguest = res;
        console.log(storeguest);
        setGuest(res);
    };

    const fetching2 = async () => {
        const res2 = await RestaurantService.fetchAllRestaurants();
        storeres = res2;
        numres = storeres.length;
        console.log(numres);
        console.log(storeres);
        setRestaurant(res2);
    };

    const fetching3 = async () => {
        console.log("fetch")
        setReload(!reload);
    };

    const fetching4 = async () => {
        const res3 = await RestaurantService.fetchAllFoods();
        storefood = res3;
        console.log(storefood);
        setFood(res3)
    };

    useEffect(() => {
        const googleMapScript = loadMapApi();
        googleMapScript.addEventListener('load', function () {
            setScriptLoaded(true);
        });
    }, []);

    useEffect(() => {
        
        fetching();

    }, []);

    useEffect(() => {
        
        fetching2();

    }, []);

    useEffect(() => {
        
        fetching3();

    }, []);

    useEffect(() => {
        
        fetching4();

    }, []);

    function wait(ms: any){
        var start = new Date().getTime();
        var end = start;
        while(end < start + ms) {
            end = new Date().getTime();
        }
    }

    function calcCrow(lat1: number, lon1: number, lat2: number, lon2: number) {
        var R = 6371;
        var dLat = toRad(lat2-lat1);
        var dLon = toRad(lon2-lon1);
        var newlat1 = toRad(lat1);
        var newlat2 = toRad(lat2);

        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(newlat1) * Math.cos(newlat2); 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c;
        return d;
    }

    function toRad(Value: number) {
        return Value * Math.PI / 180;
    }

    const caldis = async (item: any) => {
        if (scriptLoaded) {
            console.log(item);
            
            const directionsService = new google.maps.DirectionsService();
            
            await directionsService
                .route({
                    origin: new google.maps.LatLng((+item.latitude),(+item.longitude)),
                    destination: new google.maps.LatLng((+guest[0].latitude), (+guest[0].longitude)),
                    travelMode: google.maps.TravelMode.DRIVING,
                })
                .then(async (response) => {
                    console.log(response.routes[0].legs[0].distance?.value);
                    //console.log(response.routes[0].legs[0].duration?.value);
                    item.distance = (response.routes[0].legs[0].distance?.value!/1000);
                    item.duration = (Math.ceil(response.routes[0].legs[0].duration?.value!/60));
                                    
                })
                .catch((e) => console.log('error'));
            
            count3++;
            setCountState(count3);
        }

        
    }
    
    useEffect(() => {
        console.log(check);
        if (scriptLoaded) {
            if (storeres !== undefined && !check) {
                /*
                storeres.forEach((item: any) => {
                    
                    if (count < 10) {
                        caldis(item);
                        console.log(count);
                        count++; 
                    }
                       
                });
                */
                setRestaurant(storeres);
                check = true;
                console.log("testest");
            }   
        }
    }, [restaurant, scriptLoaded]);
    
    useEffect(() => {
        if (maxcount3 !== 0) {
            if (count3 === maxcount3) {
                console.log(newres);
                newres = newres.sort((a: any, b: any) => {
                    if (a.distance > b.distance) return 1;
                    if (a.distance < b.distance) return -1;
                    return 0;
                  });
                if (newres.length < ((pagenum-1)*5)+1) {
                    setShowRestaurant([]);
                    console.log("test____1");
                }
                else if (newres.length >= ((pagenum-1)*5)+5) {
                    let temprestaurant = newres.slice(((pagenum-1)*5),((pagenum-1)*5)+5);
                    setRestaurant(newres);
                    setShowRestaurant(temprestaurant)
                    console.log("test____2");
                }
                else {
                    let temprestaurant = newres.slice(((pagenum-1)*5),newres.length);
                    setRestaurant(newres);
                    setShowRestaurant(temprestaurant);
                    console.log("test____3");
                }
                maxcount3 = 0;
                console.log("test____");

            }
        }
        console.log(countstate);
        console.log("test count");
    }, [countstate])

    useEffect(() => {
        if (query !== "") {

            console.log(query);
            let newfood: any;
            let listres: string[];
            let foodinfo: {restaurant_id:string, food_name:string, url:string}[];
            foodinfo = [];
            listres = [];
            newfood = storefood.filter((post: any) => {
                if (post.food_name.toLowerCase().includes(query.toLowerCase())) {
                    if (listres.length > 0) {
                        if (!listres.includes(post.restaurant_id)) {
                            listres.push(post.restaurant_id);
                            foodinfo.push({restaurant_id: post.restaurant_id,food_name: post.food_name, url: post.url})
                        }
                    }
                    else {
                        listres.push(post.restaurant_id);
                        foodinfo.push({restaurant_id: post.restaurant_id,food_name: post.food_name, url: post.url})
                    }
                    
                    return post
                }
            })
            console.log(listres);
            console.log(newfood);
            console.log(foodinfo);

            newres = storeres.filter((post: any) => {
                if (listres.length > 0) {
                    if (listres.includes(post.restaurant_id)) {
                        let food_pos: any;
                        food_pos = foodinfo.findIndex(element => element.restaurant_id === post.restaurant_id);
                        post.food_name = foodinfo[food_pos].food_name;
                        post.food_url = foodinfo[food_pos].url;
                        return post;
                    }
                }
            })

            newres.forEach((item: any) => {                   
                let newdistance: number;
                newdistance = calcCrow(+guest[0].latitude, +guest[0].longitude, +item.latitude, +item.longitude);
                console.log(newdistance, item.store_name);
                item.newdis = newdistance;
            });

            newres = newres.sort((a: any, b: any) => {
                if (a.newdis > b.newdis) return 1;
                if (a.newdis < b.newdis) return -1;
                return 0;
              });

            console.log(newres);

            if (newres.length > 10) {
                newres = newres.slice(0, 10);
            }

            console.log(newres);
            count3 = 0;

            newres.forEach((item: any) => {                   
                if (item.distance === undefined && count2 < 10) {
                    caldis(item);
                    console.log(count2);
                    count2++; 
                    maxcount3 = count2;
                }
            });

            if (count2 > 0) {
                count2 = 0;
            }
            else {
                newres = newres.sort((a: any, b: any) => {
                    if (a.distance > b.distance) return 1;
                    if (a.distance < b.distance) return -1;
                    return 0;
                  });
                console.log(newres);
                setRestaurant(newres);
                console.log(restaurant);
            }       
        }
        else {
            if (storeguest !== undefined) {
                setRestaurant(storeres);
            }
                
            console.log(storeres);
        }
        
    }, [query]);



    function handleClick() {
        const win = window.open(`/Home`, "_self");
        win!.focus();
    }

    function handleClick2() {
        const win = window.open(`/Home/${Guest_ID}`, "_self");
        win!.focus();
    }

    const createShopping = async (restaurant_id: string) => {
        const res = await RestaurantService.fetchShoppingcart(restaurant_id,Guest_ID);
        shoppingcart = res;

        console.log(shoppingcart);

        const res2 = await RestaurantService.fetchRestaurants(restaurant_id);
        oneres = res2;

        console.log(oneres);
        
        
        if (shoppingcart === "test" || shoppingcart === undefined || shoppingcart.restaurant_id === "000000000000000000000000") {
            let shoplist: {food_id: string, number: number}[];
            shoplist = [];

            oneres.restaurant_info.food_list.forEach((item: any) => {
                shoplist.push({food_id: item.food_id, number: 0});            
            });

            const sendOption = {
                "restaurant_id": restaurant_id,
                "shopping_list": shoplist,
                "price_list": {"price_lm": 0, "price_gb": 0,"price_rb": 0,"price_fp": 0},
                "distance": 0,
                "delivery_fee": {"price_lm": 0, "price_gb": 0,"price_rb": 0,"price_fp": 0},
                "delivery_time": 0,
                "guest_id": Guest_ID
            };


            console.log(sendOption);
            const res3 = await fetch(`${baseUrl}/shoppingcart`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(sendOption)
            });
            console.log(res3);

            const res4 = await RestaurantService.fetchShoppingcart(restaurant_id,Guest_ID);
            shoppingcart = res4;

            console.log(shoppingcart);


            
            const sendOption2 = {
                "cart_id": shoppingcart.shoppingcart_id,
                "price_lm": 0,
                "price_gb": 0,
                "price_rb": 0,
                "price_fp": 0
            };

            
            console.log(sendOption2);
            
            const res5 = await fetch(`${baseUrl}/finalprice`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(sendOption2)
            });
            console.log(res5);

            const win = window.open(`https://localhost:35000/Restaurant/${restaurant_id}/${Guest_ID}`, "_blank");
            win!.focus();
            
        }
        else {
            console.log("test2");
            const win = window.open(`https://localhost:35000/Restaurant/${restaurant_id}/${Guest_ID}`, "_blank");
            win!.focus();
            
        }
        
    };

    let up = "=>";
    let down = "<=";

    function handleClick4() {
        if (restaurant !== undefined && restaurant !== 'test') {
            if (restaurant.length > ((pagenum-1)*5)+5 && restaurant.length !== numres) {
                pagenum++;
                setReload2(!reload2);
            }
        }
    }

    function handleClick5() {
        if (pagenum > 1) {
            pagenum--;
            setReload2(!reload2);
        }
    }

    useEffect(() => {
        if (restaurant !== 'test' && restaurant !== undefined) {
            console.log(restaurant);
            if (restaurant.length < ((pagenum-1)*5)+1) {
                setShowRestaurant([]);
            }
            else if (restaurant.length >= ((pagenum-1)*5)+5) {
                let temprestaurant = restaurant.slice(((pagenum-1)*5),((pagenum-1)*5)+5);
                setShowRestaurant(temprestaurant)
            }
            else {
                let temprestaurant = restaurant.slice(((pagenum-1)*5),restaurant.length);
                setShowRestaurant(temprestaurant);
            }
            
        }
    }, [pagenum, restaurant, reload3]);

    if (restaurant !== 'test' && restaurant !== undefined && guest !== 'test' && guest !== undefined && showrestaurant !== undefined && showrestaurant !== 'test') {
        return  (
            <div className='picHome3'>    
                <div className="content">  
                    DeliCompare 
                </div>
                <div className="content3">  
                    การค้นหาด้วยชื่อเมนูอาหาร
                </div>
                <button className="buttonhome" onClick={handleClick}> Home </button>
                <button className="buttonmap2" onClick={handleClick2}> แผนที่ของคุณ </button>
                <input className='searchrestaurant2' placeholder="โปรดใส่ชื่อเมนูอาหารที่ต้องการ" onChange={event => setQuery(event.target.value)} />
                <button className="buttonpageup2" onClick={handleClick4}> {up} </button>
                <button className="buttonpagedown2" onClick={handleClick5}> {down} </button>
                <div className="page2"> หน้าที่ {pagenum} </div>

                <table className="custom2">
                        <tr>
                            <th className="custom3">
                                <span className="FoodH">ผลการค้นหา {(restaurant.length === numres) ? 0 : restaurant.length} ร้านอาหาร</span>
                            </th>
                        </tr>
                </table>
                <table className="custom3">
                        <tr>
                            <th className="custom3">
                                <span className="FoodH">ชื่อร้านอาหาร</span>
                            </th>
                            <th className="custom3">
                                <span className="FoodH">ชื่อเมนูอาหาร</span>
                            </th>
                            <th className="custom3">
                                <span className="FoodH">ภาพเมนูอาหาร</span>
                            </th>
                            <th className="custom3">
                                <span className="FoodH">ระยะทาง</span>
                            </th>
                            <th className="custom3">
                                <span className="FoodH">เวลาในการส่ง</span>
                            </th>
                            <th className="custom3">
                                <span className="FoodH">ดูเมนูและราคาอาหาร</span>
                            </th>
                        </tr>
                        
                        {(restaurant.length === numres) ? (<div></div>) : showrestaurant.map((item: any) => (
                            <tr className='searchres'>
                                <td style={{
                                        width: '20%',
                                        backgroundImage: 'url(' + 'http://localhost:3000/images/ResBG.jpg' + ')',
                                        backgroundSize: '100% 100%',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center',
                                        border: '0.5vw ridge #4F7849',
                                    }}> 
                                    {item.store_name}
                                </td>
                                <td style={{
                                        width: '20%',
                                        backgroundImage: 'url(' + 'http://localhost:3000/images/ResBG.jpg' + ')',
                                        backgroundSize: '100% 100%',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center',
                                        border: '0.5vw ridge #4F7849',
                                    }}> 
                                    {item.food_name}
                                </td>
                                <td style={{
                                       
                                        backgroundImage: 'url(' + item.food_url + ')',
                                        backgroundSize: '100% 100%',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center',
                                        border: '0.5vw ridge #4F7849',
                                    }}> 
                                </td>
                                <td style={{
                                        width: '10%',
                                        border: '0.5vw ridge #4F7849',
                                        backgroundColor: '#CEE0CC'
                                    }}> 
                                    {item.distance} กิโลเมตร
                                </td>
                                <td style={{
                                        width: '10%',
                                        border: '0.5vw ridge #4F7849',
                                        backgroundColor: '#CEE0CC'
                                    }}> 
                                    {item.duration} นาที
                                </td>
                                <td style={{
                                        width: '10%',
                                        border: '0.5vw ridge #4F7849',
                                    }}>
                                    <button className='buttonsearchres' onClick={() => createShopping(item.restaurant_id)}> กดที่นี่ </button>
                                </td>
                            </tr>   
                        ))}      
                </table>
            </div>
        );
    }
    else {
        return (
            <div > 
                 
            </div>
        )
    }
    

}


