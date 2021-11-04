import { Component, OnInit } from '@angular/core';
import { HttpService } from '@cms-services/http';

@Component({
  selector: 'cms-medication',
  templateUrl: './medication.component.html',
  styleUrls: ['./medication.component.css'],
})
export class MedicationComponent implements OnInit {
  constructor(private readonly httpService: HttpService) {}

  ngOnInit(): void {}
}
