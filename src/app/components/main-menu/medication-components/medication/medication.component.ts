import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PageURLs } from '@cms-enums';

@Component({
  selector: 'cms-medication',
  templateUrl: './medication.component.html',
  styleUrls: ['./medication.component.scss'],
})
export class MedicationComponent implements OnInit {
  @ViewChild('video') video: HTMLVideoElement
  mediaStreamLoaded = false;
  mediaStream: MediaStream;
  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

  backToMain(): void {
    this.router.navigate([PageURLs.MainMenu]);
  }

  openCamera(): void {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        this.mediaStreamLoaded = true;
        this.mediaStream = stream;
        
      });
  }
}
