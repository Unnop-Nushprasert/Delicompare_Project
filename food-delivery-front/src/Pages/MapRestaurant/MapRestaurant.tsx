import { AutoComplete, AutoCompleteProps } from 'antd';
import { platform } from 'process';
import React, {useEffect, useRef, useState} from 'react';
import { baseUrl } from '../../config/constant';
import './Map.scss';

interface IMap {
    mapType: google.maps.MapTypeId;
    mapTypeControl?: boolean;
    restaurant: any;
    guest: any;
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

const MapRestaurant: React.FC<IMap> = ({ mapType, mapTypeControl = false, restaurant, guest}) => {

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

    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({suppressMarkers: true});

    const startMap = (): void => {
        if (!map) {
            defaultMapStart();
        } 
    };
    useEffect(startMap, [map]);

    const defaultMapStart = (): void => {
        console.log(+guest.guest_info.latitude);
        console.log(+guest.guest_info.longitude);
        const defaultAddress = new google.maps.LatLng((+guest.guest_info.latitude), (+guest.guest_info.longitude));
        initMap(15, defaultAddress);
    };

    /*
    const initEventListener = ():void => {
        if (map) {
            google.maps.event.addListener(map, 'click', function(e) {
                const place = autocomplete.getPlace();
                console.log(place.html_attributions.place_id);
                PlaceIdtocoordinator(place.html_attributions.place_id);
            })
            
        }
    };
    useEffect(initEventListener, [map]);
    */
    


    const calculateAndDisplayRoute = (
        directionsService: google.maps.DirectionsService,
        directionsRenderer: google.maps.DirectionsRenderer
      ): void => {
        console.log('test');
        
        directionsService
          .route({
            origin: new google.maps.LatLng((+guest.guest_info.latitude), (+guest.guest_info.longitude)),
            destination: new google.maps.LatLng((+restaurant.restaurant_info.latitude),(+restaurant.restaurant_info.longitude)),
            travelMode: google.maps.TravelMode.DRIVING,
          })
          .then(async (response) => {
            directionsRenderer.setMap(map!);
            directionsRenderer.setDirections(response);
            console.log(response.routes[0].legs[0].distance?.value);
            console.log(response.routes[0].legs[0].duration?.value);
            const sendOption = {
                "distance": response.routes[0].legs[0].distance?.value,
                "delivery_time": response.routes[0].legs[0].duration?.value
            };
            console.log(sendOption);
            const res = await fetch(`${baseUrl}/shoppingcart/${restaurant.restaurant_info.restaurant_id}/${guest.guest_info.guest_id}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(sendOption)
            });
            console.log(res); 
            console.log('success');
          })
          .catch((e) => console.log('error'));
    }
      

    const PlaceIdtocoordinator = async (placeId: string) => {
        const geocoder = new google.maps.Geocoder();
        await geocoder.geocode({ placeId: placeId}, function (results, status) {
            if (status === 'OK') {
                setSearchPlace(results![0].formatted_address);
                
                setMarker({
                    address: results![0].formatted_address,
                    latitude: results![0].geometry.location.lat(),
                    longitude: results![0].geometry.location.lng()
                })
            }
        });
    };

    useEffect(() => {
        if (map) {
            addHomeMarker(new google.maps.LatLng((+guest.guest_info.latitude), (+guest.guest_info.longitude)));
            addMarker(new google.maps.LatLng((+restaurant.restaurant_info.latitude),(+restaurant.restaurant_info.longitude)));
            calculateAndDisplayRoute(directionsService,directionsRenderer);
        }
    }, [map]);

    const infoWindow = new google.maps.InfoWindow();


    const addMarker = (location: GoogleLatLng): void => {
        const marker:GoogleMarker = new google.maps.Marker({
            position: location,
            map: map,
            icon: {
                url: 'http://localhost:3000/images/rice-bowl.png',
                scaledSize: new google.maps.Size(50, 50)
            },
            //label: "FOOD",
            title: "ร้านอาหาร",
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

    /*
    useEffect(() => {
        listenerIdArray.forEach((listenerId) => {
           google.maps.event.removeListener(listenerId);
        });

        setListenerIdArray([]);
        setGoogleMarkers([]);
        googleMarkers.forEach((googleMarker) => {
            const markerPosition = googleMarker.getPosition();
            if (markerPosition) {
                addMarker(markerPosition);
            }
        });
    }, [LastLineHook]);
    */

    const addHomeMarker = (location: GoogleLatLng): GoogleMarker => {
        const homeMarkerConst:GoogleMarker = new google.maps.Marker({
            position: location,
            map: map,
            icon: {
                url: 'http://localhost:3000/images/DesIcon.png',
                scaledSize: new google.maps.Size(50, 50)
            },
            //label: "DEST",
            title: "ที่อยู่จัดส่งของคุณ",
            animation: google.maps.Animation.DROP
        });

        const listenerId = homeMarkerConst.addListener('click', () => {
            infoWindow.close();
            infoWindow.setContent(homeMarkerConst.getTitle());
            infoWindow.open(homeMarkerConst.getMap(), homeMarkerConst);
            if (homeMarkerConst.getAnimation() !== null) {
                homeMarkerConst.setAnimation(null);
            } else {
                homeMarkerConst.setAnimation(google.maps.Animation.BOUNCE);
                setTimeout(() => homeMarkerConst.setAnimation(null), 1000);
            }

        });

        return homeMarkerConst;
    };

    function initAutocomplete() {
        const autocomplete = new google.maps.places.Autocomplete(
            document.getElementById('autocomplete') as HTMLInputElement,
            {
                types: ['establishment'],
                componentRestrictions: {'country': ['TH']},
                fields: ['place_id', 'geometry', 'name']
            });


        autocomplete.addListener("place_changed", () => {    
            const place = autocomplete.getPlace();
            console.log(place.place_id);
            PlaceIdtocoordinator(place.place_id!);
        });

       
    }


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
            //initAutocomplete();
            console.log(+restaurant.restaurant_info.latitude);
            console.log(+restaurant.restaurant_info.longitude);
            //addMarker(new google.maps.LatLng((+restaurant.restaurant_info.latitude),(+restaurant.restaurant_info.longitude)));
        }
    };

    

    return (
            <div ref={ref} className="map-container3__map"></div>

    );
};

export default MapRestaurant;