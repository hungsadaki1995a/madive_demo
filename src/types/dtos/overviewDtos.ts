export type addNewApplicationDto = {
  creator: string;
  description: string;
  logical_name: string;
  package_prefix: string;
  physical_name: string;
};

export type editApplicationDto = {
  creator?: string;
  description?: string;
  logical_name?: string;
  package_prefix?: string;
  physical_name?: string;
  resource_id?: string;
};

export interface DeleteApplicationDto {
  resource_id?: string;
  creator?: string;
}

export type SgListqueryDto = {
  resource_id: string;
};

export type SgListResponse = {
  resource_id?: string;
  group_id?: string;
  physical_name?: string;
  logical_name?: string;
  creator?: string;
  manager?: string;
  create_time?: string;
  description?: string;
  group_name?: string;
  [key: string]: any;
};
