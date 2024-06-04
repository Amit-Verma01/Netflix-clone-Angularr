import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieDetails } from '../interfaces/movie-details';
import { Movies } from '../interfaces/movies';
import { Credits, Cast } from '../interfaces/credits';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private baseURL = "https://api.themoviedb.org/3";
  private apikey = "ed8c73c9552df082b5d7a847616ead4a";
  Movies!: Movies;
  Movie!: MovieDetails;
  Cast!: Credits;

  constructor (private http: HttpClient) { }


  sliderMovies (): Observable<Movies> {
    return this.http.get<Movies>(`${this.baseURL}/discover/movie?api_key=${this.apikey}&with_genres=53`);

  }
  getTrendingMovies (): Observable<Movies> {
    return this.http.get<Movies>(`${this.baseURL}/trending/movie/week?api_key=${this.apikey}`);
  }
  
  getDiscoverMovies (): Observable<Movies> {
    return this.http.get<Movies>(`${this.baseURL}/discover/movie?api_key=${this.apikey}&include_adult=false&include_video=true&page=1&`);
  }
  
  getThrillerMovies (): Observable<Movies> {
    return this.http.get<Movies>(`${this.baseURL}/discover/movie?api_key=${this.apikey}&with_genres=53`);
  }

  getActionMovies (): Observable<Movies> {
    return this.http.get<Movies>(`${this.baseURL}/discover/movie?api_key=${this.apikey}&with_genres=28`);
  }

  getAdventureMovies (): Observable<Movies> {
    return this.http.get<Movies>(`${this.baseURL}/discover/movie?api_key=${this.apikey}&with_genres=12`);
  }

  getAnimationMovies (): Observable<Movies> {
    return this.http.get<Movies>(`${this.baseURL}/discover/movie?api_key=${this.apikey}&with_genres=16`);
  }

  getComedyMovies (): Observable<Movies> {
    return this.http.get<Movies>(`${this.baseURL}/discover/movie?api_key=${this.apikey}&with_genres=35`);
  }

  getDocumentaries (): Observable<Movies>  {
    return this.http.get<Movies>(`${this.baseURL}/discover/movie?api_key=${this.apikey}&with_genres=99`);
  }

  getScienceFictionMovies (): Observable<Movies> {
    return this.http.get<Movies>(`${this.baseURL}/discover/movie?api_key=${this.apikey}&with_genres=878`);
  }

  getMovieDetails (id: any): Observable<Movies> {
    return this.http.get<Movies>(`${this.baseURL}/movie/${id}?api_key=${this.apikey}`)
  }
  
  getMovieCast (id: any): Observable<Cast> {
    return this.http.get<Cast>(`${this.baseURL}/movie/${id}/credits?api_key=${this.apikey}`)
  }
  getSearchMovie (id: any): Observable<Movies> {
    console.log(id, 'movie#');
    return this.http.get<Movies>(`${this.baseURL}/search/movie?api_key=${this.apikey}&query=${id.movieName}`);
  }
  
  getMovieVideo (id: any): Observable<Movies> {
    return this.http.get<Movies>(`${this.baseURL}/movie/${id}/videos?api_key=${this.apikey}`)
  }
}
