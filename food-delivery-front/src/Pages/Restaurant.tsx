import { useHistory, useParams } from "react-router";
import '../CSSsource/Restaurant.css'
import '../CSSsource/Tab.css'
import '../CSSsource/button.css'
import '../CSSsource/Home.css'
import React, { useEffect, useState } from "react";
import RestaurantService from "../service/RestaurantService";
import { loadMapApi } from "./utils/GoogleMapsUtils";
import MapRestaurant from "./MapRestaurant";
import * as jsonpatch from 'fast-json-patch';
import { applyOperation } from 'fast-json-patch';
import { baseUrl } from "../config/constant";
import { openCity } from "./open";
import { boolean } from "yup";
import { Item } from "react-bootstrap/lib/Breadcrumb";


let storefood: any;
let newfood: any;
let check: any;
let numfood: any;
check = false;
let lowlm: boolean;
let lowgb: boolean;
let lowrb: boolean;
let lowfp: boolean;
lowlm = false;
lowgb = false;
lowrb = false;
lowfp = false;
let excludelm: boolean;
let excludegb: boolean;
let excluderb: boolean;
let excludefp: boolean;
excludelm = false;
excludegb = false;
excluderb = false;
excludefp = false;
let pagenum: number;
pagenum = 1;
let totallm: number;
let totalgb: number;
let totalrb: number;
let totalfp: number;
totalfp = 0;
totalgb = 0;
totalrb = 0;
totallm = 0;


function Restaurant() {
    const [restaurant, setRestaurant] = useState<any>('test');
    const [guest, setGuest] = useState<any>('test');
    const [shoppingcart, setShoppingcart] = useState<any>('test');
    const [food, setFood] = useState<any>('test');
    const [showfood, setShowFood] = useState<any>('test');
    const [reload, setReload] = useState<any>(false);
    const [reload2, setReload2] = useState<any>(false);
    const [query, setQuery] = useState("");
    const { Restaurant_ID } = useParams();
    const { Guest_ID }  = useParams();
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const history = useHistory();
    var numlm = 0;
    var numgb = 0;
    var numrb = 0;
    var numfp = 0;
    const foodpic = 'buddybear.jpg';

    const fetching = async () => {
        await RestaurantService.fetchGuest(Restaurant_ID,Guest_ID)
            .then(obj => { 
                setGuest(obj);
            });
        await RestaurantService.fetchRestaurants(Restaurant_ID)
            .then(obj => { 
                setRestaurant(obj);
            });
        await RestaurantService.fetchShoppingcart(Restaurant_ID,Guest_ID)
            .then(obj => { 
                setShoppingcart(obj);
            });
        
    };

    

    const fooduplm = async (pos: number) => {
        if (restaurant.food_info[pos].price_lm !== -1) {
            var document = {"shopping_list": shoppingcart.shopping_list};
            console.log(document);
            var patch: jsonpatch.Operation = { op: "replace", path: `/shopping_list/${pos}/number`, value: shoppingcart.shopping_list[pos].number+1};
            var newdocument = jsonpatch.applyOperation(document, patch).newDocument;
            console.log(newdocument);
            const res = await fetch(`${baseUrl}/shoppingcart/${restaurant.restaurant_info.restaurant_id}/${guest.guest_info.guest_id}`, {
                method: 'PATCH',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(newdocument)
            });
            const res2 = await fetch(`${baseUrl}/shoppingcart/${restaurant.restaurant_info.restaurant_id}/${guest.guest_info.guest_id}`, {
                method: 'PATCH',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(newdocument)
            });
            const res3 = await fetch(`${baseUrl}/finalprice/${restaurant.restaurant_info.restaurant_id}/${guest.guest_info.guest_id}`, {
                method: 'PATCH',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({})
            });
            setReload(!reload);
        }  
    };

    const foodupgb = async (pos: number) => {
        if (restaurant.food_info[pos].price_gb !== -1) {
            var document = {"shopping_list": shoppingcart.shopping_list};
            console.log(document);
            var patch: jsonpatch.Operation = { op: "replace", path: `/shopping_list/${pos}/number`, value: shoppingcart.shopping_list[pos].number+1};
            var newdocument = jsonpatch.applyOperation(document, patch).newDocument;
            console.log(newdocument);
            const res = await fetch(`${baseUrl}/shoppingcart/${restaurant.restaurant_info.restaurant_id}/${guest.guest_info.guest_id}`, {
                method: 'PATCH',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(newdocument)
            });
            const res2 = await fetch(`${baseUrl}/shoppingcart/${restaurant.restaurant_info.restaurant_id}/${guest.guest_info.guest_id}`, {
                method: 'PATCH',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(newdocument)
            });
            const res3 = await fetch(`${baseUrl}/finalprice/${restaurant.restaurant_info.restaurant_id}/${guest.guest_info.guest_id}`, {
                method: 'PATCH',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({})
            });
            setReload(!reload);
        }  
    };

    const fooduprb = async (pos: number) => {
        if (restaurant.food_info[pos].price_rb !== -1) {
            var document = {"shopping_list": shoppingcart.shopping_list};
            console.log(document);
            var patch: jsonpatch.Operation = { op: "replace", path: `/shopping_list/${pos}/number`, value: shoppingcart.shopping_list[pos].number+1};
            var newdocument = jsonpatch.applyOperation(document, patch).newDocument;
            console.log(newdocument);
            const res = await fetch(`${baseUrl}/shoppingcart/${restaurant.restaurant_info.restaurant_id}/${guest.guest_info.guest_id}`, {
                method: 'PATCH',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(newdocument)
            });
            const res2 = await fetch(`${baseUrl}/shoppingcart/${restaurant.restaurant_info.restaurant_id}/${guest.guest_info.guest_id}`, {
                method: 'PATCH',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(newdocument)
            });
            const res3 = await fetch(`${baseUrl}/finalprice/${restaurant.restaurant_info.restaurant_id}/${guest.guest_info.guest_id}`, {
                method: 'PATCH',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({})
            });
            setReload(!reload);
        }  
    };

    const foodupfp = async (pos: number) => {
        if (restaurant.food_info[pos].price_fp !== -1) {
            var document = {"shopping_list": shoppingcart.shopping_list};
            console.log(document);
            var patch: jsonpatch.Operation = { op: "replace", path: `/shopping_list/${pos}/number`, value: shoppingcart.shopping_list[pos].number+1};
            var newdocument = jsonpatch.applyOperation(document, patch).newDocument;
            console.log(newdocument);
            const res = await fetch(`${baseUrl}/shoppingcart/${restaurant.restaurant_info.restaurant_id}/${guest.guest_info.guest_id}`, {
                method: 'PATCH',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(newdocument)
            });
            const res2 = await fetch(`${baseUrl}/shoppingcart/${restaurant.restaurant_info.restaurant_id}/${guest.guest_info.guest_id}`, {
                method: 'PATCH',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(newdocument)
            });
            const res3 = await fetch(`${baseUrl}/finalprice/${restaurant.restaurant_info.restaurant_id}/${guest.guest_info.guest_id}`, {
                method: 'PATCH',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({})
            });
            setReload(!reload);
        }  
    };

    const fooddownlm = async (pos: number) => {
        if ((shoppingcart.shopping_list[pos].number > 0) && (restaurant.food_info[pos].price_lm !== -1)) {
            var document = {"shopping_list": shoppingcart.shopping_list};
            console.log(document);
            var patch: jsonpatch.Operation = { op: "replace", path: `/shopping_list/${pos}/number`, value: shoppingcart.shopping_list[pos].number-1};
            var newdocument = jsonpatch.applyOperation(document, patch).newDocument;
            console.log(newdocument);
            const res = await fetch(`${baseUrl}/shoppingcart/${restaurant.restaurant_info.restaurant_id}/${guest.guest_info.guest_id}`, {
                method: 'PATCH',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(newdocument)
            });
            const res2 = await fetch(`${baseUrl}/shoppingcart/${restaurant.restaurant_info.restaurant_id}/${guest.guest_info.guest_id}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(newdocument)
            });
            const res3 = await fetch(`${baseUrl}/finalprice/${restaurant.restaurant_info.restaurant_id}/${guest.guest_info.guest_id}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({})
            });
            setReload(!reload);
        }
        
    };

    const fooddowngb = async (pos: number) => {
        if ((shoppingcart.shopping_list[pos].number > 0) && (restaurant.food_info[pos].price_gb !== -1)) {
            var document = {"shopping_list": shoppingcart.shopping_list};
            console.log(document);
            var patch: jsonpatch.Operation = { op: "replace", path: `/shopping_list/${pos}/number`, value: shoppingcart.shopping_list[pos].number-1};
            var newdocument = jsonpatch.applyOperation(document, patch).newDocument;
            console.log(newdocument);
            const res = await fetch(`${baseUrl}/shoppingcart/${restaurant.restaurant_info.restaurant_id}/${guest.guest_info.guest_id}`, {
                method: 'PATCH',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(newdocument)
            });
            const res2 = await fetch(`${baseUrl}/shoppingcart/${restaurant.restaurant_info.restaurant_id}/${guest.guest_info.guest_id}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(newdocument)
            });
            const res3 = await fetch(`${baseUrl}/finalprice/${restaurant.restaurant_info.restaurant_id}/${guest.guest_info.guest_id}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({})
            });
            setReload(!reload);
        }
        
    };

    const fooddownrb = async (pos: number) => {
        if ((shoppingcart.shopping_list[pos].number > 0) && (restaurant.food_info[pos].price_rb !== -1)) {
            var document = {"shopping_list": shoppingcart.shopping_list};
            console.log(document);
            var patch: jsonpatch.Operation = { op: "replace", path: `/shopping_list/${pos}/number`, value: shoppingcart.shopping_list[pos].number-1};
            var newdocument = jsonpatch.applyOperation(document, patch).newDocument;
            console.log(newdocument);
            const res = await fetch(`${baseUrl}/shoppingcart/${restaurant.restaurant_info.restaurant_id}/${guest.guest_info.guest_id}`, {
                method: 'PATCH',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(newdocument)
            });
            const res2 = await fetch(`${baseUrl}/shoppingcart/${restaurant.restaurant_info.restaurant_id}/${guest.guest_info.guest_id}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(newdocument)
            });
            const res3 = await fetch(`${baseUrl}/finalprice/${restaurant.restaurant_info.restaurant_id}/${guest.guest_info.guest_id}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({})
            });
            setReload(!reload);
        }
        
    };

    const fooddownfp = async (pos: number) => {
        if ((shoppingcart.shopping_list[pos].number > 0) && (restaurant.food_info[pos].price_fp !== -1)) {
            var document = {"shopping_list": shoppingcart.shopping_list};
            console.log(document);
            var patch: jsonpatch.Operation = { op: "replace", path: `/shopping_list/${pos}/number`, value: shoppingcart.shopping_list[pos].number-1};
            var newdocument = jsonpatch.applyOperation(document, patch).newDocument;
            console.log(newdocument);
            const res = await fetch(`${baseUrl}/shoppingcart/${restaurant.restaurant_info.restaurant_id}/${guest.guest_info.guest_id}`, {
                method: 'PATCH',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(newdocument)
            });
            const res2 = await fetch(`${baseUrl}/shoppingcart/${restaurant.restaurant_info.restaurant_id}/${guest.guest_info.guest_id}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(newdocument)
            });
            const res3 = await fetch(`${baseUrl}/finalprice/${restaurant.restaurant_info.restaurant_id}/${guest.guest_info.guest_id}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({})
            });
            setReload(!reload);
        }
        
    };

    function handleClick() {
        //history.push(`/Home/${Guest_ID}`);
        const win = window.open(`/Home/${Guest_ID}`, "_self");
        win!.focus();
    }

    function handleClick2() {
        //history.push(`/Home`);
        const win = window.open(`/Home`, "_self");
        win!.focus();
    }

    async function handleClick3() {
        var document = {"shopping_list": shoppingcart.shopping_list};
        console.log(document);
        
        for (let i = 0; i < numfood; i++) {
            document.shopping_list[i].number = 0;
        }
        
        const res = await fetch(`${baseUrl}/shoppingcart/${restaurant.restaurant_info.restaurant_id}/${guest.guest_info.guest_id}`, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(document)
        });
        const res2 = await fetch(`${baseUrl}/shoppingcart/${restaurant.restaurant_info.restaurant_id}/${guest.guest_info.guest_id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(document)
        });
        const res3 = await fetch(`${baseUrl}/finalprice/${restaurant.restaurant_info.restaurant_id}/${guest.guest_info.guest_id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({})
        });
        setReload(!reload);
    }

    function handleClick4() {
        if (food !== undefined && food !== 'test') {
            if (food.length > ((pagenum-1)*5)+5) {
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
        if (storefood !== undefined && guest !== undefined && guest !== 'test') {
            totalfp = 0;
            totalgb = 0;
            totalrb = 0;
            totallm = 0;
            storefood.map((item: any) => {
                
                if ((guest.shoppingcart_info.shopping_list[item.pos-1].number > 0) && (item.price_lm !== -1)) {
                    totallm++;
                }
                if ((guest.shoppingcart_info.shopping_list[item.pos-1].number > 0) && (item.price_gb !== -1)) {
                    totalgb++;
                }
                if ((guest.shoppingcart_info.shopping_list[item.pos-1].number > 0) && (item.price_rb !== -1)) {
                    totalrb++;
                }
                if ((guest.shoppingcart_info.shopping_list[item.pos-1].number > 0) && (item.price_fp !== -1)) {
                    totalfp++;
                }
                
            });
        }
    }, [guest, food])


    useEffect(() => {
        fetching();
    }, []);
  
    useEffect(() => {
        fetching();
    }, [reload]);

    useEffect(() => {
        if (food !== 'test' && food !== undefined) {
            console.log(food);
            if (food.length < ((pagenum-1)*5)+1) {
                setShowFood([]);
            }
            else if (food.length >= ((pagenum-1)*5)+5) {
                let tempfood = food.slice(((pagenum-1)*5),((pagenum-1)*5)+5);
                setShowFood(tempfood)
            }
            else {
                let tempfood = food.slice(((pagenum-1)*5),food.length);
                setShowFood(tempfood);
            }
            
        }
    }, [pagenum, food]);

    useEffect(() => {
        const googleMapScript = loadMapApi();
        googleMapScript.addEventListener('load', function () {
            setScriptLoaded(true);
        });
    }, []);

    useEffect(() => {
        if (restaurant !== undefined && restaurant !== 'test' && !check) {
            storefood = restaurant.food_info;
            console.log(storefood);
            numfood = storefood.length;
            check = true;
            setFood(storefood);
        }
    }, [restaurant]);

    useEffect(() => {
        if (query !== "" && storefood !== undefined) {
            console.log(query);

            newfood = storefood.filter((post: any) => {
                if (post.food_name.toLowerCase().includes(query.toLowerCase())) {
                    return post
                }
            })
            console.log(newfood);
            setFood(newfood);
                
        }
        else {
            if (storefood !== undefined) {
                setFood(storefood);
            }
        }
        
    }, [query]);

    let up = "=>";
    let down = "<=";

    useEffect(() => {
        if (storefood !== undefined && guest !== undefined && guest !== 'test' && shoppingcart !== undefined && shoppingcart !== 'test') {
            excludelm = false;
            excludegb = false;
            excluderb = false;
            excludefp = false;
            console.log(storefood);
            console.log(shoppingcart);
            storefood.forEach((element: any) => {
                if (element.price_lm === -1 && shoppingcart.shopping_list[element.pos-1].number > 0) {
                    excludelm = true;
                    console.log("exlm");
                }
                if (element.price_gb === -1 && shoppingcart.shopping_list[element.pos-1].number > 0) {
                    excludegb = true;
                    console.log("exgb");
                }
                if (element.price_rb === -1 && shoppingcart.shopping_list[element.pos-1].number > 0) {
                    excluderb = true;
                    console.log("exrb");
                }
                if (element.price_fp === -1 && shoppingcart.shopping_list[element.pos-1].number > 0) {
                    excludefp = true;
                    console.log("exfp");
                }
            });
            
            if ((guest.finalprice_info.price_lm < guest.finalprice_info.price_gb || shoppingcart.price_list.price_gb === 0 || excludegb) 
            && (guest.finalprice_info.price_lm < guest.finalprice_info.price_rb || shoppingcart.price_list.price_rb === 0 || excluderb) 
            && (guest.finalprice_info.price_lm < guest.finalprice_info.price_fp || shoppingcart.price_list.price_fp === 0 || excludefp)
            && shoppingcart.price_list.price_lm !== 0 && (!excludelm)) {
                lowlm = true;
                lowgb = false;
                lowrb = false;
                lowfp = false;
            }
            else if ((guest.finalprice_info.price_gb < guest.finalprice_info.price_lm || shoppingcart.price_list.price_lm === 0 || excludelm) 
            && (guest.finalprice_info.price_gb < guest.finalprice_info.price_rb || shoppingcart.price_list.price_rb === 0 || excluderb) 
            && (guest.finalprice_info.price_gb < guest.finalprice_info.price_fp || shoppingcart.price_list.price_fp === 0 || excludefp)
            && shoppingcart.price_list.price_gb !== 0 && (!excludegb)) {
                lowgb = true;
                lowlm = false;
                lowrb = false;
                lowfp = false;
            }
            else if ((guest.finalprice_info.price_rb < guest.finalprice_info.price_gb || shoppingcart.price_list.price_gb === 0 || excludegb) 
            && (guest.finalprice_info.price_rb < guest.finalprice_info.price_lm || shoppingcart.price_list.price_lm === 0 || excludelm) 
            && (guest.finalprice_info.price_rb < guest.finalprice_info.price_fp || shoppingcart.price_list.price_fp === 0 || excludefp)
            && shoppingcart.price_list.price_rb !== 0 && (!excluderb)) {
                lowrb = true;
                lowgb = false;
                lowlm = false;
                lowfp = false;
            }
            else if ((guest.finalprice_info.price_fp < guest.finalprice_info.price_gb || shoppingcart.price_list.price_gb === 0 || excludegb) 
            && (guest.finalprice_info.price_fp < guest.finalprice_info.price_lm || shoppingcart.price_list.price_lm === 0 || excludelm) 
            && (guest.finalprice_info.price_fp < guest.finalprice_info.price_rb || shoppingcart.price_list.price_rb === 0 || excluderb)
            && shoppingcart.price_list.price_fp !== 0 && (!excludefp)) {
                lowfp = true;
                lowgb = false;
                lowrb = false;
                lowlm = false;
            }
            else if ((guest.finalprice_info.price_lm === guest.finalprice_info.price_gb) && shoppingcart.price_list.price_gb !== 0 && shoppingcart.price_list.price_lm !== 0 
                && (guest.finalprice_info.price_lm < guest.finalprice_info.price_rb || shoppingcart.price_list.price_rb === 0 || excluderb) 
                && (guest.finalprice_info.price_lm < guest.finalprice_info.price_fp || shoppingcart.price_list.price_fp === 0 || excludefp)
                && (!excludelm) && (!excludegb) 
                ) {
                lowlm = true;
                lowgb = true;
                lowrb = false;
                lowfp = false;
            }
            else if ((guest.finalprice_info.price_lm === guest.finalprice_info.price_rb) && shoppingcart.price_list.price_rb !== 0 && shoppingcart.price_list.price_lm !== 0 
                && (guest.finalprice_info.price_lm < guest.finalprice_info.price_gb || shoppingcart.price_list.price_gb === 0 || excludegb) 
                && (guest.finalprice_info.price_lm < guest.finalprice_info.price_fp || shoppingcart.price_list.price_fp === 0 || excludefp)
                && (!excludelm) && (!excluderb)
                ) {
                lowlm = true;
                lowgb = false;
                lowrb = true;
                lowfp = false;
            }
            else if ((guest.finalprice_info.price_lm === guest.finalprice_info.price_fp) && shoppingcart.price_list.price_fp !== 0 && shoppingcart.price_list.price_lm !== 0 
                && (guest.finalprice_info.price_lm < guest.finalprice_info.price_gb || shoppingcart.price_list.price_gb === 0 || excludegb) 
                && (guest.finalprice_info.price_lm < guest.finalprice_info.price_rb || shoppingcart.price_list.price_rb === 0 || excluderb)
                && (!excludelm) && (!excludefp)
                ) {
                lowlm = true;
                lowgb = false;
                lowrb = false;
                lowfp = true;
            }
            else if ((guest.finalprice_info.price_gb === guest.finalprice_info.price_rb) && shoppingcart.price_list.price_gb !== 0 && shoppingcart.price_list.price_rb !== 0 
                && (guest.finalprice_info.price_gb < guest.finalprice_info.price_lm || shoppingcart.price_list.price_lm === 0 || excludelm) 
                && (guest.finalprice_info.price_gb < guest.finalprice_info.price_fp || shoppingcart.price_list.price_fp === 0 || excludefp)
                && (!excludegb) && (!excluderb)
                ) {
                lowlm = false;
                lowgb = true;
                lowrb = true;
                lowfp = false;
            }
            else if ((guest.finalprice_info.price_gb === guest.finalprice_info.price_fp) && shoppingcart.price_list.price_gb !== 0 && shoppingcart.price_list.price_fp !== 0 
                && (guest.finalprice_info.price_gb < guest.finalprice_info.price_lm || shoppingcart.price_list.price_lm === 0 || excludelm) 
                && (guest.finalprice_info.price_gb < guest.finalprice_info.price_rb || shoppingcart.price_list.price_rb === 0 || excluderb)
                && (!excludegb) && (!excludefp)
                ) {
                lowlm = false;
                lowgb = true;
                lowrb = false;
                lowfp = true;
            }
            else if ((guest.finalprice_info.price_rb === guest.finalprice_info.price_fp) && shoppingcart.price_list.price_rb !== 0 && shoppingcart.price_list.price_fp !== 0 
                && (guest.finalprice_info.price_rb < guest.finalprice_info.price_lm || shoppingcart.price_list.price_lm === 0 || excludelm) 
                && (guest.finalprice_info.price_rb < guest.finalprice_info.price_gb || shoppingcart.price_list.price_gb === 0 || excludegb)
                && (!excluderb) && (!excludefp)
                ) {
                lowlm = false;
                lowgb = false;
                lowrb = true;
                lowfp = true;
            }
            else if ((guest.finalprice_info.price_lm === guest.finalprice_info.price_gb) && (guest.finalprice_info.price_lm === guest.finalprice_info.price_rb) 
                && shoppingcart.price_list.price_lm !== 0 && shoppingcart.price_list.price_gb !== 0 && shoppingcart.price_list.price_rb !== 0
                && (guest.finalprice_info.price_lm < guest.finalprice_info.price_fp || shoppingcart.price_list.price_fp === 0 || excludefp) 
                && (!excludelm) && (!excludegb) && (!excluderb) 
                ) {
                lowlm = true;
                lowgb = true;
                lowrb = true;
                lowfp = false;
            }
            else if ((guest.finalprice_info.price_lm === guest.finalprice_info.price_gb) && (guest.finalprice_info.price_lm === guest.finalprice_info.price_fp) 
                && shoppingcart.price_list.price_lm !== 0 && shoppingcart.price_list.price_gb !== 0 && shoppingcart.price_list.price_fp !== 0
                && (guest.finalprice_info.price_lm < guest.finalprice_info.price_rb || shoppingcart.price_list.price_rb === 0 || excluderb) 
                && (!excludelm) && (!excludegb) && (!excludefp) 
                ) {
                lowlm = true;
                lowgb = true;
                lowrb = false;
                lowfp = true;
            }
            else if ((guest.finalprice_info.price_lm === guest.finalprice_info.price_rb) && (guest.finalprice_info.price_lm === guest.finalprice_info.price_fp) 
                && shoppingcart.price_list.price_lm !== 0 && shoppingcart.price_list.price_rb !== 0 && shoppingcart.price_list.price_fp !== 0
                && (guest.finalprice_info.price_lm < guest.finalprice_info.price_gb || shoppingcart.price_list.price_gb === 0 || excludegb) 
                && (!excludelm) && (!excluderb) && (!excludefp) 
                ) {
                lowlm = true;
                lowgb = false;
                lowrb = true;
                lowfp = true;
            }
            else if ((guest.finalprice_info.price_gb === guest.finalprice_info.price_rb) && (guest.finalprice_info.price_gb === guest.finalprice_info.price_fp) 
                && shoppingcart.price_list.price_gb !== 0 && shoppingcart.price_list.price_rb !== 0 && shoppingcart.price_list.price_fp !== 0
                && (guest.finalprice_info.price_gb < guest.finalprice_info.price_lm || shoppingcart.price_list.price_lm === 0 || excludelm) 
                && (!excludegb) && (!excluderb) && (!excludefp) 
                ) {
                lowlm = false;
                lowgb = true;
                lowrb = true;
                lowfp = true;
            }
            else {
                lowfp = false;
                lowgb = false;
                lowrb = false;
                lowlm = false;
            }
            setReload2(!reload2);
            console.log("lowest");
        }
    }, [guest, shoppingcart] );

    

    if (restaurant !== 'test' && guest !== 'test' && shoppingcart !== 'test' && food !== 'test') {
        console.log(shoppingcart);
        return (
            <div style={{backgroundImage: 'url(' + restaurant.restaurant_info.url + ')',
            backgroundAttachment: 'fixed',
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            height: '280vw'
            }}>
                <button className="buttonhome" onClick={handleClick2}> Home </button>
                <button className="buttonmap2" onClick={handleClick}> แผนที่ของคุณ </button>
                <button className="buttonreset" onClick={handleClick3}> reset จำนวนอาหารที่สั่ง </button>
                <button className="buttonpageup" onClick={handleClick4}> {up} </button>
                <button className="buttonpagedown" onClick={handleClick5}> {down} </button>
                <div className="page"> หน้าที่ {pagenum} </div>
                <div className='restaurantNameH'>
                    ชื่อร้าน:
                    <div className='restaurantName'>
                        {restaurant.restaurant_info.store_name}                     
                    </div>
                </div>
                <input className='searchrestaurant3' placeholder="โปรดใส่ชื่อเมนูอาหารที่ต้องการ" onChange={event => setQuery(event.target.value)} />
                <table className="custom4">
                        <tr>
                            <th className="custom3">
                                <span className="FoodH">ผลการค้นหา {food.length} เมนูอาหาร</span>
                            </th>
                        </tr>
                </table>
                <div className="tab">
                        <button id="Blm" className="tablinks" onClick={() => openCity('Lineman', 'Blm')}>Lineman</button>
                        <button id="Bgb" className="tablinks" onClick={() => openCity('Grab', 'Bgb')}>Grab</button>
                        <button id="Brb" className="tablinks" onClick={() => openCity('Robinhood', 'Brb')}>Robinhood</button>
                        <button id="Bfp" className="tablinks" onClick={() => openCity('Foodpanda', 'Bfp')}>Foodpanda</button>
                </div>

                <div id="Lineman" className="tabcontent">
                        <table className="custom">
                            <tr>
                                <th className="custom">
                                    <span className="FoodH">เมนูอาหารใน Lineman</span>
                                </th>
    
                                <th className="custom">
                                    <span className="PriceH">ราคา</span>
                                </th>
                                <th className="custom">
                                    <span className="PriceH">รูปภาพอาหาร</span>
                                </th>
                            </tr>
                            {showfood.map((item: any) => (
                                <tr className="foodlistlm">
                                    <td style={{
                                        backgroundImage: 'url(' + 'http://localhost:3000/images/BGFood.jpeg' + ')',
                                        backgroundSize: '100% 100%',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center',
                                        border: '5px ridge #4F7849',
                                    }}>
                                        {item.food_name}                                      
                                        <div className="foodlistlm"> จำนวนที่สั่ง <button className="buttonred" onClick={() => fooddownlm(item.pos-1)}>-</button> 
                                        <span className="numberorder">{(item.price_lm != -1) ? guest.shoppingcart_info.shopping_list[item.pos-1].number : 0}</span> 
                                        <button className="buttongreen" onClick={() => fooduplm(item.pos-1)}>+</button> </div>
                                    </td>
                                    
                                    <td style={{
                                        width: '24%',
                                        backgroundImage: 'url(' + 'http://localhost:3000/images/lineman.png' + ')',
                                        backgroundSize: '100% 100%',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center',
                                        border: '5px ridge #4F7849',
                                    }}>                                
                                        
                                            <div style={{
                                                fontSize: '50px',
                                                fontFamily: 'Sriracha, cursive',
                                            }}>
                                                
                                                {(item.price_lm != -1) ? item.price_lm : "ไม่มีเมนูนี้ในแอปพลิเคชัน"}     
                                            </div>
                                          
                                                                    
                                    </td> 
                                    <td style={{backgroundImage: 'url(' + item.url + ')',
                                        backgroundSize: '100% 100%',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center',
                                        width: '35%',
                                        border: '5px ridge #4F7849',
                                        }}>
                                    </td>
                                </tr>
                            ))}    
                        </table>
                        <table className="custom">
                            <tr>
                                <th className="custom">
                                    <span className="FoodH">ราคาอาหารทั้งหมดของ Lineman</span>
                                </th>
                                <th className="custom">
                                    <span className="PriceH">ค่าส่ง</span>
                                </th>
                                {(lowlm) ? <th className="custom4">
                                    <span className="PriceH">ราคารวมทั้งหมดของ Lineman (ราคาถูกที่สุด)</span>
                                </th> : <th className="custom">
                                    <span className="PriceH">ราคารวมทั้งหมดของ Lineman</span>
                                </th> 
                                }
                                
                            </tr>
                            <tr>
                                <th className="custom2">
                                    <span className="FoodH">{shoppingcart.price_list.price_lm}</span>
                                </th>
                                <th className="custom2">
                                    <span className="PriceH">{shoppingcart.delivery_fee.price_lm}</span>
                                </th>
                                <th className="custom2">
                                    <span className="PriceHover">{guest.finalprice_info.price_lm}</span>
                                    <div className="HoverTotal"> {storefood.map((item: any) => (
                                        ((guest.shoppingcart_info.shopping_list[item.pos-1].number > 0) && (item.price_lm !== -1)) ? 
                                            <p> {item.food_name} จำนวน x {guest.shoppingcart_info.shopping_list[item.pos-1].number} เป็นเงิน {item.price_lm*(guest.shoppingcart_info.shopping_list[item.pos-1].number)} บาท</p>
                                            : <p></p>
                                         
                                        
                                    ))}
                                    <p> รวมแล้วทั้งหมด {totallm} รายการ เป็นเงิน {shoppingcart.price_list.price_lm} บาท </p>
                                    
                                    </div>
                                </th>
                            </tr>
                            <tr>
                                <th className="custom">
                                    <span className="FoodH">ราคาอาหารทั้งหมดของ Grab</span>
                                </th>
                                <th className="custom">
                                    <span className="PriceH">ค่าส่ง</span>
                                </th>
                                {(lowgb && (shoppingcart.price_list.price_gb !== 0)) ? <th className="custom4">
                                    <span className="PriceH">ราคารวมทั้งหมดของ Grab (ราคาถูกที่สุด)</span>
                                </th> : <th className="custom">
                                    <span className="PriceH">ราคารวมทั้งหมดของ Grab</span>
                                </th> 
                                }
                            </tr>
                            <tr>
                                <th className="custom2">
                                    <span className="FoodH">{shoppingcart.price_list.price_gb}</span>
                                </th>
                                <th className="custom2">
                                    <span className="PriceH">{shoppingcart.delivery_fee.price_gb}</span>
                                </th>
                                <th className="custom2">
                                    <span className="PriceHover">{guest.finalprice_info.price_gb}</span>
                                    <div className="HoverTotal"> {storefood.map((item: any) => (
                                        ((guest.shoppingcart_info.shopping_list[item.pos-1].number > 0) && (item.price_gb !== -1)) ? 
                                            <p> {item.food_name} จำนวน x {guest.shoppingcart_info.shopping_list[item.pos-1].number} เป็นเงิน {item.price_gb*(guest.shoppingcart_info.shopping_list[item.pos-1].number)} บาท</p>
                                            : <p></p>
                                         
                                        
                                    ))}
                                    <p> รวมแล้วทั้งหมด {totalgb} รายการ เป็นเงิน {shoppingcart.price_list.price_gb} บาท </p>
                                    
                                    </div>
                                </th>
                            </tr>
                            <tr>
                                <th className="custom">
                                    <span className="FoodH">ราคาอาหารทั้งหมดของ Robinhood</span>
                                </th>
                                <th className="custom">
                                    <span className="PriceH">ค่าส่ง</span>
                                </th>
                                {(lowrb) ? <th className="custom4">
                                    <span className="PriceH">ราคารวมทั้งหมดของ Robinhood (ราคาถูกที่สุด)</span>
                                </th> : <th className="custom">
                                    <span className="PriceH">ราคารวมทั้งหมดของ Robinhood</span>
                                </th> 
                                }  
                            </tr>
                            <tr>
                                <th className="custom2">
                                    <span className="FoodH">{shoppingcart.price_list.price_rb}</span>
                                </th>
                                <th className="custom2">
                                    <span className="PriceH">{shoppingcart.delivery_fee.price_rb}</span>
                                </th>
                                <th className="custom2">
                                    <span className="PriceHover">{guest.finalprice_info.price_rb}</span>
                                    <div className="HoverTotal"> {storefood.map((item: any) => (
                                        ((guest.shoppingcart_info.shopping_list[item.pos-1].number > 0) && (item.price_rb !== -1)) ? 
                                            <p> {item.food_name} จำนวน x {guest.shoppingcart_info.shopping_list[item.pos-1].number} เป็นเงิน {item.price_rb*(guest.shoppingcart_info.shopping_list[item.pos-1].number)} บาท</p>
                                            : <p></p>
                                         
                                        
                                    ))}
                                    <p> รวมแล้วทั้งหมด {totalrb} รายการ เป็นเงิน {shoppingcart.price_list.price_rb} บาท </p>
                                    
                                    </div>
                                </th>
                            </tr>
                            <tr>
                                <th className="custom">
                                    <span className="FoodH">ราคาอาหารทั้งหมดของ Foodpanda </span>
                                </th>
                                <th className="custom">
                                    <span className="PriceH">ค่าส่ง</span>
                                </th>
                                {(lowfp) ? <th className="custom4">
                                    <span className="PriceH">ราคารวมทั้งหมดของ Foodpanda (ราคาถูกที่สุด)</span>
                                </th> : <th className="custom">
                                    <span className="PriceH">ราคารวมทั้งหมดของ Foodpanda</span>
                                </th> 
                                }   
                            </tr>
                            <tr>
                                <th className="custom2">
                                    <span className="FoodH">{shoppingcart.price_list.price_fp}</span>
                                </th>
                                <th className="custom2">
                                    <span className="PriceH">{shoppingcart.delivery_fee.price_fp}</span>
                                </th>
                                <th className="custom2">
                                    <span className="PriceHover">{guest.finalprice_info.price_fp}</span>
                                    <div className="HoverTotal"> {storefood.map((item: any) => (
                                        ((guest.shoppingcart_info.shopping_list[item.pos-1].number > 0) && (item.price_fp !== -1)) ? 
                                            <p> {item.food_name} จำนวน x {guest.shoppingcart_info.shopping_list[item.pos-1].number} เป็นเงิน {item.price_fp*(guest.shoppingcart_info.shopping_list[item.pos-1].number)} บาท</p>
                                            : <p></p>
                                         
                                        
                                    ))}
                                    <p> รวมแล้วทั้งหมด {totalfp} รายการ เป็นเงิน {shoppingcart.price_list.price_fp} บาท </p>
                                    
                                    </div>
                                </th>
                            </tr>  
                        </table>
                        <table className="custom">
                            <tr>
                                <th className="custom">
                                    <span className="FoodH">เวลาในการส่งอาหารโดยประมาณ</span>
                                </th>
                                <th className="custom2">
                                    <span className="PriceH">{Math.ceil(shoppingcart.delivery_time/60)} นาที</span>
                                </th>
                            </tr>
                            <tr>
                                <th className="custom">
                                    <span className="FoodH">ระยะทางจากร้านอาหารโดยประมาณ</span>
                                </th>
                                <th className="custom2">
                                    <span className="PriceH">{shoppingcart.distance/1000} กิโลเมตร</span>
                                </th>
                            </tr>
                        </table>
                        <div className="warning"> กรณีที่แอปพลิเคชันใด ๆ ไม่มีเมนูอาหารนั้น ๆ ราคารวมทั้งหมดจะไม่นำเมนูนั้นมารวมด้วย </div>
                </div>

                <div id="Grab" className="tabcontent">
                        <table className="custom">
                            <tr>
                                <th className="custom">
                                    <span className="FoodH">เมนูอาหารใน Grab</span>
                                </th>
                                <th className="custom">
                                    <span className="PriceH">ราคา</span>
                                </th>
                                <th className="custom">
                                    <span className="PriceH">รูปภาพอาหาร</span>
                                </th>
                            </tr>
                            {showfood.map((item: any) => (
                                <tr className="foodlistgb">
                                    <td style={{
                                        backgroundImage: 'url(' + 'http://localhost:3000/images/BGFood.jpeg' + ')',
                                        backgroundSize: '100% 100%',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center',
                                        border: '5px ridge #4F7849',
                                    }}>
                                        {item.food_name} 
                                        
                                        <div className="foodlistgb"> จำนวนที่สั่ง <button className="buttonred" onClick={() => fooddowngb(item.pos-1)}>-</button> 
                                        <span className="numberorder">{(item.price_gb != -1) ? guest.shoppingcart_info.shopping_list[item.pos-1].number : 0}</span> 
                                        <button className="buttongreen" onClick={() => foodupgb(item.pos-1)}>+</button> </div>
                                    </td>
                                    <td style={{
                                        width: '24%',
                                        backgroundImage: 'url(' + 'http://localhost:3000/images/Grab.jpg' + ')',
                                        backgroundSize: '100% 100%',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center',
                                        border: '5px ridge #4F7849',
                                    }}>                                
                                        
                                            <div style={{
                                                fontSize: '50px',
                                                fontFamily: 'Sriracha, cursive',
                                            }}>
                                                {(item.price_gb != -1) ? item.price_gb : "ไม่มีเมนูนี้ในแอปพลิเคชัน"}     
                                            </div>
                                            
                                        
                                                                    
                                    </td> 
                                    <td style={{backgroundImage: 'url(' + item.url + ')',
                                        backgroundSize: '100% 100%',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center',
                                        width: '35%',
                                        border: '5px ridge #4F7849',
                                        }}>
                                    </td> 
                                </tr>
                            ))}    
                        </table>
                        <table className="custom">
                            <tr>
                                <th className="custom">
                                    <span className="FoodH">ราคาอาหารทั้งหมดของ Lineman</span>
                                </th>
                                <th className="custom">
                                    <span className="PriceH">ค่าส่ง</span>
                                </th>
                                {(lowlm) ? <th className="custom4">
                                    <span className="PriceH">ราคารวมทั้งหมดของ Lineman (ราคาถูกที่สุด)</span>
                                </th> : <th className="custom">
                                    <span className="PriceH">ราคารวมทั้งหมดของ Lineman</span>
                                </th> 
                                }
                            </tr>
                            <tr>
                                <th className="custom2">
                                    <span className="FoodH">{shoppingcart.price_list.price_lm}</span>
                                </th>
                                <th className="custom2">
                                    <span className="PriceH">{shoppingcart.delivery_fee.price_lm}</span>
                                </th>
                                <th className="custom2">
                                    <span className="PriceHover">{guest.finalprice_info.price_lm}</span>
                                    <div className="HoverTotal"> {storefood.map((item: any) => (
                                        ((guest.shoppingcart_info.shopping_list[item.pos-1].number > 0) && (item.price_lm !== -1)) ? 
                                            <p> {item.food_name} จำนวน x {guest.shoppingcart_info.shopping_list[item.pos-1].number} เป็นเงิน {item.price_lm*(guest.shoppingcart_info.shopping_list[item.pos-1].number)} บาท</p>
                                            : <p></p>
                                         
                                        
                                    ))}
                                    <p> รวมแล้วทั้งหมด {totallm} รายการ เป็นเงิน {shoppingcart.price_list.price_lm} บาท </p>
                                    
                                    </div>
                                </th>
                            </tr>
                            <tr>
                                <th className="custom">
                                    <span className="FoodH">ราคาอาหารทั้งหมดของ Grab</span>
                                </th>
                                <th className="custom">
                                    <span className="PriceH">ค่าส่ง</span>
                                </th>
                                {(lowgb && (shoppingcart.price_list.price_gb !== 0)) ? <th className="custom4">
                                    <span className="PriceH">ราคารวมทั้งหมดของ Grab (ราคาถูกที่สุด)</span>
                                </th> : <th className="custom">
                                    <span className="PriceH">ราคารวมทั้งหมดของ Grab</span>
                                </th> 
                                }
                            </tr>
                            <tr>
                                <th className="custom2">
                                    <span className="FoodH">{shoppingcart.price_list.price_gb}</span>
                                </th>
                                <th className="custom2">
                                    <span className="PriceH">{shoppingcart.delivery_fee.price_gb}</span>
                                </th>
                                <th className="custom2">
                                    <span className="PriceHover">{guest.finalprice_info.price_gb}</span>
                                    <div className="HoverTotal"> {storefood.map((item: any) => (
                                        ((guest.shoppingcart_info.shopping_list[item.pos-1].number > 0) && (item.price_gb !== -1)) ? 
                                            <p> {item.food_name} จำนวน x {guest.shoppingcart_info.shopping_list[item.pos-1].number} เป็นเงิน {item.price_gb*(guest.shoppingcart_info.shopping_list[item.pos-1].number)} บาท</p>
                                            : <p></p>
                                         
                                        
                                    ))}
                                    <p> รวมแล้วทั้งหมด {totalgb} รายการ เป็นเงิน {shoppingcart.price_list.price_gb} บาท </p>
                                    
                                    </div>
                                </th>
                            </tr>
                            <tr>
                                <th className="custom">
                                    <span className="FoodH">ราคาอาหารทั้งหมดของ Robinhood</span>
                                </th>
                                <th className="custom">
                                    <span className="PriceH">ค่าส่ง</span>
                                </th>
                                {(lowrb) ? <th className="custom4">
                                    <span className="PriceH">ราคารวมทั้งหมดของ Robinhood (ราคาถูกที่สุด)</span>
                                </th> : <th className="custom">
                                    <span className="PriceH">ราคารวมทั้งหมดของ Robinhood</span>
                                </th> 
                                }   
                            </tr>
                            <tr>
                                <th className="custom2">
                                    <span className="FoodH">{shoppingcart.price_list.price_rb}</span>
                                </th>
                                <th className="custom2">
                                    <span className="PriceH">{shoppingcart.delivery_fee.price_rb}</span>
                                </th>
                                <th className="custom2">
                                    <span className="PriceHover">{guest.finalprice_info.price_rb}</span>
                                    <div className="HoverTotal"> {storefood.map((item: any) => (
                                        ((guest.shoppingcart_info.shopping_list[item.pos-1].number > 0) && (item.price_rb !== -1)) ? 
                                            <p> {item.food_name} จำนวน x {guest.shoppingcart_info.shopping_list[item.pos-1].number} เป็นเงิน {item.price_rb*(guest.shoppingcart_info.shopping_list[item.pos-1].number)} บาท</p>
                                            : <p></p>
                                         
                                        
                                    ))}
                                    <p> รวมแล้วทั้งหมด {totalrb} รายการ เป็นเงิน {shoppingcart.price_list.price_rb} บาท </p>
                                    
                                    </div>
                                </th>
                            </tr>
                            <tr>
                                <th className="custom">
                                    <span className="FoodH">ราคาอาหารทั้งหมดของ Foodpanda</span>
                                </th>
                                <th className="custom">
                                    <span className="PriceH">ค่าส่ง</span>
                                </th>
                                {(lowfp) ? <th className="custom4">
                                    <span className="PriceH">ราคารวมทั้งหมดของ Foodpanda (ราคาถูกที่สุด)</span>
                                </th> : <th className="custom">
                                    <span className="PriceH">ราคารวมทั้งหมดของ Foodpanda</span>
                                </th> 
                                }   
                            </tr>
                            <tr>
                                <th className="custom2">
                                    <span className="FoodH">{shoppingcart.price_list.price_fp}</span>
                                </th>
                                <th className="custom2">
                                    <span className="PriceH">{shoppingcart.delivery_fee.price_fp}</span>
                                </th>
                                <th className="custom2">
                                    <span className="PriceHover">{guest.finalprice_info.price_fp}</span>
                                    <div className="HoverTotal"> {storefood.map((item: any) => (
                                        ((guest.shoppingcart_info.shopping_list[item.pos-1].number > 0) && (item.price_fp !== -1)) ? 
                                            <p> {item.food_name} จำนวน x {guest.shoppingcart_info.shopping_list[item.pos-1].number} เป็นเงิน {item.price_fp*(guest.shoppingcart_info.shopping_list[item.pos-1].number)} บาท</p>
                                            : <p></p>
                                         
                                        
                                    ))}
                                    <p> รวมแล้วทั้งหมด {totalfp} รายการ เป็นเงิน {shoppingcart.price_list.price_fp} บาท </p>
                                    
                                    </div>
                                </th>
                            </tr>  
                        </table>
                        <table className="custom">
                            <tr>
                                <th className="custom">
                                    <span className="FoodH">เวลาในการส่งอาหารโดยประมาณ</span>
                                </th>
                                <th className="custom2">
                                    <span className="PriceH">{Math.ceil(shoppingcart.delivery_time/60)} นาที</span>
                                </th>
                            </tr>
                            <tr>
                                <th className="custom">
                                    <span className="FoodH">ระยะทางจากร้านอาหารโดยประมาณ</span>
                                </th>
                                <th className="custom2">
                                    <span className="PriceH">{shoppingcart.distance/1000} กิโลเมตร</span>
                                </th>
                            </tr>
                        </table>
                        <div className="warning"> กรณีที่แอปพลิเคชันใด ๆ ไม่มีเมนูอาหารนั้น ๆ ราคารวมทั้งหมดจะไม่นำเมนูนั้นมารวมด้วย </div>
                </div>

                <div id="Robinhood" className="tabcontent">
                        <table className="custom">
                            <tr>
                                <th className="custom">
                                    <span className="FoodH">เมนูอาหารใน Robinhood</span>
                                </th>
                                <th className="custom">
                                    <span className="PriceH">ราคา</span>
                                </th>
                                <th className="custom">
                                    <span className="PriceH">รูปภาพอาหาร</span>
                                </th>
                            </tr>
                            {showfood.map((item: any) => (
                                <tr className="foodlistrb">
                                    <td style={{
                                        backgroundImage: 'url(' + 'http://localhost:3000/images/BGFood.jpeg' + ')',
                                        backgroundSize: '100% 100%',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center',
                                        border: '5px ridge #4F7849',
                                    }}>
                                        {item.food_name} 
                                        
                                        <div className="foodlistrb"> จำนวนที่สั่ง <button className="buttonred" onClick={() => fooddownrb(item.pos-1)}>-</button> 
                                        <span className="numberorder">{(item.price_rb != -1) ? guest.shoppingcart_info.shopping_list[item.pos-1].number : 0}</span> 
                                        <button className="buttongreen" onClick={() => fooduprb(item.pos-1)}>+</button> </div>
                                    </td>
                                    <td style={{
                                        width: '24%',
                                        backgroundImage: 'url(' + 'http://localhost:3000/images/Robinhood.jpg' + ')',
                                        backgroundSize: '100% 100%',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center',
                                        border: '5px ridge #4F7849',
                                    }}>                                
                                        
                                            <div style={{
                                                fontSize: '50px',
                                                fontFamily: 'Sriracha, cursive',
                                            }}>
                                                {(item.price_rb != -1) ? item.price_rb : "ไม่มีเมนูนี้ในแอปพลิเคชัน"}     
                                            </div>
                                            
                                        
                                                                    
                                    </td> 
                                    <td style={{backgroundImage: 'url(' + item.url + ')',
                                        backgroundSize: '100% 100%',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center',
                                        width: '35%',
                                        border: '5px ridge #4F7849',
                                        }}>
                                    </td>
                                </tr>
                            ))}    
                        </table>
                        <table className="custom">
                            <tr>
                                <th className="custom">
                                    <span className="FoodH">ราคาอาหารทั้งหมดของ Lineman</span>
                                </th>
                                <th className="custom">
                                    <span className="PriceH">ค่าส่ง</span>
                                </th>
                                {(lowlm) ? <th className="custom4">
                                    <span className="PriceH">ราคารวมทั้งหมดของ Lineman (ราคาถูกที่สุด)</span>
                                </th> : <th className="custom">
                                    <span className="PriceH">ราคารวมทั้งหมดของ Lineman</span>
                                </th> 
                                }
                            </tr>
                            <tr>
                                <th className="custom2">
                                    <span className="FoodH">{shoppingcart.price_list.price_lm}</span>
                                </th>
                                <th className="custom2">
                                    <span className="PriceH">{shoppingcart.delivery_fee.price_lm}</span>
                                </th>
                                <th className="custom2">
                                    <span className="PriceHover">{guest.finalprice_info.price_lm}</span>
                                    <div className="HoverTotal"> {storefood.map((item: any) => (
                                        ((guest.shoppingcart_info.shopping_list[item.pos-1].number > 0) && (item.price_lm !== -1)) ? 
                                            <p> {item.food_name} จำนวน x {guest.shoppingcart_info.shopping_list[item.pos-1].number} เป็นเงิน {item.price_lm*(guest.shoppingcart_info.shopping_list[item.pos-1].number)} บาท</p>
                                            : <p></p>
                                         
                                        
                                    ))}
                                    <p> รวมแล้วทั้งหมด {totallm} รายการ เป็นเงิน {shoppingcart.price_list.price_lm} บาท </p>
                                    
                                    </div>
                                </th>
                            </tr>
                            <tr>
                                <th className="custom">
                                    <span className="FoodH">ราคาอาหารทั้งหมดของ Grab</span>
                                </th>
                                <th className="custom">
                                    <span className="PriceH">ค่าส่ง</span>
                                </th>
                                {(lowgb && (shoppingcart.price_list.price_gb !== 0)) ? <th className="custom4">
                                    <span className="PriceH">ราคารวมทั้งหมดของ Grab (ราคาถูกที่สุด)</span>
                                </th> : <th className="custom">
                                    <span className="PriceH">ราคารวมทั้งหมดของ Grab</span>
                                </th> 
                                }
                            </tr>
                            <tr>
                                <th className="custom2">
                                    <span className="FoodH">{shoppingcart.price_list.price_gb}</span>
                                </th>
                                <th className="custom2">
                                    <span className="PriceH">{shoppingcart.delivery_fee.price_gb}</span>
                                </th>
                                <th className="custom2">
                                    <span className="PriceHover">{guest.finalprice_info.price_gb}</span>
                                    <div className="HoverTotal"> {storefood.map((item: any) => (
                                        ((guest.shoppingcart_info.shopping_list[item.pos-1].number > 0) && (item.price_gb !== -1)) ? 
                                            <p> {item.food_name} จำนวน x {guest.shoppingcart_info.shopping_list[item.pos-1].number} เป็นเงิน {item.price_gb*(guest.shoppingcart_info.shopping_list[item.pos-1].number)} บาท</p>
                                            : <p></p>
                                         
                                        
                                    ))}
                                    <p> รวมแล้วทั้งหมด {totalgb} รายการ เป็นเงิน {shoppingcart.price_list.price_gb} บาท </p>
                                    
                                    </div>
                                </th>
                            </tr>
                            <tr>
                                <th className="custom">
                                    <span className="FoodH">ราคาอาหารทั้งหมดของ Robinhood</span>
                                </th>
                                <th className="custom">
                                    <span className="PriceH">ค่าส่ง</span>
                                </th>
                                {(lowrb) ? <th className="custom4">
                                    <span className="PriceH">ราคารวมทั้งหมดของ Robinhood (ราคาถูกที่สุด)</span>
                                </th> : <th className="custom">
                                    <span className="PriceH">ราคารวมทั้งหมดของ Robinhood</span>
                                </th> 
                                }  
                            </tr>
                            <tr>
                                <th className="custom2">
                                    <span className="FoodH">{shoppingcart.price_list.price_rb}</span>
                                </th>
                                <th className="custom2">
                                    <span className="PriceH">{shoppingcart.delivery_fee.price_rb}</span>
                                </th>
                                <th className="custom2">
                                    <span className="PriceHover">{guest.finalprice_info.price_rb}</span>
                                    <div className="HoverTotal"> {storefood.map((item: any) => (
                                        ((guest.shoppingcart_info.shopping_list[item.pos-1].number > 0) && (item.price_rb !== -1)) ? 
                                            <p> {item.food_name} จำนวน x {guest.shoppingcart_info.shopping_list[item.pos-1].number} เป็นเงิน {item.price_rb*(guest.shoppingcart_info.shopping_list[item.pos-1].number)} บาท</p>
                                            : <p></p>
                                         
                                        
                                    ))}
                                    <p> รวมแล้วทั้งหมด {totalrb} รายการ เป็นเงิน {shoppingcart.price_list.price_rb} บาท </p>
                                    
                                    </div>
                                </th>
                            </tr>
                            <tr>
                                <th className="custom">
                                    <span className="FoodH">ราคาอาหารทั้งหมดของ Foodpanda</span>
                                </th>
                                <th className="custom">
                                    <span className="PriceH">ค่าส่ง</span>
                                </th>
                                {(lowfp) ? <th className="custom4">
                                    <span className="PriceH">ราคารวมทั้งหมดของ Foodpanda (ราคาถูกที่สุด)</span>
                                </th> : <th className="custom">
                                    <span className="PriceH">ราคารวมทั้งหมดของ Foodpanda</span>
                                </th> 
                                }  
                            </tr>
                            <tr>
                                <th className="custom2">
                                    <span className="FoodH">{shoppingcart.price_list.price_fp}</span>
                                </th>
                                <th className="custom2">
                                    <span className="PriceH">{shoppingcart.delivery_fee.price_fp}</span>
                                </th>
                                <th className="custom2">
                                    <span className="PriceHover">{guest.finalprice_info.price_fp}</span>
                                    <div className="HoverTotal"> {storefood.map((item: any) => (
                                        ((guest.shoppingcart_info.shopping_list[item.pos-1].number > 0) && (item.price_fp !== -1)) ? 
                                            <p> {item.food_name} จำนวน x {guest.shoppingcart_info.shopping_list[item.pos-1].number} เป็นเงิน {item.price_fp*(guest.shoppingcart_info.shopping_list[item.pos-1].number)} บาท</p>
                                            : <p></p>
                                         
                                        
                                    ))}
                                    <p> รวมแล้วทั้งหมด {totalfp} รายการ เป็นเงิน {shoppingcart.price_list.price_fp} บาท </p>
                                    
                                    </div>
                                </th>
                            </tr>  
                        </table>
                        <table className="custom">
                            <tr>
                                <th className="custom">
                                    <span className="FoodH">เวลาในการส่งอาหารโดยประมาณ</span>
                                </th>
                                <th className="custom2">
                                    <span className="PriceH">{Math.ceil(shoppingcart.delivery_time/60)} นาที</span>
                                </th>
                            </tr>
                            <tr>
                                <th className="custom">
                                    <span className="FoodH">ระยะทางจากร้านอาหารโดยประมาณ</span>
                                </th>
                                <th className="custom2">
                                    <span className="PriceH">{shoppingcart.distance/1000} กิโลเมตร</span>
                                </th>
                            </tr>
                        </table>
                        <div className="warning"> กรณีที่แอปพลิเคชันใด ๆ ไม่มีเมนูอาหารนั้น ๆ ราคารวมทั้งหมดจะไม่นำเมนูนั้นมารวมด้วย </div>
                </div>

                <div id="Foodpanda" className="tabcontent">
                        <table className="custom">
                            <tr>
                                <th className="custom">
                                    <span className="FoodH">เมนูอาหารใน Foodpanda</span>
                                </th>
                                <th className="custom">
                                    <span className="PriceH">ราคา</span>
                                </th>
                                <th className="custom">
                                    <span className="PriceH">รูปภาพอาหาร</span>
                                </th>
                            </tr>
                            {showfood.map((item: any) => (
                                <tr className="foodlistfp">
                                    <td style={{
                                        backgroundImage: 'url(' + 'http://localhost:3000/images/BGFood.jpeg' + ')',
                                        backgroundSize: '100% 100%',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center',
                                        border: '5px ridge #4F7849',
                                    }}>
                                        {item.food_name} 
                                        
                                        <div className="foodlistfp"> จำนวนที่สั่ง <button className="buttonred" onClick={() => fooddownfp(item.pos-1)}>-</button> 
                                        <span className="numberorder">{(item.price_fp != -1) ? guest.shoppingcart_info.shopping_list[item.pos-1].number : 0}</span> 
                                        <button className="buttongreen" onClick={() => foodupfp(item.pos-1)}>+</button> </div>
                                    </td>
                                    <td style={{
                                        width: '24%',
                                        backgroundImage: 'url(' + 'http://localhost:3000/images/Foodpanda.png' + ')',
                                        backgroundSize: '100% 100%',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center',
                                        border: '5px ridge #4F7849',
                                    }}>                                
                                        
                                            <div style={{
                                                fontSize: '50px',
                                                fontFamily: 'Sriracha, cursive',
                                            }}>
                                                {(item.price_fp != -1) ? item.price_fp : "ไม่มีเมนูนี้ในแอปพลิเคชัน"}     
                                            </div>
                                            
                                        
                                                                    
                                    </td> 
                                    <td style={{backgroundImage: 'url(' + item.url + ')',
                                        backgroundSize: '100% 100%',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center',
                                        width: '35%',
                                        border: '5px ridge #4F7849',
                                        }}>
                                    </td>
                                </tr>
                            ))}    
                        </table>
                        <table className="custom">
                            <tr>
                                <th className="custom">
                                    <span className="FoodH">ราคาอาหารทั้งหมดของ Lineman</span>
                                </th>
                                <th className="custom">
                                    <span className="PriceH">ค่าส่ง</span>
                                </th>
                                {(lowlm) ? <th className="custom4">
                                    <span className="PriceH">ราคารวมทั้งหมดของ Lineman (ราคาถูกที่สุด)</span>
                                </th> : <th className="custom">
                                    <span className="PriceH">ราคารวมทั้งหมดของ Lineman</span>
                                </th> 
                                }
                            </tr>
                            <tr>
                                <th className="custom2">
                                    <span className="FoodH">{shoppingcart.price_list.price_lm}</span>
                                </th>
                                <th className="custom2">
                                    <span className="PriceH">{shoppingcart.delivery_fee.price_lm}</span>
                                </th>
                                <th className="custom2">
                                    <span className="PriceHover">{guest.finalprice_info.price_lm}</span>
                                    <div className="HoverTotal"> {storefood.map((item: any) => (
                                        ((guest.shoppingcart_info.shopping_list[item.pos-1].number > 0) && (item.price_lm !== -1)) ? 
                                            <p> {item.food_name} จำนวน x {guest.shoppingcart_info.shopping_list[item.pos-1].number} เป็นเงิน {item.price_lm*(guest.shoppingcart_info.shopping_list[item.pos-1].number)} บาท</p>
                                            : <p></p>
                                         
                                        
                                    ))}
                                    <p> รวมแล้วทั้งหมด {totallm} รายการ เป็นเงิน {shoppingcart.price_list.price_lm} บาท </p>
                                    
                                    </div>
                                </th>
                            </tr>
                            <tr>
                                <th className="custom">
                                    <span className="FoodH">ราคาอาหารทั้งหมดของ Grab</span>
                                </th>
                                <th className="custom">
                                    <span className="PriceH">ค่าส่ง</span>
                                </th>
                                {(lowgb && (shoppingcart.price_list.price_gb !== 0)) ? <th className="custom4">
                                    <span className="PriceH">ราคารวมทั้งหมดของ Grab (ราคาถูกที่สุด)</span>
                                </th> : <th className="custom">
                                    <span className="PriceH">ราคารวมทั้งหมดของ Grab</span>
                                </th> 
                                }
                            </tr>
                            <tr>
                                <th className="custom2">
                                    <span className="FoodH">{shoppingcart.price_list.price_gb}</span>
                                </th>
                                <th className="custom2">
                                    <span className="PriceH">{shoppingcart.delivery_fee.price_gb}</span>
                                </th>
                                <th className="custom2">
                                    <span className="PriceHover">{guest.finalprice_info.price_gb}</span>
                                    <div className="HoverTotal"> {storefood.map((item: any) => (
                                        ((guest.shoppingcart_info.shopping_list[item.pos-1].number > 0) && (item.price_gb !== -1)) ? 
                                            <p> {item.food_name} จำนวน x {guest.shoppingcart_info.shopping_list[item.pos-1].number} เป็นเงิน {item.price_gb*(guest.shoppingcart_info.shopping_list[item.pos-1].number)} บาท</p>
                                            : <p></p>
                                         
                                        
                                    ))}
                                    <p> รวมแล้วทั้งหมด {totalgb} รายการ เป็นเงิน {shoppingcart.price_list.price_gb} บาท </p>
                                    
                                    </div>
                                </th>
                            </tr>
                            <tr>
                                <th className="custom">
                                    <span className="FoodH">ราคาอาหารทั้งหมดของ Robinhood</span>
                                </th>
                                <th className="custom">
                                    <span className="PriceH">ค่าส่ง</span>
                                </th>
                                {(lowrb) ? <th className="custom4">
                                    <span className="PriceH">ราคารวมทั้งหมดของ Robinhood (ราคาถูกที่สุด)</span>
                                </th> : <th className="custom">
                                    <span className="PriceH">ราคารวมทั้งหมดของ Robinhood</span>
                                </th> 
                                }    
                            </tr>
                            <tr>
                                <th className="custom2">
                                    <span className="FoodH">{shoppingcart.price_list.price_rb}</span>
                                </th>
                                <th className="custom2">
                                    <span className="PriceH">{shoppingcart.delivery_fee.price_rb}</span>
                                </th>
                                <th className="custom2">
                                    <span className="PriceHover">{guest.finalprice_info.price_rb}</span>
                                    <div className="HoverTotal"> {storefood.map((item: any) => (
                                        ((guest.shoppingcart_info.shopping_list[item.pos-1].number > 0) && (item.price_rb !== -1)) ? 
                                            <p> {item.food_name} จำนวน x {guest.shoppingcart_info.shopping_list[item.pos-1].number} เป็นเงิน {item.price_rb*(guest.shoppingcart_info.shopping_list[item.pos-1].number)} บาท</p>
                                            : <p></p>
                                         
                                        
                                    ))}
                                    <p> รวมแล้วทั้งหมด {totalrb} รายการ เป็นเงิน {shoppingcart.price_list.price_rb} บาท </p>
                                    
                                    </div>
                                </th>
                            </tr>
                            <tr>
                                <th className="custom">
                                    <span className="FoodH">ราคาอาหารทั้งหมดของ Foodpanda</span>
                                </th>
                                <th className="custom">
                                    <span className="PriceH">ค่าส่ง</span>
                                </th>
                                {(lowfp) ? <th className="custom4">
                                    <span className="PriceH">ราคารวมทั้งหมดของ Foodpanda (ราคาถูกที่สุด)</span>
                                </th> : <th className="custom">
                                    <span className="PriceH">ราคารวมทั้งหมดของ Foodpanda</span>
                                </th> 
                                }  
                            </tr>
                            <tr>
                                <th className="custom2">
                                    <span className="FoodH">{shoppingcart.price_list.price_fp}</span>
                                </th>
                                <th className="custom2">
                                    <span className="PriceH">{shoppingcart.delivery_fee.price_fp}</span>
                                </th>
                                <th className="custom2">
                                    <span className="PriceHover">{guest.finalprice_info.price_fp}</span>
                                    <div className="HoverTotal"> {storefood.map((item: any) => (
                                        ((guest.shoppingcart_info.shopping_list[item.pos-1].number > 0) && (item.price_fp !== -1)) ? 
                                            <p> {item.food_name} จำนวน x {guest.shoppingcart_info.shopping_list[item.pos-1].number} เป็นเงิน {item.price_fp*(guest.shoppingcart_info.shopping_list[item.pos-1].number)} บาท</p>
                                            : <p></p>
                                         
                                        
                                    ))}
                                    <p> รวมแล้วทั้งหมด {totalfp} รายการ เป็นเงิน {shoppingcart.price_list.price_fp} บาท </p>
                                    
                                    </div>
                                </th>
                            </tr>  
                        </table>
                        <table className="custom">
                            <tr>
                                <th className="custom">
                                    <span className="FoodH">เวลาในการส่งอาหารโดยประมาณ</span>
                                </th>
                                <th className="custom2">
                                    <span className="PriceH">{Math.ceil(shoppingcart.delivery_time/60)} นาที</span>
                                </th>
                            </tr>
                            <tr>
                                <th className="custom">
                                    <span className="FoodH">ระยะทางจากร้านอาหารโดยประมาณ</span>
                                </th>
                                <th className="custom2">
                                    <span className="PriceH">{shoppingcart.distance/1000} กิโลเมตร</span>
                                </th>
                            </tr>
                        </table>
                        <div className="warning"> กรณีที่แอปพลิเคชันใด ๆ ไม่มีเมนูอาหารนั้น ๆ ราคารวมทั้งหมดจะไม่นำเมนูนั้นมารวมด้วย </div>
                        
                </div>
                
                {scriptLoaded && guest !== 'test' && restaurant !== 'test' && (
                                    <MapRestaurant
                                    mapType={google.maps.MapTypeId.ROADMAP}
                                    mapTypeControl={true}
                                    restaurant={restaurant}
                                    guest={guest}
                                    />
                )}
                                
                        
                
            </div>
         );
    }
    else {
        return (
            <div> 
        
            </div>
        )
    }
    
  }
  
  export default Restaurant;
