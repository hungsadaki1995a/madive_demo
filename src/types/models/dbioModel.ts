import { IsNumberString, MaxLength } from 'class-validator';

import { IsNotBlank } from '@/utils/decorator';

class DbioModel {
  @IsNotBlank({ message: 'Please, Enter Dbio Vender' })
  @MaxLength(128)
  vender: string;

  @IsNotBlank({ message: 'Please, Enter Dbio Alias' })
  @MaxLength(128)
  alias: string;

  @IsNotBlank({ message: 'Please, Enter Id' })
  @MaxLength(128)
  id: string;

  @IsNotBlank({ message: 'Please, Enter Ip' })
  @MaxLength(16)
  ip: string;

  @IsNotBlank({ message: 'Please, Enter Password' })
  @MaxLength(128)
  pw: string;

  @IsNotBlank({ message: 'Please, Enter Port' })
  @IsNumberString({}, { message: 'Please, Enter Number into Port' })
  @MaxLength(5)
  port: string;
}

export default DbioModel;
