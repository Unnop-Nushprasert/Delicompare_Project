import { baseUrl } from "../config/constant";

export async function fetchRestaurants(Restaurant_ID: any | undefined): Promise<any> {
    const res = await fetch(`${ baseUrl }/restaurant/${ Restaurant_ID }`);
    return res.json();
}

export async function fetchAllRestaurants(): Promise<any> {
    const res = await fetch(`${ baseUrl }/restaurant`);
    return res.json();
}

export async function fetchAllFoods(): Promise<any> {
    const res = await fetch(`${ baseUrl }/food`);
    return res.json();
}

export async function fetchShoppingcart(Restaurant_ID: any | undefined, Guest_ID: any | undefined): Promise<any> {
    const res = await fetch(`${ baseUrl }/shoppingcart/${ Restaurant_ID }/${ Guest_ID }`);
    let res2 = res.json();
    console.log(res2);
    return res2;
}

export async function fetchGuest(Restaurant_ID: any | undefined, Guest_ID: any | undefined): Promise<any> {
    const res = await fetch(`${ baseUrl }/guest/${ Restaurant_ID }/${ Guest_ID }`);
    return res.json();
}

export async function fetchGuestLocation(Guest_ID: any | undefined): Promise<any> {
    const res = await fetch(`${ baseUrl }/guest/location/${ Guest_ID }`);
    return res.json();
}

export async function fetchGuestByLatLng(latitude: any | undefined, longitude: any | undefined): Promise<any> {
    const res = await fetch(`${ baseUrl }/guest/findbylatlng/${ latitude }/${ longitude }`);
    return res.json();
}

export default {
    fetchRestaurants,
    fetchGuest,
    fetchAllRestaurants,
    fetchGuestLocation,
    fetchShoppingcart,
    fetchGuestByLatLng,
    fetchAllFoods
};