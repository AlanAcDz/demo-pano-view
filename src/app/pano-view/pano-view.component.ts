import {
  Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit, HostListener, ContentChildren, QueryList
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PanoViewer } from '@egjs/view360';
import { HotspotComponent } from './hotspot/hotspot.component';

@Component({
  selector: 'pano-view',
  templateUrl: './pano-view.component.html',
  styleUrls: ['./pano-view.component.scss']
})
export class PanoViewComponent implements OnInit, AfterViewInit {
  @ContentChildren(HotspotComponent) hotspots!: QueryList<HotspotComponent>;
  @ViewChild('viewContainer') container!: ElementRef<HTMLElement>;
  @Input() image = '';
  viewer!: PanoViewer;
  rotation = 0;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }
  ngOnInit() {
    const rotation = this.route.snapshot.queryParamMap.get('rotation');
    this.rotation = rotation ? Number(rotation) : 0;
  }
  ngAfterViewInit() {
    this.viewer = new PanoViewer(this.container.nativeElement, {
      image: this.image,
      cubemapConfig: {
        tileConfig: {
          flipHorizontal: true,
          rotation: this.rotation,
        },
      },
    }).on('ready', () => {
      this.viewer.lookAt({ fov: 165, yaw: this.rotation }, 0);
      this.offsetHotspots();
    }).on('viewChange', () => this.offsetHotspots());
  }
  // Recalcular el 360 y los hotspots en el reescalado
  @HostListener('window:resize', [])
  resize() {
    this.viewer.updateViewportDimensions();
    this.offsetHotspots();
  }
  // Position hotspots
  private offsetHotspots() {
    this.hotspots.forEach(
      (hotspot) => hotspot.calculateHotspotPosition(this.viewer, this.container.nativeElement)
    );
  }
}
