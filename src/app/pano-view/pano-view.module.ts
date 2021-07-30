import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanoViewComponent } from './pano-view.component';
import { HotspotComponent } from './hotspot/hotspot.component';

@NgModule({
  declarations: [
    PanoViewComponent,
    HotspotComponent,
  ],
  exports: [
    PanoViewComponent,
    HotspotComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class PanoViewModule { }
