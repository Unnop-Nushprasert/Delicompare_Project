import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectID } from 'mongodb';
import Restaurant from './entities/restaurant.entity';
import Food from './entities/food.entity';
import Finalprice from './entities/finalprice.entity';
import Guest from './entities/guest.entity';
import Shoppingcart from './entities/Shoppingcart.entity';
import { CreateGuestDto } from './dto/create-guest.dto';
import { UpdateShoppingcartDto } from './dto_update/update-shoppingcart.dto';
import { UpdateFinalpriceDto } from './dto_update/update-finalprice.dto';
import { CreateShoppingcartDto } from './dto/create-shoppingcart.dto';
import { CreateFinalpriceDto } from './dto/create-finalprice.dto';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,    
    @InjectRepository(Food)
    private foodRepository: Repository<Food>,  
    @InjectRepository(Finalprice)
    private finalpriceRepository: Repository<Finalprice>,  
    @InjectRepository(Guest)
    private guestRepository: Repository<Guest>,  
    @InjectRepository(Shoppingcart)
    private shoppingcartRepository: Repository<Shoppingcart>,    
  ) {}

  async createGuest(createGuestDto: CreateGuestDto) {
    return this.guestRepository.save(createGuestDto);
  }

  async createShoppingCart(createShoppingcartDto: CreateShoppingcartDto) {
    createShoppingcartDto.restaurant_id = new ObjectID(createShoppingcartDto.restaurant_id);
    createShoppingcartDto.guest_id = new ObjectID(createShoppingcartDto.guest_id);
    createShoppingcartDto.shopping_list.forEach((item: any) => {
      item.food_id = new ObjectID(item.food_id);
    });
    return this.shoppingcartRepository.save(createShoppingcartDto);
  }

  async createFinalPrice(createFinalpriceDto: CreateFinalpriceDto) {
    createFinalpriceDto.cart_id = new ObjectID(createFinalpriceDto.cart_id);
    return this.finalpriceRepository.save(createFinalpriceDto);
  }

  async findGuestByLatLng(latitude: string, longitude: string) {
    let guests: Guest[];
    await this.guestRepository.find({where: {latitude: latitude, longitude: longitude}})
      .then(setGuest => {
        guests = setGuest;
      });
    if (guests.length === 0) {
      return [{ guest_id: "000000000000000000000000"}];
    }
    else {
      return guests;
    }
    
  }

  async findGuestLocation(guest_id:ObjectID): Promise<Guest[]> {
    return this.guestRepository.find({where: {_id: guest_id}});
  }

  async findShoppingCartByID(restaurantID: ObjectID, guestID: ObjectID){
    let shoppingcart: Shoppingcart;
    await this.shoppingcartRepository.findOne({where:{ restaurant_id: restaurantID, guest_id: guestID}})
      .then(setShop => {
        shoppingcart = setShop;
      }); 
    console.log(shoppingcart);
    if (shoppingcart === undefined) {
      return { restaurant_id: "000000000000000000000000"};
    }
    else {
      return shoppingcart;
    }
  }

  async updateShoppingCart(restaurantID: ObjectID, guestID: ObjectID, updateShoppingcartDto: UpdateShoppingcartDto){
    if (updateShoppingcartDto.shopping_list !== undefined) {
      updateShoppingcartDto.shopping_list.forEach((item: any) => {
        item.food_id = new ObjectID(item.food_id);
      });
    };
    let shoppingcart: Shoppingcart;
    await this.shoppingcartRepository.findOne({where:{restaurant_id: restaurantID, guest_id: guestID}})
      .then(result => {
          shoppingcart = result;
      });
    updateShoppingcartDto.delivery_fee = {price_lm: 0, price_gb: 0,price_rb: 0,price_fp: 0};
    updateShoppingcartDto.price_list = {price_lm: 0, price_gb: 0,price_rb: 0,price_fp: 0};
    //console.log(shoppingcart);
    let newdistance = shoppingcart.distance;

    let foods: Food[];
    await this.foodRepository.find({where:{restaurant_id: restaurantID}})
      .then(results => {
          foods = results;
      });
    console.log(foods)

    let sumlm = 0;
    let sumgb = 0;
    let sumfp = 0;
    let sumrb = 0;
    let foodpos: any;
    let count = 1;

    shoppingcart.shopping_list.forEach((item: any) => {
      foodpos = foods.findIndex(element => element.pos === count);
      if (foods[foodpos].price_lm !== -1) {
        sumlm += item.number*foods[foodpos].price_lm;
      }
      if (foods[foodpos].price_gb !== -1) {
        sumgb += item.number*foods[foodpos].price_gb;
      }
      if (foods[foodpos].price_fp !== -1) {
        sumfp += item.number*foods[foodpos].price_fp;
      }
      if (foods[foodpos].price_rb !== -1) {
        sumrb += item.number*foods[foodpos].price_rb;
      }
      count++;
    });

    updateShoppingcartDto.price_list.price_lm = sumlm;
    updateShoppingcartDto.price_list.price_gb = sumgb;
    updateShoppingcartDto.price_list.price_fp = sumfp;
    updateShoppingcartDto.price_list.price_rb = sumrb;

    if (newdistance !== 0) {
      if (Math.ceil(newdistance/1000) > 0) {
        updateShoppingcartDto.delivery_fee.price_lm = 55 + ((Math.ceil(newdistance/1000)-1)*9);
      }
      else {
        updateShoppingcartDto.delivery_fee.price_lm = 55;
      }
      if (Math.ceil(newdistance/1000) > 5) {
        updateShoppingcartDto.delivery_fee.price_gb = 10 + ((Math.ceil(newdistance/1000)-5)*10);
      }
      else {
        updateShoppingcartDto.delivery_fee.price_gb = 10;
      }
      updateShoppingcartDto.delivery_fee.price_fp = 40;
      if (Math.ceil(newdistance/1000) > 5) {
        updateShoppingcartDto.delivery_fee.price_rb = 25 + ((Math.ceil(newdistance/1000)-5)*9);
      }
      else {
        updateShoppingcartDto.delivery_fee.price_rb = 25;
      }
    
    }
    
    /*
    let finallm = sumlm + shoppingcart.delivery_fee.price_lm;
    let finalgb = sumgb + shoppingcart.delivery_fee.price_gb;
    let finalrb = sumrb + shoppingcart.delivery_fee.price_rb;
    let finalfp = sumfp + shoppingcart.delivery_fee.price_fp;

    let updateFinalpriceDto: UpdateFinalpriceDto;
    updateFinalpriceDto.price_lm = finallm;
    updateFinalpriceDto.price_gb = finalgb;
    updateFinalpriceDto.price_rb = finalrb;
    updateFinalpriceDto.price_fp = finalfp;

    this.finalpriceRepository.update({cart_id: shoppingcart.shoppingcart_id}, updateFinalpriceDto);
    */

    return this.shoppingcartRepository.update({restaurant_id: restaurantID, guest_id: guestID}, updateShoppingcartDto);
  }

  async updateFinalprice(restaurantID: ObjectID, guestID: ObjectID, updateFinalpriceDto: UpdateFinalpriceDto){
    let shoppingcart: Shoppingcart;
    await this.shoppingcartRepository.findOne({where:{restaurant_id: restaurantID, guest_id: guestID}})
      .then(result => {
          shoppingcart = result;
      });
    
    let finallm = shoppingcart.price_list.price_lm + shoppingcart.delivery_fee.price_lm;
    let finalgb = shoppingcart.price_list.price_gb + shoppingcart.delivery_fee.price_gb;
    let finalrb = shoppingcart.price_list.price_rb + shoppingcart.delivery_fee.price_rb;
    let finalfp = shoppingcart.price_list.price_fp + shoppingcart.delivery_fee.price_fp;

    updateFinalpriceDto.price_lm = finallm;
    updateFinalpriceDto.price_gb = finalgb;
    updateFinalpriceDto.price_rb = finalrb;
    updateFinalpriceDto.price_fp = finalfp;

    return this.finalpriceRepository.update({cart_id: shoppingcart.shoppingcart_id}, updateFinalpriceDto);
  }


  async findFinalpriceAndShoppingcartByGuest_ID(restaurant_id: ObjectID, guest_id:ObjectID): Promise<any> {
    let guest: Guest;
    let finalprice: Finalprice;
    let shoppingcart: Shoppingcart;
    await this.guestRepository.findOne({where:{ _id: guest_id}})
      .then(result => {
          guest = result;
      });
    await this.shoppingcartRepository.findOne({where:{restaurant_id: restaurant_id, guest_id: guest_id}})
      .then(result => {
          shoppingcart = result;
      });
    await this.finalpriceRepository.findOne({where:{ cart_id: shoppingcart.shoppingcart_id}})
      .then(result => {
          finalprice = result;
      });
    let obj = { guest_info: guest, shoppingcart_info: shoppingcart, finalprice_info: finalprice};
    return obj;
  }

  async findAllFoodByRestaurant_ID(restaurant_id:ObjectID): Promise<any> {
    let foods: Food[];
    let restau: Restaurant;
    await this.restaurantRepository.findOne({where:{ _id: restaurant_id}})
      .then(result => {
          restau = result;
      });
    await this.foodRepository.find({where:{restaurant_id: restaurant_id}})
      .then(results => {
          foods = results;
      });
    console.log(restau);
    console.log(foods);
    let obj = { restaurant_info: restau, food_info: foods};
    return obj;
  }


  async findAllRestaurant(): Promise<Restaurant[]> {
    return this.restaurantRepository.find();
  }

  async findAllFood(): Promise<Food[]> {
    return this.foodRepository.find();
  }

  async findAllFinalprice(): Promise<Finalprice[]> {
    return this.finalpriceRepository.find();
  }

  async findAllGuest(): Promise<Guest[]> {
    return this.guestRepository.find();
  }

  async findAllShoppingcart(): Promise<Shoppingcart[]> {
    return this.shoppingcartRepository.find();
  }

}