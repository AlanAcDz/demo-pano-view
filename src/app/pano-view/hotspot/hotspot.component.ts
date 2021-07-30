import { Component, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { PanoViewer } from '@egjs/view360';

@Component({
  selector: 'pano-hotspot',
  templateUrl: './hotspot.component.html',
  styleUrls: ['./hotspot.component.scss']
})
export class HotspotComponent {
  @ViewChild('hotspot') hotspot!: ElementRef<HTMLSpanElement>;
  @Output() hotspotClicked = new EventEmitter();
  @Input() yaw = 0;
  @Input() pitch = 0;
  @Input() type = 'arrow';
  @Input() path!: string;
  @Input() navRotation = 0;
  positionCalculated = false;
  constructor(
    private router: Router,
  ) { }
  onClick() {
    const queryParams = this.navRotation ? { rotation: this.navRotation } : null;
    return this.path
      ? this.router.navigate([this.path], { queryParams })
      : this.hotspotClicked.emit();
  }
  calculateHotspotPosition(viewer: PanoViewer, container: HTMLElement) {
    const hotspotEl = this.hotspot.nativeElement;
    const viewYaw = viewer.getYaw();
    const viewPitch = viewer.getPitch();
    const spotYaw = this.yaw;
    const spotPitch = this.pitch;
    const deltaYaw = this.adjustDeltaYaw(viewYaw, spotYaw);
    const deltaPitch = spotPitch - viewPitch;
    if (Math.abs(deltaYaw) > 90) {
      hotspotEl.style.transform = 'translate(-200px, 0px)';
      return;
    }
    const { height, width } = container.getBoundingClientRect();
    const radYaw = this.degreesToRadians(deltaYaw);
    const radPitch = this.degreesToRadians(deltaPitch);
    const fov = viewer.getFov();
    const hfov = this.getHFOV(fov, container);
    const rx = Math.tan(this.degreesToRadians(hfov) / 2);
    const ry = Math.tan(this.degreesToRadians(fov) / 2);
    const points = [Math.tan(-radYaw) / rx, Math.tan(-radPitch) / ry].map(
      (point) => point * Math.cos(15 / 180 * Math.PI)
    );
    points[1] = this.getRotation(points, deltaYaw > 0 ? -10 : 10)[1];
    const left = width / 2 + points[0] * width / 2;
    const top = height / 2 + points[1] * height / 2;
    hotspotEl.style.transform = `translate(${left}px, ${top}px) translate(-50%, -50%)`;
    this.positionCalculated = true;
  }
  // Get container boundary
  private getHFOV(fov: number, container: HTMLElement) {
    const { height, width } = container.getBoundingClientRect();
    const fovRadians = this.degreesToRadians(fov);
    return Math.atan(width / height * Math.tan(fovRadians / 2)) / Math.PI * 360;
  }
  // Get hotspot rotation
  private getRotation(points: number[], degrees: number) {
    const radians = this.degreesToRadians(degrees);
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    return [cos * points[0] - sin * points[1], sin * points[0] + cos * points[1]];
  }
  private adjustDeltaYaw(viewYaw: number, spotYaw: number) {
    let deltaYaw = spotYaw - viewYaw;
    if (deltaYaw < -180) {
      deltaYaw += 360;
    } else if (deltaYaw > 180) {
      deltaYaw -= 360;
    }
    return deltaYaw;
  }
  private degreesToRadians(degrees: number) {
    return degrees * Math.PI / 180;
  }
}
