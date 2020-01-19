import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-motivational-quote',
  templateUrl: './motivational-quote.component.html',
  styleUrls: ['./motivational-quote.component.css']
})
export class MotivationalQuoteComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  motivationalQuote: any;
  authToken: any;

  ngOnInit() {
    this.loadToken();
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.authToken});
    return this.httpClient.get('http://localhost:3000/motivationalQuotes/randomMotivationalQuote', {headers: headers})
            .pipe(map(res => res)).subscribe(profile => {
              console.log(profile);
            });
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;

  }

}
