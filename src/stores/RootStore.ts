import {
  AlertStore,
  ApplicationStore,
  AuthStore,
  DbioStore,
  MenuStore,
  MetaStore,
  NodeStore,
  ProminerStore,
  RoleStore,
  TestCaseStore,
  UserStore,
} from '@/stores';

export class RootStore {
  AlertStore: AlertStore = new AlertStore();
  AuthStore: AuthStore = new AuthStore();
  MetaStore: MetaStore = new MetaStore();
  NodeStore: NodeStore = new NodeStore();
  ProminerStore: ProminerStore = new ProminerStore();
  RoleStore: RoleStore = new RoleStore();
  UserStore: UserStore = new UserStore();
  TestCaseStore: TestCaseStore = new TestCaseStore();
  DbioStore: DbioStore = new DbioStore();
  // ConfigRoleStore: ConfigRoleStore = new ConfigRoleStore();
  MenuStore: MenuStore = new MenuStore();
  ApplicationStore: ApplicationStore = new ApplicationStore();
}
