import {Component, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import FileObject = AppTypes.FileObject;

@Component({
  selector: 'app-file-uploader',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileUploaderComponent,
      multi: true
    }
  ],
  template: `
    <div class="avatar_container">
      <label class="uploader_label" for="uploader">
        <div class="uploader_avatar" *ngIf="showAvatar && getImgSrc">
          <img [src]="getImgSrc" alt="avatar">
        </div>
        <span class="empty_cont" *ngIf="!getImgSrc">
            <mat-icon [inline]="true" class="empty_avatar" aria-hidden="false" aria-label="account_circle">account_circle</mat-icon>
        </span>
      </label>
      <input id="uploader" type="file"/>
    </div>
  `,
  styleUrls: ['./file-upload.component.scss']
})

export class FileUploaderComponent {

  @Input() showAvatar: boolean;
  @Input() convertedImg: object;
  @Output() fileUploaded = new EventEmitter();
  onChange: Function;


  public fileObject: FileObject = {
    imageBlob: null,
    imageData: null,
    name: null,
    converted: null
  };

  private file: File | null = null;

  constructor(private host: ElementRef<HTMLInputElement>) {
  }

  writeValue(value: null) {
    // clear file input
    this.host.nativeElement.value = '';
    this.file = null;
  }


  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    const file = event && event.item(0);
    this.onChange(file);
    this.file = file;
    this.readThis(file);
  }

  registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function) {
  }

  async readThis(inputValue: any) {
    const file: File = inputValue;
    this.fileObject = {
      imageBlob: URL.createObjectURL(file),
      imageData: file,
      name: file.name,
      converted: null
    };
    try {
      // @ts-ignore
      this.fileObject.converted = await this.convertImageAvatar(file);
      this.fileUploaded.emit(this.fileObject);
    } catch (err) {
      console.log(err);
    }
  }

  async convertImageAvatar(file: Blob | string | null): Promise<unknown> {
    const toBase64 = (file1) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(<Blob>file1);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
    return toBase64(file);
  }

  get getImgSrc() {
    return this.fileObject.converted ? this.fileObject.converted : this.convertedImg;
  }


}//
