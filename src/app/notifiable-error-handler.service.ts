import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { Message, MessageService } from 'primeng/api';

export const DURATION = 3_000;
@Injectable()
export class NotifiableErrorHandler implements ErrorHandler {
  
  constructor(private pmgMessageSvc: MessageService, private zone: NgZone) { }

  handleError(error: Error) {
    this.zone.run(() => {
      this.pmgMessageSvc.add({
        severity: 'error',
        summary: `Error: ${error.name}`,
        detail: `Error was detected! We are already working on it!${error.message}`,
        life: DURATION
      } as Message);
    })
    console.warn(`Caught by Notifiable Error Handler: `, error);
  }
}