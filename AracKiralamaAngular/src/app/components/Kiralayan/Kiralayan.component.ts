import { Sonuc } from './../../models/Sonuc';
import { MyAlertService } from './../../services/myAlert.service';
import { ApiService } from './../../services/api.service';
import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { KiralayanDialogComponent } from './../dialogs/Kiralayan-dialog/Kiralayan-dialog.component';
import { Kiralayan } from './../../models/Kiralayan';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-Kiralayan',
  templateUrl: './Kiralayan.component.html',
  styleUrls: ['./Kiralayan.component.css']
})
export class KiralayanComponent implements OnInit {
  kiralayan: Kiralayan[];
  dialogRef: MatDialogRef<KiralayanDialogComponent>;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  dataSource: any;
  displayedColumns = ['kiralayanAd', 'kiralayanSoyad', 'kiralayanTelefon','kiralayanAdres', 'islemler'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService
  ) { }

  ngOnInit() {
    this.KiralayanListe();
  }
  KiralayanListe() {
    this.apiServis.KiralayanListe().subscribe((d: Kiralayan[]) => {
      this.kiralayan = d;
      this.dataSource = new MatTableDataSource(this.kiralayan);
      this.dataSource.sort = this.sort;
    });
  }
  KiralayanEkle() {
    var yeniKayit: Kiralayan = new Kiralayan();
    this.dialogRef = this.matDialog.open(KiralayanDialogComponent, {
      width: '400px',
      data: {
        kayit: yeniKayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.KiralayanEkle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KiralayanListe();
          }
        });

      }
    });
  }

  KiralayanDuzenle(kayit: Kiralayan) {
    this.dialogRef = this.matDialog.open(KiralayanDialogComponent, {
      width: '400px',
      data: {
        kayit: kayit,
        islem: 'duzenle'
      }
    });

    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {

        kayit.kiralayanAd = d.kiralayanAd;
        kayit.kiralayanSoyad = d.kiralayanSoyad;
        kayit.kiralayanTelefon = d.kiralayanTelefon;
        kayit.kiralayanAdres = d.kiralayanAdres;

        this.apiServis.KiralayanDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KiralayanListe();
          }
        });

      }
    });
  }

  KiralayanSil(kayit: Kiralayan) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '500px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.kiralayanAd + kayit.kiralayanSoyad + " isimli kişi silinecektir onaylıyor musunuz?";
    this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.KiralayanSil(kayit.kiralayanId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KiralayanListe();
          }
        });
      }
    });

  }

}