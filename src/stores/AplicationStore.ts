import { makeAutoObservable, runInAction } from 'mobx';

import { ApplicationApi } from '@/apis';
import { ApplicationDto } from '@/types/dtos/applicationDtos';
import { notify } from '@/utils/notify';

export class ApplicationStore {
  application: ApplicationDto[] = [];
  selectedApplication: ApplicationDto = {} as ApplicationDto;
  isLoading = true;

  constructor() {
    makeAutoObservable(this);
    this.loadApplicationList();
  }

  async loadApplicationList() {
    try {
      runInAction(() => {
        this.isLoading = true;
      });

      const data = await ApplicationApi.getList();

      runInAction(() => {
        this.application = data;
      });
    } catch (error) {
      notify.error(error?.data?.exception?.name || 'Load Application List Failed');
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  setSelectedApplication(resourceId: string) {
    runInAction(() => {
      this.selectedApplication = this.application.filter((item) => item.resource_id === resourceId)[0] || {};
    });
  }
}
