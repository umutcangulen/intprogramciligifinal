import { Musteri } from 'src/app/models/musteri';
import { ApiService } from './../../../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Kira } from './../../../models/Kira';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { Arac } from 'src/app/models/Arac';

@Component({
  selector: 'app-arackira-dialog',
  templateUrl: './arackira-dialog.component.html',
  styleUrls: ['./arackira-dialog.component.scss']
})
export class ArackiraDialogComponent implements OnInit {
  dialogBaslik: string;
  yeniKayit: Kira;
  islem: string;
  frm: FormGroup;
  aracId:string;
  musteriId:string ="";
  kiraBaslangic : string ="";
  kiraBitis : string ="";
  kiralayanId: string ="";
  musteri : Musteri[];
  arac : Arac[];
  constructor(
    public dialogRef: MatDialogRef<ArackiraDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public frmBuild: FormBuilder,
    public apiservis :  ApiService,

  ) {
    this.islem = data.islem;
    this.yeniKayit = data.kayit;
    if (this.islem == 'ekle') {
      this.dialogBaslik = "Kiralanan Araç Ekle"
    }
    if (this.islem == 'duzenle') {
      this.dialogBaslik = "Kiralanan Araç Düzenle"
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {
    this.MusteriListe();
    this.AracListe();

  }

  FormOlustur() {
    return this.frmBuild.group({
      kiraAracId: [this.yeniKayit.kiraAracId],
      kiraMusteriId: [this.yeniKayit.kiraMusteriId],
      kiraBaslangic: [this.yeniKayit.kiraBaslangic],
      kiraBitis: [this.yeniKayit.kiraBitis],
      kiraAracPlaka:[this.yeniKayit.kiraAracPlaka],
    });
  }
  
  MusteriListe(){
    this.apiservis.MusteriListe().subscribe((d : Musteri[])=>{
      this.musteri = d;
    });
  }
  AracListe(){
    this.apiservis.AracListe().subscribe((d : Arac[])=>{
      this.arac = d;
    });
  }
  MusteriSec(musteriId: string){
    this.musteriId = musteriId;
  }
  AracSec(aracId: string){
    this.aracId = aracId;
  }
}