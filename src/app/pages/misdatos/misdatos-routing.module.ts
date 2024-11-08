import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioPage } from './misdatos.page'; 
const routes: Routes = [
  {
    path: '',
    component: InicioPage, 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisdatosPageRoutingModule {}
