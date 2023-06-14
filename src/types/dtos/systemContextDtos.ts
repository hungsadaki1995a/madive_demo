import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export type DeployStatList = {
  resource_type: string;
  node_id: string;
};

export interface DeleteSystemContext {
  appName: string;
  key: string;
  node_id: string;
  resource_id: string;
  systemContextName: string;
}

export interface AddSystemContext extends DeleteSystemContext {
  value: string;
}

export type SystemContextInfoDto = {
  node_id: string;
  resource_id: string;
};

export type ApplicationDtos = {
  deploy_id?: string;
  group_id: string | null;
  group_name: string | null;
  logical_name?: string;
  node_id: string;
  physical_name: string;
  resource_id: string;
  resource_type?: string;
};

export type ContextDtos = {
  count: number;
  node_id: string;
  resource_id: string;
  physical_name: string | null;
  systemContextName: string[];
  pageInfoDto: {
    pageNum: number;
    pageLength: number;
    sort: boolean;
    sortingType: string;
    sortField: string;
  };
  conditionDto: [];
  pagingResultDto: pageResultDto;
};

export type systemContextName = string[];

export type pageInfoDto = {
  pageNum: number;
  pageLength: number;
  sort: boolean;
  sortField: string;
  sortingType: string;
};

export type pageResultDto = {
  count: number;
  currentPage: number;
  totalNum: number;
  totalPage: number;
};

export type SystemContextListGet = {
  node_id: string;
  resource_id: string;
  systemContextName: systemContextName;
  pageInfoDto: pageInfoDto;
  conditionDto: [];
};

export type SystemContextDtos = {
  appName: string | null;
  conditionDto: string[];
  key: string;
  node_id: string;
  pageInfoDto: pageInfoDto;
  pagingResultDto: pageResultDto;
  resource_id: string;
  systemContextName: string;
  value: string;
};

export type ConfigDto = {
  conditionDto: string[];
  count: number;
  group_id: string;
  key_parameter: string;
  logical_name: string;
  node_id: string;
  pageInfoDto: pageInfoDto;
  pagingResultDto: pageResultDto;
  physical_name: string;
  property_key: string;
  property_value: string;
  resource_id: string;
  resource_type: string;
};

export type CreateDatasourceResquest = Pick<
  ConfigDto,
  | 'key_parameter'
  | 'logical_name'
  | 'node_id'
  | 'physical_name'
  | 'property_value'
  | 'property_key'
  | 'resource_id'
  | 'resource_type'
>;

export type DeleteDatasourceResquest = Pick<
  ConfigDto,
  'key_parameter' | 'node_id' | 'physical_name' | 'property_key' | 'resource_id' | 'resource_type'
>;

export type EditDatasourceResquest = Pick<
  ConfigDto,
  'key_parameter' | 'node_id' | 'physical_name' | 'property_key' | 'resource_id' | 'property_value' | 'resource_type'
>;

export type SystemContextList = {
  SystemContextDto: SystemContextDtos[];
  conditionDto: [];
  count: number;
  pageInfoDto: pageInfoDto;
  pagingResultDto: pageResultDto;
};

export type PropertyList = {
  SystemContextDto: ConfigDto[];
  conditionDto: [];
  count: number;
  pageInfoDto: pageInfoDto;
  pagingResultDto: pageResultDto;
};

export type ApplicationResponseDto = {
  dto: {
    DeployStatDto: ApplicationDtos[];
  };
};

export type ContextResponseDto = {
  dto: ContextDtos;
};

export type AddSystemContextResponseDto = {
  value: string;
};

export type CreateDatasourceResponseDto = {
  value: string;
};

export class CreateKey {
  @IsString()
  @MinLength(1)
  @MaxLength(256)
  @IsNotEmpty({ message: 'Insert Key' })
  key: string;

  @IsString()
  @MinLength(1)
  @MaxLength(4096)
  @IsNotEmpty({ message: 'Insert Value' })
  value: string;
}

export class CreateDatasource {
  @IsString()
  @MinLength(1)
  @MaxLength(256)
  @IsNotEmpty({ message: 'Please enter the system context name' })
  key_parameter: string;

  @IsString()
  @MinLength(1)
  @MaxLength(4096)
  @IsNotEmpty({ message: 'Please enter the datasource' })
  property_value: string;
}
