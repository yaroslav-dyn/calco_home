import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoaderService } from './preload.service';
import {ToasterService} from './toaster.service';


@Injectable()
export class LoaderInterceptorService implements HttpInterceptor {
  reqTimeOut = false;
  constructor(private loaderService: LoaderService, private toasterService: ToasterService ) {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.showLoader();
    return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.onEnd();
        }
      },
      (err: any) => {
        this.onEnd();
      }));

  }

  // TODO: Show toaster after xx second if long request has occurred
  // private showBeReqInfo(): void {
  //   const ToasterInst = this.toasterService;
  //   setTimeout( () => {
  //      this.reqTimeOut = true;
  //     console.log(this.reqTimeOut);
  //
  //   }, 1000);
  //
  //   if (this.reqTimeOut ) {
  //     console.log('req Time Out', this.reqTimeOut);
  //     ToasterInst.showToast('haveProblemWithApi', 'error');
  //   }
  //
  // }

  private onEnd(): void {
    this.hideLoader();
  }

  private showLoader(): void {
    this.loaderService.show();
  }

  private hideLoader(): void {
    this.reqTimeOut = false;
    this.loaderService.hide();
  }

}
