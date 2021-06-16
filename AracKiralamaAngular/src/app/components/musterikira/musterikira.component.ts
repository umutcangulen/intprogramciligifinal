import { Sonuc } from './../../models/Sonuc';
import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MyAlertService } from './../../services/myAlert.service';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from './../../services/api.service';
import { Arac } from './../../models/Arac';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Musteri } from './../../models/musteri';
import { Kira } from 'src/app/models/Kira';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-musterikira',
  templateUrl: './musterikira.component.html',
  styleUrls: ['./musterikira.component.scss']
})
export class MusterikiraComponent implements OnInit {
  kiralar : Kira[];
  musteri : Musteri[];
  musteriId:string;
  kiraBaslangic : string ="";
  kiraBaslangicA : string;
  kiraBitis : string ="";
  kiraBitisA : string;
  frm : FormGroup;
  kira : Kira;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;


  secMusteri: Musteri;
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
      this.route.params.subscribe(p=>{
        if(p){
          this.musteriId = p.musteriId;
          this.AracGetir();
          this.KiraListele();
        }
      });
    }
    AracGetir(){
      this.apiservis.MusteriById(this.musteriId).subscribe((d:Musteri)=>{
        this.secMusteri=d;
  
      })
    }
    KiraListele(){
      this.apiservis.KiraMusteriListe(this.musteriId).subscribe((d:Kira[])=>{
        this.kiralar = d;
        this.dataSource= new MatTableDataSource(d);
      })
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
  }