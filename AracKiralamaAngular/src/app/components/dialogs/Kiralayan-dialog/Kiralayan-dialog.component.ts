import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Kiralayan } from './../../../models/Kiralayan';
import { Component, Inject, OnInit } from '@angular/core';
import { Kira } from 'src/app/models/Kira';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-Kiralayan-dialog',
  templateUrl: './Kiralayan-dialog.component.html',
  styleUrls: ['./Kiralayan-dialog.component.css']
})
export class KiralayanDialogComponent implements OnInit {
  dialogBaslik: string;
  yeniKayit: Kiralayan;
  islem: string;
  frm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<KiralayanDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public frmBuild: FormBuilder

  ) {
    this.islem = data.islem;
    this.yeniKayit = data.kayit;
    if (this.islem == 'ekle') {
      this.dialogBaslik = "Kiralayan Ekle"
    }
    if (this.islem == 'duzenle') {
      this.dialogBaslik = "Kiralayan Düzenle"
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {

  }

  FormOlustur() {
    return this.frmBuild.group({
      kiralayanAd: [this.yeniKayit.kiralayanAd],
      kiralayanSoyad: [this.yeniKayit.kiralayanSoyad],
      kiralayanTelefon: [this.yeniKayit.kiralayanTelefon],
      kiralayanAdres: [this.yeniKayit.kiralayanAdres],
    });
  }
}