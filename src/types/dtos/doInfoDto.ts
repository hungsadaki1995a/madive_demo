export type FieldInfoDto = {
  do_name: string;
  depth: number;
  field_type: string;
  logical_name: string;
  physical_name: string;
  length_: string;
  array: string;
  comments: string;
  allow_null: string;
  default_value: string;
  masking: string;
  decimal_size: string;
  seq: string;
  include_info: string;
};
export type DoInfoOutput = {
  dto: {
    FieldInfo: FieldInfoDto;
    result: string;
  };
};

export type DoInfoInput = {
  sg_name: string;
  app_name: string;
  physical_name: string;
};
