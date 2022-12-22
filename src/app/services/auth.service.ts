import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const AUTH_API = environment.baseUrl;
const httpOptions = {
  headers: new HttpHeaders({
    "X-Custom-Header": "application/json",
  })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getSongs(): Observable<any> {
    return this.http.get(AUTH_API + '/song-list', {
    });
  }

  createSong(formData: any): Observable<any> {
    return this.http.post(AUTH_API + '/create-song',formData,httpOptions);
  }

  updateSong(s_id: any,song: any,artist: any,releaseYear:any,first: any,year: any,playCount: any): Observable<any> {
    return this.http.patch(AUTH_API + '/update-song', {
      s_id,
      song,
      artist,
      releaseYear,
      first,
      year,
      playCount
    },httpOptions);
  }

  deleteSong(s_id: any): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: { "s_id": s_id },
    };

    return this.http
      .delete(AUTH_API + '/delete-song', options);

  }

  getSongById(id: any): Observable<any> {
  let queryParams = new HttpParams();
  queryParams = queryParams.append("id", id);
  return this.http.get<any>(AUTH_API + '/song', { params: queryParams })
  }
  }
