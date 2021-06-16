import { Arac } from './../models/Arac';
import { Musteri } from './../models/musteri';
import { Kiralayan } from './../models/Kiralayan';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Kira } from '../models/Kira';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = "http://localhost:51600/api/";

  constructor(
    public http: HttpClient
  ) { }

  KiralayanListe(){
    return this.http.get(this.apiUrl + "kiralayanliste")
  }
  KiralayanById(kiralayanId: string){
    return this.http.get(this.apiUrl + "KiralayanById/" + kiralayanId)
  }
  KiralayanEkle(kiralayan : Kiralayan){
    return this.http.post(this.apiUrl + "kiralayanekle", kiralayan)
  }
  KiralayanDuzenle(kiralayan: Kiralayan) {
    return this.http.put(this.apiUrl + "kiralayanduzenle", kiralayan);
  }
  KiralayanSil(kiralayanId: string) {
    return this.http.delete(this.apiUrl + "kiralayansil/" + kiralayanId);
  }
  MusteriListe(){
    return this.http.get(this.apiUrl + "musteriListe")
  }
  MusteriById(musteriId: string){
    return this.http.get(this.apiUrl + "musteribyid/" + musteriId)
  }
  MusteriEkle(musteri : Musteri){
    return this.http.post(this.apiUrl + "musteriekle", musteri)
  }
  MusteriDuzenle(musteri: Musteri) {
    return this.http.put(this.apiUrl + "musteriduzenle", musteri);
  }
  MusteriSil(musteriId: string) {
    return this.http.delete(this.apiUrl + "musterisil/" + musteriId);
  }
  AracListe(){
    return this.http.get(this.apiUrl + "aracliste")
  }
  AracById(aracId: string){
    return this.http.get(this.apiUrl + "aracbyid/" + aracId)
  }
  AracEkle(arac : Arac){
    return this.http.post(this.apiUrl + "aracekle", arac)
  }
  AracDuzenle(arac: Arac) {
    return this.http.put(this.apiUrl + "aracduzenle", arac);
  }
  AracSil(aracId: string) {
    return this.http.delete(this.apiUrl + "aracsil/" + aracId);
  }
  KiraAracListe(kiraId: string){
    return this.http.get(this.apiUrl + "kiraaracliste/" + kiraId)
  }
  KiraMusteriListe(musteriId: string){
    return this.http.get(this.apiUrl + "kiramusteriliste/" + musteriId)
  }
  KiraEkle(kira : Kira){
    return this.http.post(this.apiUrl + "kiraekle", kira)
  }
  KiraSil(kiraId: string) {
    return this.http.delete(this.apiUrl + "kirasil/" + kiraId);
  }
  KiraListe(){
    return this.http.get(this.apiUrl + "kiraliste")
  }
}
