import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

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

export type ConfigGroupDto = {
  conditionDto: string[];
  count: number;
  description: string;
  group_id: string;
  group_name: string;
  pageInfoDto: pageInfoDto;
  pagingResultDto: pageResultDto;
  role_id: string | null;
  role_name: string | null;
};

export type DataConfigGroupDto = {
  ConfigGroupDto: ConfigGroupDto[];
  group_name: string;
};

// export type GroupManagementDto = {

// };

export class GroupManagementDto {
  @IsString()
  @MinLength(1)
  @MaxLength(256)
  @IsNotEmpty({ message: 'Please, Enter Description' })
  description: string;

  @IsString()
  @MinLength(1)
  @MaxLength(256)
  @IsNotEmpty({ message: 'Please, Enter Group Id' })
  group_id: string;

  @IsString()
  @MinLength(1)
  @MaxLength(256)
  @IsNotEmpty({ message: 'Please, Enter Group Name' })
  group_name: string;
}
