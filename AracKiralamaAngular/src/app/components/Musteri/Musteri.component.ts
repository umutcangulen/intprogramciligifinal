import { Sonuc } from './../../models/Sonuc';
import { MatTableDataSource } from '@angular/material/table';
import { MyAlertService } from './../../services/myAlert.service';
import { ApiService } from './../../services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MusteriDialogComponent } from './../dialogs/Musteri-dialog/Musteri-dialog.component';
import { Musteri } from './../../models/musteri';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-Musteri',
  templateUrl: './Musteri.component.html',
  styleUrls: ['./Musteri.component.css']
})
export class MusteriComponent implements OnInit {
musteri: Musteri[];
dialogRef: MatDialogRef<MusteriDialogComponent>;
confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
dataSource: any;
displayedColumns = ['musteriAd', 'musteriSoyad', 'musteriTelefon','musteriAdres', 'islemler'];
@ViewChild(MatSort) sort: MatSort;
@ViewChild(MatPaginator) paginator: MatPaginator;
constructor(
  public apiServis: ApiService,
  public matDialog: MatDialog,
  public alert: MyAlertService
) { }

ngOnInit() {
  this.MusteriListe();
}
MusteriListe() {
  this.apiServis.MusteriListe().subscribe((d: Musteri[]) => {
    this.musteri = d;
    this.dataSource = new MatTableDataSource(this.musteri);
    this.dataSource.sort = this.sort;
  });
}
MusteriEkle() {
  var yeniKayit: Musteri = new Musteri();
  this.dialogRef = this.matDialog.open(MusteriDialogComponent, {
    width: '400px',
    data: {
      kayit: yeniKayit,
      islem: 'ekle'
    }
  });
  this.dialogRef.afterClosed().subscribe(d => {
    if (d) {
      this.apiServis.MusteriEkle(d).subscribe((s: Sonuc) => {
        this.alert.AlertUygula(s);
        if (s.islem) {
          this.MusteriListe();
        }
      });

    }
  });
}

MusteriDuzenle(kayit: Musteri) {
  this.dialogRef = this.matDialog.open(MusteriDialogComponent, {
    width: '400px',
    data: {
      kayit: kayit,
      islem: 'duzenle'
    }
  });

  this.dialogRef.afterClosed().subscribe(d => {
    if (d) {

      kayit.musteriAd = d.musteriAd;
      kayit.musteriSoyad = d.musteriSoyad;
      kayit.musteriAdres = d.musteriAdres;
      kayit.musteriTelefon = d.musteriTelefon;

      this.apiServis.MusteriDuzenle(kayit).subscribe((s: Sonuc) => {
        this.alert.AlertUygula(s);
        if (s.islem) {
          this.MusteriListe();
        }
      });

    }
  });
}

MusteriSil(kayit: Musteri) {
  this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
    width: '500px'
  });
  this.confirmDialogRef.componentInstance.dialogMesaj = kayit.musteriAd + kayit.musteriSoyad + " isimli müşteri silinecektir onaylıyor musunuz?";
  this.confirmDialogRef.afterClosed().subscribe(d => {
    if (d) {
      this.apiServis.MusteriSil(kayit.musteriId).subscribe((s: Sonuc) => {
        this.alert.AlertUygula(s);
        if (s.islem) {
          this.MusteriListe();
        }
      });
    }
  });

}

}