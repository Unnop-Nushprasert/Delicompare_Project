import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import Restaurant from './restaurant/entities/restaurant.entity';
import { RestaurantModule } from './restaurant/restaurant.module';
import Food from './restaurant/entities/food.entity';
import Finalprice from './restaurant/entities/finalprice.entity';
import Guest from './restaurant/entities/guest.entity';
import Shoppingcart from './restaurant/entities/Shoppingcart.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      database: 'foodshop',
      entities: [Restaurant, Food, Finalprice, Guest, Shoppingcart],
      synchronize: true,
      useUnifiedTopology: true
    }),
    RestaurantModule
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
