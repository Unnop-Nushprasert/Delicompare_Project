import { AutoComplete, AutoCompleteProps } from 'antd';
import { platform } from 'process';
import React, {useEffect, useRef, useState} from 'react';
import './Map.scss';

interface Loc {
    latitude: number;
    longitude: number;
  }

interface IMap {
    mapType: google.maps.MapTypeId;
    mapTypeControl?: boolean;
    setLocation: React.Dispatch<React.SetStateAction<Loc | undefined>>;
}

interface IMarker {
    latitude: number;
    longitude: number;
}

type GoogleLatLng = google.maps.LatLng;
type GoogleMap = google.maps.Map;
type GoogleMarker = google.maps.Marker;
type GooglePolyline = google.maps.Polyline;
var current: GoogleMarker;


const HomeMap: React.FC<IMap> = ({ mapType, mapTypeControl = false, setLocation}) => {

    const ref = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<GoogleMap>();
    const [marker, setMarker] = useState<IMarker>();
    

    const startMap = (): void => {
        if (!map) {
            defaultMapStart();
        }
    };
    useEffect(startMap, [map]);

    const defaultMapStart = (): void => {
        const defaultAddress = new google.maps.LatLng(13.84773606241174, 100.56958661110454);
        initMap(15, defaultAddress);
    };  

    const PlaceIdtocoordinator = async (placeId: string) => {
        const geocoder = new google.maps.Geocoder();
        await geocoder.geocode({ placeId: placeId}, function (results, status) {
            if (status === 'OK') {
                
                setMarker({
                    latitude: results![0].geometry.location.lat(),
                    longitude: results![0].geometry.location.lng()
                })

                setLocation({latitude: results![0].geometry.location.lat(), longitude: results![0].geometry.location.lng()});
                //console.log(current);
            }
        });
    };

    const DoubleclickHandler = async (location: GoogleLatLng) => {
        setMarker({
            latitude: location.lat(),
            longitude: location.lng()
        })

        setLocation({latitude: location.lat(), longitude: location.lng()});
    };

    useEffect(() => {
        if (marker) {
            addMarker(new google.maps.LatLng(marker.latitude, marker.longitude));
        }
    }, [marker]);

    const infoWindow = new google.maps.InfoWindow();


    const addMarker = (location: GoogleLatLng): void => {
        const newmarker:GoogleMarker = new google.maps.Marker({
            position: location,
            map: map,
            icon: {
                url: 'http://localhost:3000/images/DesIcon.png',
                scaledSize: new google.maps.Size(50, 50)
            },
            title: "ตำแหน่งนี้คือที่อยู่จัดส่งของคุณ",
            animation: google.maps.Animation.DROP
        });

        map?.setCenter(location);
        //map?.setZoom(15);

        newmarker.addListener('click', () => {
            infoWindow.close();
            infoWindow.setContent(newmarker.getTitle());
            infoWindow.open(newmarker.getMap(), newmarker);
            if (newmarker.getAnimation() !== null) {
                newmarker.setAnimation(null);
            } else {
                newmarker.setAnimation(google.maps.Animation.BOUNCE);
                setTimeout(() => newmarker.setAnimation(null), 1000);
            }

        });
        
        current = newmarker;
        //console.log(current);
    };

    function initAutocomplete() {
        const autocomplete = new google.maps.places.Autocomplete(
            document.getElementById('autocomplete') as HTMLInputElement,
            {
                types: ['geocode', 'establishment'],
                componentRestrictions: {'country': ['TH']},
                fields: ['place_id', 'geometry', 'name']
            });


        autocomplete.addListener("place_changed", () => {   
            
            if (current) {
                current.setMap(null);
                console.log('check');
            }
            
            const place = autocomplete.getPlace();

            if (!place.geometry) {
                console.log("fail");
            }
            console.log(place.place_id);
            PlaceIdtocoordinator(place.place_id!);
            //console.log(current);
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
                disableDoubleClickZoom: true,
                mapTypeId: mapType,
                draggableCursor: 'pointer',
            });

            
            newmap.addListener('dblclick', (e: any) => {
                if (current) {
                    current.setMap(null);
                    console.log('check');
                }
                //newmap.setZoom(15);
                DoubleclickHandler(e.latLng);
            });

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position: any) => {
                        console.log(position.coords.latitude);
                        console.log(position.coords.longitude);
                        let latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                        newmap.setCenter(latlng);
                        DoubleclickHandler(latlng);

                    },
                    () => {
                        console.log("failed4");
                    }
                );
            } else {
                console.log("failed4");
            }
            

            setMap(newmap);
            initAutocomplete();
        }
    };

    

    return (
        
            <div ref={ref} className="map-container1__map"></div>
        
    );
};

export default HomeMap;