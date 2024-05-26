import mongoose, { Schema, models } from "mongoose";

export interface IImage extends Document {
  title: string;
  transformationType: string;
  publicId: string;
  secureUrl: URL;
  width?: number;
  height?: number;
  config?: Record<string, unknown>;
  transformationUrl?: URL;
  aspectRation?: string;
  color?: string;
  prompt?: string;
  author?: {
    _id: string;
    firstname: string;
    lastname: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

const ImageSchema = new Schema<IImage>({
  title: { type: String, required: true },
  transformationType: { type: String, required: true },
  publicId: { type: String, required: true },
  secureUrl: { type: URL, required: true },
  width: Number,
  height: Number,
  config: Object,
  transformationUrl: URL,
  aspectRation: String,
  color: String,
  prompt: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

const Image = models?.Image || mongoose.model("Image", ImageSchema);

export default Image;
