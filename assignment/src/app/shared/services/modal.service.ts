import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private showModalSubject = new Subject<boolean>();
  private modalContentSubject = new Subject<{ title: string; content: string }>();

  showModal$: Observable<boolean> = this.showModalSubject.asObservable();
  modalContent$: Observable<{ title: string; content: string }> = this.modalContentSubject.asObservable();

  openModal(): void {
    this.showModalSubject.next(true);
  }

  closeModal(): void {
    this.showModalSubject.next(false);
  }

  setContent(content: { title: string; content: string }) {
    this.modalContentSubject.next(content);
  }
}
