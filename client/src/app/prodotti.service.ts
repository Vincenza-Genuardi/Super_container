import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdottiService {

  constructor(private http: HttpClient) { }

  
  getMagazzino(): Observable<Prodotto[]> {
    return this.http.get<Prodotto[]>(environment.baseUrlServer + '/magazzino');
  }

  httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

  AggiungereProdotto(prodotto : Prodotto) : Observable<Prodotto>
  {
    return this.http.post<Prodotto>(environment.baseUrlServer + '',prodotto,this.httpOptions)
  }
}



export interface Prodotto {
  id: number;
  nome: string;
  categoria: string;
  quantita: number;
  prezzo_unitario: number;
}





