import { KiraComponent } from './components/Kira/Kira.component';
import { MusterikiraComponent } from './components/musterikira/musterikira.component';
import { ArackiraComponent } from './components/arackira/arackira.component';
import { AracComponent } from './components/Arac/Arac.component';
import { KiralayanComponent } from './components/Kiralayan/Kiralayan.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MusteriComponent } from './components/Musteri/Musteri.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'kiralayan',
    component: KiralayanComponent
  },
  {
    path: 'musteri',
    component: MusteriComponent
  },
  {
    path: 'arac',
    component: AracComponent
  },
  {
    path: 'arac',
    component: AracComponent
  },
  {
    path: 'kiraaracliste/:aracId',
    component: ArackiraComponent
  },
  {
    path: 'kiramusteriliste/:musteriId',
    component: MusterikiraComponent
  },
  {
    path: 'kira',
    component: KiraComponent
  },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
