import { Sonuc } from './../../models/Sonuc';
import { MatTableDataSource } from '@angular/material/table';
import { MyAlertService } from './../../services/myAlert.service';
import { ApiService } from './../../services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { ArackiraDialogComponent } from './../dialogs/arackira-dialog/arackira-dialog.component';
import { Kira } from './../../models/Kira';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-Kira',
  templateUrl: './Kira.component.html',
  styleUrls: ['./Kira.component.scss']
})
export class KiraComponent implements OnInit {
  kira: Kira[];
  dialogRef: MatDialogRef<ArackiraDialogComponent>;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  dataSource: any;
  displayedColumns = ['kiraAracId', 'kiraMusteriId', 'kiraBaslangic','kiraBitis', 'islemler'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService
  ) { }
  
  ngOnInit() {
    this.KiraListe();
  }
  KiraListe() {
    this.apiServis.KiraListe().subscribe((d: Kira[]) => {
      this.kira = d;
      this.dataSource = new MatTableDataSource(this.kira);
      this.dataSource.sort = this.sort;
    });
  }
  KiraEkle() {
    var yeniKayit: Kira = new Kira();
    this.dialogRef = this.matDialog.open(ArackiraDialogComponent, {
      width: '400px',
      data: {
        kayit: yeniKayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.KiraEkle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KiraListe();
          }
        });
  
      }
    });
  }
  KiraSil(kayit: Kira) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '500px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.kiraAracId + " ID'li Aracın Kirası silinecektir onaylıyor musunuz?";
    this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.KiraSil(kayit.kiraId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KiraListe();
          }
        });
      }
    });
  
  }
  
  }