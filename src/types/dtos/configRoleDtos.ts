import { ConfigPermissionDto } from './configPermissionDto';

export type ConfigRoleDto = {
  role_id: string;
  role_name: string;
  description: string;
};

export type ConfigRoleDtos = {
  ConfigRoleDto: ConfigRoleDto[];
  ConfigPermissionDto: ConfigPermissionDto;
};
