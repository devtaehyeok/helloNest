import { isNumber } from "class-validator";

export class Movie {
  id: number;
  title: string;
  year: number;
  genres: string[];
}
