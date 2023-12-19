import { GIF } from "./gif.interface";

export default interface User {
  name: string;
  email: string;
  favorites: GIF[];
}
