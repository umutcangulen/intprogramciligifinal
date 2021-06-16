import { Kiralayan } from './../../../models/Kiralayan';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from './../../../services/api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Arac } from './../../../models/Arac';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-Arac-dialog',
  templateUrl: './Arac-dialog.component.html',
  styleUrls: ['./Arac-dialog.component.css']
})
export class AracDialogComponent implements OnInit {
  dialogBaslik: string;
  yeniKayit: Arac;
  islem: string;
  frm: FormGroup;
  kiralayanId: string ="";
  kiralayan: Kiralayan[];
  constructor(
    public dialogRef: MatDialogRef<AracDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public frmBuild: FormBuilder,
    public apiservis :  ApiService,

  ) {
    this.islem = data.islem;
    this.yeniKayit = data.kayit;
    if (this.islem == 'ekle') {
      this.dialogBaslik = "Araç Ekle"
    }
    if (this.islem == 'duzenle') {
      this.dialogBaslik = "Araç Düzenle"
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {
    this.KiralayanListe();

  }

  FormOlustur() {
    return this.frmBuild.group({
      aracPlaka: [this.yeniKayit.aracPlaka],
      aracRenk: [this.yeniKayit.aracRenk],
      aracKiraUcret: [this.yeniKayit.aracKiraUcret],
      aracMarka: [this.yeniKayit.aracMarka],
      aracKiralayanId: [this.yeniKayit.aracKiralayanId],
    });
  }
  KiralayanListe(){
    this.apiservis.KiralayanListe().subscribe((d : Kiralayan[])=>{
      this.kiralayan = d;
    });
  }
  KiralayanSec(kiralayanId: string){
    this.kiralayanId = kiralayanId;
  }
}