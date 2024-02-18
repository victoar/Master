import {Cinema} from "./cinemaModel";
import {Movie} from "./movieModel";

export class Schedule {
  id: number;
  day: string;
  starttime: string;
  price: number;
  cinema: Cinema;
  movie: Movie;
}
