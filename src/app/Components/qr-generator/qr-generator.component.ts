import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels} from '@techiediaries/ngx-qrcode';

@Component({
  selector: 'app-qr-generator',
  template: `
    <div>
      <h2>
        QR Code Generator
      </h2>
      <mat-form-field floatLabel="never" class="w100">
        <mat-label>Put text or link here:</mat-label>
        <input matInput [(ngModel)]="qrValue">
      </mat-form-field>
      <mat-card class="qr-container" *ngIf="qrValue">
        <ngx-qrcode
          [elementType]="elementType"
          [errorCorrectionLevel]="correctionLevel"
          [value]="qrValue"
          cssClass="coolQRCode"></ngx-qrcode>
      </mat-card>
    </div>
  `,
  styles: ['.qr-container {display: flex; justify-content: center}']
})
export class QrGeneratorComponent implements OnDestroy {

  public elementType = NgxQrcodeElementTypes.URL;
  public correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  public qrValue: string;

  constructor() {
  }

  ngOnDestroy() {
    this.qrValue = '';
  }

}//
