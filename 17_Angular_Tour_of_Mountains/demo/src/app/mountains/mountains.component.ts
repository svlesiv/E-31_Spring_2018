import { Component, OnInit } from '@angular/core';
import { Mountain } from '../mountain';
import { MountainService } from '../mountain-service/mountain.service';

@Component({
  selector: 'app-mountains',
  templateUrl: './mountains.component.html',
  styleUrls: ['./mountains.component.css']
})
export class MountainsComponent implements OnInit {
  mountains: Mountain[];

  constructor(private mountainService: MountainService) { }

  ngOnInit() {
    this.getMountains();
  }

  // Observable
  getMountains(): void {
    this.mountainService.getMountains()
        .subscribe(mountains => this.mountains = mountains);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.mountainService.addMountain({ name } as Mountain)
      .subscribe(mountain => {
        this.mountains.push(mountain);
      });
  }

  delete(mountain: Mountain): void {
    this.mountains = this.mountains.filter(m => m !== mountain);
    this.mountainService.deleteMountain(mountain).subscribe();
  }
}
