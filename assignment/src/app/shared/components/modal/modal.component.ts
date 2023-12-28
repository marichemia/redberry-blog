import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements AfterViewInit, OnInit {

  @ViewChild('contentContainer') contentContainer: ElementRef | undefined;
  title: string | undefined;
  content: string | undefined;
  showModal: boolean | undefined;
  modalContent!: any;

  constructor(private modalService: ModalService) { }

  ngOnInit() {
    this.modalService.showModal$.subscribe(data => this.showModal = data);

    this.modalService.modalContent$.subscribe(data => this.modalContent = data);
  }


  ngAfterViewInit(): void {
    if (this.contentContainer) {
      this.contentContainer.nativeElement.innerHTML = this.content;
    }
  }

  close() {
    this.modalService.closeModal();
  }

}
