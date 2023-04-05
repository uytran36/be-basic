import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CartDocument = HydratedDocument<Cart>;

@Schema()
export class Cart {
  @Prop()
  userId: number;

  @Prop({ type: [{ beerId: Number, quantity: Number }], _id: false })
  beers: { beerId: number; quantity: number }[];

  @Prop()
  isPayed: boolean;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
