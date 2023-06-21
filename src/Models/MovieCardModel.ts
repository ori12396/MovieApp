import IMovieCardModel from "../Interfaces/IMovieCardModel";

export class MovieCardModel implements IMovieCardModel {
  id: number;
  title: string;
  poster: string;
  overview: string;
  back_img: string;
  date: string;
  adult: boolean;
  tickets: number;

  constructor(id:number,title:string, poster:string,overview:string, back_img: string, date: string, adult: boolean) {
    this.id = id;
    this.title = title;
    this.poster = poster;
    this.overview = overview;
    this.back_img = back_img;
    this.date = date;
    this.adult = adult;
    this.tickets = 120;
  }
}
