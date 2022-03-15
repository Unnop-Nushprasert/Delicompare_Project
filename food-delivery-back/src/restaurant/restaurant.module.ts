import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantController } from './restaurant.controller';
import Restaurant from './entities/restaurant.entity';
import { RestaurantService } from './restaurant.service';
import Food from './entities/food.entity';
import Finalprice from './entities/finalprice.entity';
import Guest from './entities/guest.entity';
import Shoppingcart from './entities/Shoppingcart.entity';

@Module({
    imports: [
      TypeOrmModule.forFeature([Restaurant, Food, Finalprice, Guest, Shoppingcart])  
    ],
    controllers: [RestaurantController],
    providers: [RestaurantService],
    exports: [RestaurantService]
})
  
export class RestaurantModule {}