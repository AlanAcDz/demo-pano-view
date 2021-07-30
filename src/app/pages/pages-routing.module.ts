import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExtDoorsComponent } from './ext-doors/ext-doors.component';
import { ExtEntranceComponent } from './ext-entrance/ext-entrance.component';
import { ExtLobbyComponent } from './ext-lobby/ext-lobby.component';
import { ExtOutsideComponent } from './ext-outside/ext-outside.component';

const routes: Routes = [
  { path: 'ext', component: ExtOutsideComponent },
  { path: 'entrance', component: ExtEntranceComponent },
  { path: 'lobby', component: ExtLobbyComponent }, 
  { path: 'doors', component: ExtDoorsComponent }, 
  { path: '**', pathMatch: 'full', redirectTo: 'entrance' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
