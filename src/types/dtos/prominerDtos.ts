export type ProminerResourceDto = {
  calldepth: number;
  physical_name: string;
  logical_name: string;
  recycled: number;
  recycled_bo: number;
  recycled_so: number;
  resource_path: string;
  resource_type: string;
  loc: number;
  declaring_class: string;
  count: number;
};

export type ProminerMethodDto = {
  calldepth: number;
  conditionDto: [];
  count: number;
  declaring_class: string;
  loc: number;
  method_name: string;
  physical_name: string;
  recycled: number;
  recycled_bo: number;
  recycled_so: number;
  resource_path: string;
  resource_type: string;
  return_type: string;
  service_group_name: string;
};
