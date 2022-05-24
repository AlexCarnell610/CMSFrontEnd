import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cms-view-treatment-column',
  templateUrl: './view-treatment-column.component.html',
  styleUrls: ['./view-treatment-column.component.scss']
})
export class ViewTreatmentColumnComponent implements OnInit {
@Input() title: string
@Input() data

  constructor() { }

  ngOnInit(): void {
  }

}
