import IAPIService from "../Interfaces/IAPIService";
import IHttpClient from "../Interfaces/IHttpClient";
import MovieCardModel from "../Interfaces/IMovieCardModel";
import AxiosHttpClient from "../Wrappers/AxiosHttpClient";

class TMDBService implements IAPIService {

  private readonly api_Url: string = 'https://api.themoviedb.org/3/';
  private readonly apiKey: string = process.env.REACT_APP_MOVIE_API_KEY || '';
  private readonly httpClient: IHttpClient = new AxiosHttpClient();

  public async getMovies(searchKey?: string, page?: number): Promise<MovieCardModel[]> {
    const type: string = searchKey ? "search" : "discover";
    let url = `${this.api_Url}${type}/movie?api_key=${this.apiKey}`;

    if (searchKey) {
      url += `&query=${encodeURIComponent(searchKey)}`;
    }
    if (page) {
      url += `&page=${page}`;
    }

    try {
      const response = await this.httpClient.get<MovieCardModel[]>(url);
      console.log(response)
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async getVideos(movieId: number): Promise<any> {
    const url = `${this.api_Url}movie/${movieId}/videos?api_key=${this.apiKey}`;

    try {
      const response = await this.httpClient.get<any>(url);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export const TMDB = new TMDBService();
