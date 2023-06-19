import {
  AlertStore,
  ApplicationStore,
  MenuStore,
  MetaStore,
  NodeStore,
  SearchServerCachedStore,
  TestCaseStore,
} from '@/stores';

export class RootStore {
  AlertStore: AlertStore = new AlertStore();
  MetaStore: MetaStore = new MetaStore();
  NodeStore: NodeStore = new NodeStore();
  TestCaseStore: TestCaseStore = new TestCaseStore();
  MenuStore: MenuStore = new MenuStore();
  ApplicationStore: ApplicationStore = new ApplicationStore();
  SearchServerCachedStore: SearchServerCachedStore = new SearchServerCachedStore();
}
