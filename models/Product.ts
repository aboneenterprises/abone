import { Schema, model, models } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      default: [],
      validate: {
        validator: (value: string[]) => value.length <= 6,
        message: "A product can have up to 6 images.",
      },
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    stock: {
      type: String,
      enum: ["inStock", "outOfStock"],
      default: "inStock",
    },
  },
  {
    timestamps: true,
  },
);

export const Product = models.Product || model("Product", productSchema);
