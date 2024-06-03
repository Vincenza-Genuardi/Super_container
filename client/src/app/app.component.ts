import { Component } from '@angular/core';
import { ProdottiService } from './prodotti.service';

import { Prodotto } from './prodotti.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  data!: Prodotto[];


  showForm = false;

  openForm() { 
    this.showForm = true;
  }

  closeForm() { 
    this.showForm = false;
  }

  constructor(private prodottiService: ProdottiService) {
    this.prodottiService.getMagazzino().subscribe(
      (data: Prodotto[]) => { 
        this.data = data; 
        console.log(data); 
      },
      (error) => {
        console.error("Errore durante il recupero dei dati:", error);
      }
    );
  }


  form = new FormGroup({
    "nome": new FormControl(),
    "categoria": new FormControl(),
    "quantita": new FormControl(),
    "prezzo_unitario": new FormControl()
  });

  onSubmit() {
    console.log("Form reattivo inviato");
    console.log("Nome Prodotto: " + this.form.controls['nome'].value);
    console.log("Categoria: " + this.form.controls['categoria'].value);
    console.log("Quantita: " + this.form.controls['quantita'].value);
    console.log("Prezzo Unitario: " + this.form.controls['prezzo_unitario'].value);
  
    let nuovoProdotto: Prodotto = {
      'id' : 0, 
      'nome': this.form.controls['nome'].value,
      'categoria': this.form.controls['categoria'].value,
      'quantita': this.form.controls['quantita'].value,
      'prezzo_unitario': this.form.controls['prezzo_unitario'].value
    };
  
    
    this.prodottiService.AggiungereProdotto(nuovoProdotto).subscribe(
      (prodottoConId) => {
        console.log("Prodotto aggiunto con successo al magazzino:", prodottoConId);
       
        nuovoProdotto.id = prodottoConId.id;
  
        this.data.push(nuovoProdotto);
      },
      (error) => {
        console.error("Errore durante l'aggiunta del prodotto al magazzino:", error);
      
      }
    );
  }
  
}

