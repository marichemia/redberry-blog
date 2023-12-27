import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.scss']
})
export class CreateBlogComponent {

  selectedFile: File | null | undefined;
  fileName: string | null | undefined;
  @ViewChild('fileInput') fileInput: ElementRef | undefined;

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target?.files[0];
    this.fileName = this.selectedFile.name;
  }

  onDelete() {
    this.selectedFile = null;
    this.fileName = null;
    this.fileInput!.nativeElement.value = null;
  }

}
