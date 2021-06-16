import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Musteri } from './../../../models/musteri';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-Musteri-dialog',
  templateUrl: './Musteri-dialog.component.html',
  styleUrls: ['./Musteri-dialog.component.css']
})
export class MusteriDialogComponent implements OnInit {
  dialogBaslik: string;
  yeniKayit: Musteri;
  islem: string;
  frm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<MusteriDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public frmBuild: FormBuilder

  ) {
    this.islem = data.islem;
    this.yeniKayit = data.kayit;
    if (this.islem == 'ekle') {
      this.dialogBaslik = "Müşteri Ekle"
    }
    if (this.islem == 'duzenle') {
      this.dialogBaslik = "Müşteri Düzenle"
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {

  }

  FormOlustur() {
    return this.frmBuild.group({
      musteriAd: [this.yeniKayit.musteriAd],
      musteriSoyad: [this.yeniKayit.musteriSoyad],
      musteriAdres: [this.yeniKayit.musteriAdres],
      musteriTelefon: [this.yeniKayit.musteriTelefon],
    });
  }
}