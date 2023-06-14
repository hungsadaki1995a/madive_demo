export type ConfigGroupDto = {
  group_id: string;
  group_name: string;
  description: string;
  role_id: string;
  role_name: string;

  // //  API have but document don't have
  // pageInfoDto: pageInfoDto;
  // pagingResultDto: PagingResultDto;
  // conditionDto: any[];
  // count: string;
};

export type ConfigGroupDtos = {
  ConfigGroupDto: ConfigGroupDto;
  group_name: string;
};
