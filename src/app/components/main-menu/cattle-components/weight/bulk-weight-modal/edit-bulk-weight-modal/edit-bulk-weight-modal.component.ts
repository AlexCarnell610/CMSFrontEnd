import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Modals } from '@cms-enums';
import { IBulkWeight } from '@cms-interfaces';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'cms-edit-bulk-weight-modal',
  templateUrl: './edit-bulk-weight-modal.component.html',
  styleUrls: ['./edit-bulk-weight-modal.component.scss']
})
export class EditBulkWeightModalComponent implements OnInit, AfterViewInit {

  @Input() tagNumber: string = ''
  @Output() tagNumberChange: EventEmitter<string> = new EventEmitter()
  // @Input() weight: string = '';
  // @Output() weightChange: EventEmitter<string> = new EventEmitter()
  @Input() weightDate: Date = new Date();
  @Output() weightDateChange: EventEmitter<Date> = new EventEmitter()

  @Input() weight: IBulkWeight = null;
  @Output() weightChange: EventEmitter<IBulkWeight> = new EventEmitter<IBulkWeight>

  constructor(private readonly modalService: NgxSmartModalService) { }

  ngOnInit(): void {
   
  }

  ngAfterViewInit():void {
    this.modalService.get(Modals.EditBulkWeightModal).onAnyCloseEvent.subscribe(() => {
      this.weightChange.emit({...this.weight, weight:"180"})
    })
  }

}
