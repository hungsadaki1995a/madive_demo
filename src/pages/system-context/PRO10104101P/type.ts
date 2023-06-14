export interface ISystemContextDetail {
  key: string;
  value: string;
}

export type ISystemContextList = {
  node_id: string;
  resource_id: string;
  systemContextName: string;
  appName?: string;
};

export type EditModal = {
  node_id: string;
  resource_id: string;
  systemContextName: string;
  appName: string;
  key: string;
  value: string;
};
