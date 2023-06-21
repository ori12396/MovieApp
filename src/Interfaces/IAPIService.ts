import { promises } from "dns";
import IMovieCardModel from "./IMovieCardModel";

export default interface IAPIService{
    getMovies(searchKey?:string,page?:number): Promise<IMovieCardModel[]>;
    getVideos(id:number):Promise<any>;
}
