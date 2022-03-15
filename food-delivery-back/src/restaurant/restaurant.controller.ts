import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ParseObjectIdPipe } from '../common/pipes';
import { ObjectID } from 'typeorm';
import Restaurant from './entities/restaurant.entity';
import { RestaurantService } from './restaurant.service';
import Food from './entities/food.entity';
import Finalprice from './entities/finalprice.entity';
import Guest from './entities/guest.entity';
import Shoppingcart from './entities/Shoppingcart.entity';
import { CreateGuestDto } from './dto/create-guest.dto';
import { UpdateShoppingcartDto } from './dto_update/update-shoppingcart.dto';
import { UpdateFinalpriceDto } from './dto_update/update-finalprice.dto';
import { CreateShoppingcartDto } from './dto/create-shoppingcart.dto';
import { CreateFinalpriceDto } from './dto/create-finalprice.dto';

@Controller('/')
export class RestaurantController {
    constructor(private restaurantService: RestaurantService) {}

    @Post('guest')
    async createGuest(@Body() createGuestDto: CreateGuestDto){
      return this.restaurantService.createGuest(createGuestDto);
    }

    @Post('shoppingcart')
    async createShoppingCart(@Body() createShoppingcartDto: CreateShoppingcartDto){
      return this.restaurantService.createShoppingCart(createShoppingcartDto);
    }

    @Post('finalprice')
    async createFinalPrice(@Body() createFinalpriceDto: CreateFinalpriceDto){
      return this.restaurantService.createFinalPrice(createFinalpriceDto);
    }

    @Get('guest/findbylatlng/:latitude/:longitude')
    async findGuestByLatLng(@Param('latitude') latitude: string, @Param('longitude') longitude: string): Promise<any> {
      return this.restaurantService.findGuestByLatLng(latitude,longitude);
    }

    @Get('guest/location/:guest_id')
    async findGuestLocation(@Param('guest_id', ParseObjectIdPipe) guest_id: ObjectID): Promise<any> {
      return this.restaurantService.findGuestLocation(guest_id);
    }

    @Get('guest/:restaurant_id/:guest_id')
    async findFinalpriceAndShoppingcartByGuest_ID(@Param('restaurant_id', ParseObjectIdPipe) restaurant_id: ObjectID,
    @Param('guest_id', ParseObjectIdPipe) guest_id: ObjectID): Promise<any> {
      return this.restaurantService.findFinalpriceAndShoppingcartByGuest_ID(restaurant_id,guest_id);
    }

    @Get('restaurant/:restaurant_id')
    async findAllFoodByRestaurant_ID(@Param('restaurant_id', ParseObjectIdPipe) restaurant_id: ObjectID): Promise<any> {
      return this.restaurantService.findAllFoodByRestaurant_ID(restaurant_id);
    }

    @Get('shoppingcart/:restaurant_id/:guest_id')
    async findShoppingCartByID(@Param('restaurant_id', ParseObjectIdPipe) restaurant_id: ObjectID, @Param('guest_id', ParseObjectIdPipe) guest_id: ObjectID): Promise<any> {
      return this.restaurantService.findShoppingCartByID(restaurant_id,guest_id);
    }


    @Patch('shoppingcart/:restaurant_id/:guest_id')
    async updateShoppingCart(@Param('restaurant_id', ParseObjectIdPipe) restaurant_id: ObjectID, @Param('guest_id', ParseObjectIdPipe) guest_id: ObjectID
    , @Body() updateShoppingcartDto: UpdateShoppingcartDto): Promise<any> {
      return this.restaurantService.updateShoppingCart(restaurant_id,guest_id,updateShoppingcartDto);
    }

    @Patch('finalprice/:restaurant_id/:guest_id')
    async updateFinalprice(@Param('restaurant_id', ParseObjectIdPipe) restaurant_id: ObjectID, @Param('guest_id', ParseObjectIdPipe) guest_id: ObjectID
    , @Body() updateFinalpriceDto: UpdateFinalpriceDto): Promise<any> {
      return this.restaurantService.updateFinalprice(restaurant_id,guest_id,updateFinalpriceDto);
    }

    @Get('restaurant')
    async findallRestaurant(): Promise<Restaurant[]> {
      return this.restaurantService.findAllRestaurant();
    }

    @Get('food')
    async findallFood(): Promise<Food[]> {
      return this.restaurantService.findAllFood();
    }
    
    @Get('finalprice')
    async findallFinalprice(): Promise<Finalprice[]> {
      return this.restaurantService.findAllFinalprice();
    }

    @Get('guest')
    async findallGuest(): Promise<Guest[]> {
      return this.restaurantService.findAllGuest();
    }

    @Get('shoppingcart')
    async findallShoppingcart(): Promise<Shoppingcart[]> {
      return this.restaurantService.findAllShoppingcart();
    }
}