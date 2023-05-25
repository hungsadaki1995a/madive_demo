import { AlertStore, AuthStore, MetaStore, NodeStore, ProminerStore, RoleStore, UserStore } from '@/stores';

export class RootStore {
  AlertStore: AlertStore = new AlertStore();
  AuthStore: AuthStore = new AuthStore();
  MetaStore: MetaStore = new MetaStore();
  NodeStore: NodeStore = new NodeStore();
  ProminerStore: ProminerStore = new ProminerStore();
  RoleStore: RoleStore = new RoleStore();
  UserStore: UserStore = new UserStore();
}
