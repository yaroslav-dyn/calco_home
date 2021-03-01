import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VocabularyService {

   private headers:  {[key: string]: string} = {
    'x-rapidapi-host': 'mashape-community-urban-dictionary.p.rapidapi.com',
    'x-rapidapi-key': 'KB5e7ZbqyKmshXFLZRFguVieeyePp1BhDXPjsnvByN3nYiesPM'
  };

  constructor(private http: HttpClient) {}

  getExplanation(props: string) {
    return this.http.get(`https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=${props}`, {headers: this.headers});
  }


}
