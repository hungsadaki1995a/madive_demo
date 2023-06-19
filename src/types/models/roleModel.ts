import { MaxLength } from 'class-validator';

import { IsNotBlank } from '@/utils/decorator';

class RoleModel {
  @IsNotBlank({ message: 'Please, Enter Role Id' })
  @MaxLength(128)
  role_id: string;

  @IsNotBlank({ message: 'Please, Enter Role Name' })
  @MaxLength(128)
  role_name: string;

  @MaxLength(1028)
  description: string;
}

export default RoleModel;
