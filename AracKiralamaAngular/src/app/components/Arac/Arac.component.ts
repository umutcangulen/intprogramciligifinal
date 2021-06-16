import { Sonuc } from './../../models/Sonuc';
import { MatTableDataSource } from '@angular/material/table';
import { MyAlertService } from './../../services/myAlert.service';
import { ApiService } from './../../services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { AracDialogComponent } from './../dialogs/Arac-dialog/Arac-dialog.component';
import { Arac } from './../../models/Arac';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-Arac',
  templateUrl: './Arac.component.html',
  styleUrls: ['./Arac.component.css']
})
export class AracComponent implements OnInit {
  arac: Arac[];
  dialogRef: MatDialogRef<AracDialogComponent>;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  dataSource: any;
  displayedColumns = ['aracPlaka', 'aracRenk', 'aracKiraUcret','aracMarka', 'islemler'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService
  ) { }
  
  ngOnInit() {
    this.AracListele();
  }
  AracListele() {
    this.apiServis.AracListe().subscribe((d: Arac[]) => {
      this.arac = d;
      this.dataSource = new MatTableDataSource(this.arac);
      this.dataSource.sort = this.sort;
    });
  }
  AracEkle() {
    var yeniKayit: Arac = new Arac();
    this.dialogRef = this.matDialog.open(AracDialogComponent, {
      width: '400px',
      data: {
        kayit: yeniKayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.AracEkle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.AracListele();
          }
        });
      }
    });
  }
  AracDuzenle(kayit: Arac) {
    this.dialogRef = this.matDialog.open(AracDialogComponent, {
      width: '400px',
      data: {
        kayit: kayit,
        islem: 'duzenle'
      }
    });
  
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
  
        kayit.aracPlaka = d.aracPlaka;
        kayit.aracRenk = d.aracRenk;
        kayit.aracKiraUcret = d.aracKiraUcret;
        kayit.aracMarka = d.aracMarka;
  
        this.apiServis.AracDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.AracListele();
          }
        });
  
      }
    });
  }
  
  AracSil(kayit: Arac) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '500px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.aracPlaka +" plakalı araç silinecektir onaylıyor musunuz?";
    this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.AracSil(kayit.aracId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.AracListele();
          }
        });
      }
    });
  
  }
  
  }
