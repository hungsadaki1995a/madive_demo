import { makeAutoObservable } from 'mobx';
import { ApiAlertType } from '@/types/typeBundle';

export class AlertStore {
  open = false;
  options: ApiAlertType = {
    severity: 'error',
    message: '',
  };

  constructor() {
    makeAutoObservable(this);
  }

  openApiAlert = (severity: 'success' | 'error', message: string) => {
    this.open = true;
    this.options = {
      severity: severity,
      message: message,
    };
  };

  resetApiAlert = () => {
    this.open = false;
    this.options = {
      severity: 'error',
      message: '',
    };
  };
}
