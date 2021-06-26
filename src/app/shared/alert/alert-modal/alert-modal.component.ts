import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent implements OnInit {

  @Input() message: string;
  @Output() onCloseModal = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
    console.log('initiate');
  }

  onClose(){
    this.onCloseModal.emit();
  }

}
