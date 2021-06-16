import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Sonuc } from './../../models/Sonuc';
import { MatTableDataSource } from '@angular/material/table';
import { MyAlertService } from './../../services/myAlert.service';
import { ApiService } from './../../services/api.service';
import { Arac } from './../../models/Arac';
import { Component, OnInit } from '@angular/core';
import { Kira } from 'src/app/models/Kira';
import { Musteri } from 'src/app/models/musteri';
import { ActivatedRoute } from '@angular/router';
import { ArackiraDialogComponent } from '../dialogs/arackira-dialog/arackira-dialog.component';

@Component({
  selector: 'app-arackira',
  templateUrl: './arackira.component.html',
  styleUrls: ['./arackira.component.scss']
})
export class ArackiraComponent implements OnInit {
  kiralar : Kira[];
  musteri : Musteri[];
  aracId:string;
  musteriId:string="";
  kiraBaslangic : string ="";
  kiraBaslangicA : string;
  kiraBitis : string ="";
  kiraBitisA : string;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;

  frm : FormGroup;
  dialogRef: MatDialogRef<ArackiraDialogComponent>;
  kira : Kira;
  

  secArac: Arac;
  dataSource: any;
  displayedColumns=['kiraAracId', 'kiraMusteriId', 'kiraBaslangic','kiraBitis','islemler'];
  
    constructor(
      public apiservis : ApiService,
      public route : ActivatedRoute,
      public alert : MyAlertService,
      public frmBuild: FormBuilder,
      public matDialog: MatDialog,


    ) { }
  
    ngOnInit() {
      this.MusteriListele();
      this.route.params.subscribe(p=>{
        if(p){
          this.aracId = p.aracId;
          this.AracGetir();
          this.KiraListele();
        }
      });
    }
    AracGetir(){
      this.apiservis.AracById(this.aracId).subscribe((d:Arac)=>{
        this.secArac=d;
  
      })
    }
    KiraListele(){
      this.apiservis.KiraAracListe(this.aracId).subscribe((d:Kira[])=>{
        this.kiralar = d;
        this.dataSource= new MatTableDataSource(d);
      })
    }
    MusteriListele(){
      this.apiservis.MusteriListe().subscribe((d : Musteri[])=>{
        this.musteri = d;
      });
    }
    KiraEkle(){
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
          this.apiservis.KiraEkle(d).subscribe((s: Sonuc) => {
            this.alert.AlertUygula(s);
            if (s.islem) {
              this.KiraListele();
            }
          });
        }
      });
    }
    KiraSil(kayit: Kira) {
      this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
        width: '500px'
      });
      this.confirmDialogRef.componentInstance.dialogMesaj = "Kayıt silinecektir onaylıyor musunuz?";
      this.confirmDialogRef.afterClosed().subscribe(d => {
        if (d) {
          this.apiservis.KiraSil(kayit.kiraId).subscribe((s: Sonuc) => {
            this.alert.AlertUygula(s);
            if (s.islem) {
              this.KiraListele();
            }
          });
        }
      });
  
    }
    formOlustur(){
      return this.frmBuild.group({
        aracId: [this.kira.kiraAracId],
        kiraMusteriId: [this.kira.kiraMusteriId],
        kiraBaslangic: [this.kira.kiraBaslangic],
        kiraBitis: [this.kira.kiraBitis],
      });
    }
    MusteriSec(musteriId: string){
      this.musteriId = musteriId;
    }
    
  }