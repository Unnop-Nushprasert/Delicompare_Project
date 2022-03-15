import { AutoComplete, AutoCompleteProps } from 'antd';
import { mainModule, platform } from 'process';
import React, {useEffect, useRef, useState} from 'react';
import { useHistory } from 'react-router';
import { baseUrl } from '../../config/constant';
import RestaurantService from '../../service/RestaurantService';
import './Map.scss';
import { MarkerClusterer } from "@googlemaps/markerclusterer";

interface IMap {
    mapType: google.maps.MapTypeId;
    mapTypeControl?: boolean;
    restaurant: any;
    guest: any;
    history: any;
    numres: any;
}

interface IMarker {
    address: string;
    latitude: number;
    longitude: number;
}

type GoogleLatLng = google.maps.LatLng;
type GoogleMap = google.maps.Map;
type GoogleMarker = google.maps.Marker;
type GooglePolyline = google.maps.Polyline;

let Markers: GoogleMarker[];
Markers = [];
let markerClusterer: any;
let newres: any;

const Map: React.FC<IMap> = ({ mapType, mapTypeControl = false, restaurant, guest, history, numres}) => {

    console.log(guest);
    console.log(restaurant);
    const ref = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<GoogleMap>();
    const [marker, setMarker] = useState<IMarker>();
    const [homeMarker, setHomeMarker] = useState<GoogleMarker>();
    const [googleMarkers, setGoogleMarkers] = useState<GoogleMarker[]>([]);
    const [listenerIdArray, setListenerIdArray] = useState<any[]>([]);
    const [LastLineHook, setLastLineHook] = useState<GooglePolyline>();
    const [searchplace, setSearchPlace] = useState<string>("");
    let shoppingcart: any;
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({suppressMarkers: true});
    

    const startMap = (): void => {
        if (!map && guest !== 'test' && restaurant !== 'test') {
            defaultMapStart();
        } 
    };
    useEffect(startMap, [map]);

    const defaultMapStart = (): void => {
        const defaultAddress = new google.maps.LatLng((+guest[0].latitude), (+guest[0].longitude));
        initMap(15, defaultAddress);
    };


    useEffect(() => {
        if (restaurant.length !== numres) {
            console.log("check1");
            Markers.forEach((item: any) => {
                item.setVisible(false);
            });
            markerClusterer.clearMarkers();
            restaurant.forEach((item: any) => {             
                Markers[item.pos].setVisible(true);
                markerClusterer.addMarker(Markers[item.pos]);
            });
        }
        else {
            markerClusterer.clearMarkers();
            Markers.forEach((item: any) => {
                item.setVisible(true);
                markerClusterer.addMarker(item);
            });
            console.log("check2");
        }
        newres = restaurant;
        console.log(newres);
        console.log(restaurant);
    }, [restaurant]);


    useEffect(() => {
        if (map) {
            addMarker();
            let i = 0;
            for (i; i < restaurant.length; i++) {
                addResMarker(i);
            }
            
            map.addListener('zoom_changed', () => {
                console.log(newres);
                if (newres.length !== numres) {
                    console.log("check3");
                    Markers.forEach((item: any) => {
                        item.setVisible(false);
                    });
                    markerClusterer.clearMarkers();
                    newres.forEach((item: any) => {             
                        Markers[item.pos].setVisible(true);
                        markerClusterer.addMarker(Markers[item.pos]);
                    });
                    
                }
                else {
                    markerClusterer.clearMarkers();
                    Markers.forEach((item: any) => {
                        item.setVisible(true);
                        markerClusterer.addMarker(item);
                    });
                    console.log("check4");
                }
            });

            //new MarkerClusterer({ markers: Markers, map: map });
        }
    }, [map]);

    const infoWindow = new google.maps.InfoWindow();


    const addMarker = (): void => {
        const marker:GoogleMarker = new google.maps.Marker({
            position: new google.maps.LatLng((+guest[0].latitude), (+guest[0].longitude)),
            map: map,
            icon: {
                url: 'http://localhost:3000/images/DesIcon.png',
                scaledSize: new google.maps.Size(50, 50)
            },
            //label: "DEST",
            title: "ตำแหน่งนี้คือที่อยู่จัดส่งของคุณ",
            animation: google.maps.Animation.DROP
        });

        const listenerId = marker.addListener('click', () => {
            infoWindow.close();
            infoWindow.setContent(marker.getTitle());
            infoWindow.open(marker.getMap(), marker);
            if (marker.getAnimation() !== null) {
                marker.setAnimation(null);
            } else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
                setTimeout(() => marker.setAnimation(null), 1000);
            }

        });


    };

    
    const createShopping = async (num: number) => {
        
        const res = await RestaurantService.fetchShoppingcart(restaurant[num].restaurant_id,guest[0].guest_id);
        shoppingcart = res;

        console.log(shoppingcart);
        
        if (shoppingcart === "test" || shoppingcart === undefined || shoppingcart.restaurant_id === "000000000000000000000000") {
            let shoplist: {food_id: string, number: number}[];
            shoplist = [];

            console.log(restaurant);
            restaurant[num].food_list.forEach((item: any) => {
                shoplist.push({food_id: item.food_id, number: 0});            
            });

            const sendOption = {
                "restaurant_id": restaurant[num].restaurant_id,
                "shopping_list": shoplist,
                "price_list": {"price_lm": 0, "price_gb": 0,"price_rb": 0,"price_fp": 0},
                "distance": 0,
                "delivery_fee": {"price_lm": 0, "price_gb": 0,"price_rb": 0,"price_fp": 0},
                "delivery_time": 0,
                "guest_id": guest[0].guest_id 
            };


            console.log(sendOption);
            const res2 = await fetch(`${baseUrl}/shoppingcart`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(sendOption)
            });
            console.log(res2);

            const res3 = await RestaurantService.fetchShoppingcart(restaurant[num].restaurant_id,guest[0].guest_id);
            shoppingcart = res3;

            console.log(shoppingcart);


            
            const sendOption2 = {
                "cart_id": shoppingcart.shoppingcart_id,
                "price_lm": 0,
                "price_gb": 0,
                "price_rb": 0,
                "price_fp": 0
            };

            
            console.log(sendOption2);
            
            const res4 = await fetch(`${baseUrl}/finalprice`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(sendOption2)
            });
            console.log(res4);
            const win = window.open(`https://localhost:35000/Restaurant/${restaurant[num].restaurant_id}/${guest[0].guest_id}`, "_blank");
            win!.focus();
            //history.push(`/Restaurant/${restaurant[num].restaurant_id}/${guest[0].guest_id}`);
        }
        else {
            console.log("test2");
            const win = window.open(`https://localhost:35000/Restaurant/${restaurant[num].restaurant_id}/${guest[0].guest_id}`, "_blank");
            win!.focus();
            //history.push(`/Restaurant/${restaurant[num].restaurant_id}/${guest[0].guest_id}`);
        }

    };
    


    const addResMarker = (num : number): void => {
        
        google.maps.event.addListener(infoWindow, 'domready', () => {
            const someButton = document.getElementById('btn-click'+ `${num}`);
            if (someButton) {
                google.maps.event.addDomListener(someButton, 'click', () => {
                    //console.log("test");
                    createShopping(num);
                    //history.push(`/Home`);
                })
            }
        });


        const marker:GoogleMarker = new google.maps.Marker({
            position: new google.maps.LatLng((+restaurant[num].latitude), (+restaurant[num].longitude)),
            map: map,
            icon: {
                url: 'http://localhost:3000/images/rice-bowl.png',
                scaledSize: new google.maps.Size(50, 50)
            },
            //label: "FOOD",
            //title: `<p>ชื่อร้าน ${restaurant[num].store_name} </p> <p> เมนูอาหาร <a href=http://192.168.1.33:35000/Restaurant/${restaurant[num].restaurant_id}/${guest[0].guest_id}> กดที่นี่ </a> </p>`,
            title: `<div style='float:none'> <img style='width:300px;height:200px' src='${restaurant[num].url}'></div>` + `<p>ชื่อร้าน ${restaurant[num].store_name} </p> <p> เมนูอาหาร </p>` + "<div>" + "<button id='btn-click" + `${num}` + `'>` + "กดที่นี่" + "</button>" + "</div>" ,
            animation: google.maps.Animation.DROP
        });



        const listenerId = marker.addListener('click',async () => {
            infoWindow.close();
            infoWindow.setContent(marker.getTitle());
            infoWindow.open(marker.getMap(), marker);
            if (marker.getAnimation() !== null) {
                marker.setAnimation(null);
            } else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
                setTimeout(() => marker.setAnimation(null), 1000);
            }

        });

        Markers.push(marker);
        markerClusterer.addMarker(marker);
        console.log(Markers);
         
        
    };


    const initMap = (zoomLevel: number, address: GoogleLatLng): void => {
        if (ref.current) {
            const newmap = new google.maps.Map(ref.current, {
                zoom: zoomLevel,
                center: address,
                mapTypeControl: mapTypeControl,
                streetViewControl: false,
                rotateControl: false,
                scaleControl: true,
                fullscreenControl: false,
                panControl: true,
                zoomControl: true,
                gestureHandling: 'cooperative',
                mapTypeId: mapType,
                draggableCursor: 'pointer',
            });

            setMap(newmap);
            markerClusterer = new MarkerClusterer({map: newmap});

            //initAutocomplete();
        }
    };

   

    return (
        <div ref={ref} className="map-container2__map"></div>
    );
};

export default Map;