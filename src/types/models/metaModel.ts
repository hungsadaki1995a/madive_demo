import { Length } from 'class-validator';

import {
  IsNotBlank,
  IsOnlyNumberIfRelatedHas,
  IsOnlyNumberIfRelatedNot,
  IsRelatedHas,
  IsRelatedNotEmpty,
  IsRelatedNotHas,
} from '@/utils/decorator';

class MetaModel {
  @Length(0, 128, { message: 'Please, Physical Name length must less than 128 characters' })
  @IsNotBlank({ message: 'Please, enter the Physical Name' })
  physical_name: string;

  @Length(0, 128, { message: 'Please, Logical Name length must less than 128 characters' })
  @IsNotBlank({ message: 'Please, enter the Logical Name' })
  logical_name: string;

  @Length(0, 128, { message: 'Please, Resource Name length must less than 128 characters' })
  resource_group?: string;

  @Length(0, 128, { message: 'Please, Comments length must less than 128 characters' })
  comments?: string;

  @Length(0, 16, { message: 'Please, Field Type length must less than 16 characters' })
  @IsNotBlank({ message: 'Please, select the Field Type' })
  field_type: string;

  @Length(0, 128, { message: 'Please, Length length must less than 128 characters' })
  @IsOnlyNumberIfRelatedNot('field_type', ['Date'], { message: 'Please, enter a number in the Length' })
  @IsRelatedHas('field_type', ['Date'], { message: 'Please, enter the Length' })
  length?: string;

  @Length(0, 128, { message: 'Please, Decimal Size length must less than 128 characters' })
  @IsOnlyNumberIfRelatedHas('field_type', ['BigDecimal'], { message: 'Please, enter a number in the Decimal' })
  @IsRelatedNotHas('field_type', ['BigDecimal'], { message: 'Please, enter the Decimal' })
  decimal_size?: string;

  @Length(0, 32, { message: 'Please, Meta Type length must less than 32 characters' })
  meta_type: string;

  @Length(0, 1, { message: 'Please, Is Key length must less than 1 characters' })
  is_key: string;

  @Length(0, 16, { message: 'Please, dataSource length must less than 16 characters' })
  @IsRelatedNotHas('meta_type', ['persistent'], { message: 'Please, select the Data Source' })
  db_type?: string;

  @IsRelatedNotEmpty(
    {
      propertyName: 'db_type',
      requireFieldWithValue: {
        fieldName: 'meta_type',
        fieldValue: ['persistent'],
      },
    },
    { message: 'Please, select the Column' }
  )
  @Length(0, 512, { message: 'Please, Table Name length must less than 512 characters' })
  table_name?: string | null;

  @IsRelatedNotEmpty(
    {
      propertyName: 'table_name',
      requireFieldWithValue: {
        fieldName: 'meta_type',
        fieldValue: ['persistent'],
      },
    },
    { message: 'Please, select the Column' }
  )
  @Length(0, 512, { message: 'Please, Column Name length must less than 512 characters' })
  column_name?: string | null;

  @Length(0, 128, { message: 'Please, Masking length must less than 128 characters' })
  masking: string;

  @Length(0, 128, { message: 'Please, Masking Range length must less than 128 characters' })
  masking_range?: string;

  @Length(0, 128, { message: 'Please, Encrypt length must less than 128 characters' })
  encrypt: string;

  @Length(0, 128, { message: 'Please, Default Value length must less than 128 characters' })
  default_value?: string;

  @Length(0, 8, { message: 'Please, Is Use length must less than 8 characters' })
  is_use: string;
}

export default MetaModel;
