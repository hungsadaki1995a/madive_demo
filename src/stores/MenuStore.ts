import { action, makeObservable, observable } from 'mobx';

export class MenuStore {
  selectedRootMenu = '';

  constructor() {
    makeObservable(this, {
      selectedRootMenu: observable,
      setSelectedRootMenu: action,
    });
  }

  setSelectedRootMenu(menu: string) {
    this.selectedRootMenu = menu;
  }
}
