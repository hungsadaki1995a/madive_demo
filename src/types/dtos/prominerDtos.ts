type CoreProminerDto = {
  calldepth: number;
  physical_name: string;
  recycled: number;
  recycled_bo: number;
  recycled_so: number;
  resource_path: string;
  resource_type: string;
  loc: number;
  count: number;
  declaring_class: string;
  method_name: string;
  return_type: string;
  service_group_name: string;
};

export type ProminerResourceDto = CoreProminerDto & {
  logical_name: string;
  declaring_method: string;
  variable_name: string;
  variable_type: string;
  declared_type: string;
  field_type: string;
  field_name: string;
  sg_resource_id: string;
  app_resource_id: string;
  searchType: string;
  originClz: string;
  originMeth: string;
};

export type ProminerMethodDto = CoreProminerDto & {
  conditionDto: [];
};

export type ProminerMethodDetailDto = {
  class0: string;
  parent_class: string;
  impl_interfaces: string;
  dof_name: string;
  query_tables: string;
  do_name: string;
  declaring_class: string;
  declared_type: string;
  field_name: string;
  field_type: string;
  datasource_name: string;
  is_injection: string;
  return_type: string;
  method_name: string;
  loc: string;
  rendezvous: string;
  has_rcall_return: string;
  caller_class: string;
  caller_method: string;
  caller_type: string;
  callee_class: string;
  callee_method: string;
  callee_type: string;
  svc_call_method: string;
  is_svc_name_called: string;
  method_modifier: string;
  declaring_method: string;
  variable_name: string;
  variable_type: string;
  callDepth: string;
};
