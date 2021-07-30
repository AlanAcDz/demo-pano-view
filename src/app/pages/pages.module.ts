import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PanoViewModule } from '../pano-view/pano-view.module';
import { ExtOutsideComponent } from './ext-outside/ext-outside.component';
import { ExtEntranceComponent } from './ext-entrance/ext-entrance.component';
import { ExtLobbyComponent } from './ext-lobby/ext-lobby.component';
import { ExtDoorsComponent } from './ext-doors/ext-doors.component';


@NgModule({
  declarations: [
    ExtOutsideComponent,
    ExtEntranceComponent,
    ExtLobbyComponent,
    ExtDoorsComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    PanoViewModule,
  ]
})
export class PagesModule { }
