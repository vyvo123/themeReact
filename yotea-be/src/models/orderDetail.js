import { Schema, model, ObjectId } from "mongoose";

const orderSchema = new Schema(
  {
    orderId: {
      type: ObjectId,
      ref: "Order",
    },
    productId: {
      type: ObjectId,
      ref: "Product",
    },
    productPrice: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    ice: {
      type: Number,
      required: true,
    },
    sugar: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

orderSchema.index({ "$**": "text" });

export default model("OrderDetail", orderSchema);
