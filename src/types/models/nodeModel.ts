import { IsNotEmpty, MaxLength } from 'class-validator';

import { IsOnlyNumber } from '@/utils/decorator';

class NodeModel {
  @MaxLength(16)
  node_type: string;

  @MaxLength(128)
  node_name: string;

  @MaxLength(16)
  node_ip: string;

  @IsNotEmpty({ message: 'Please, Enter Number into File Port' })
  @IsOnlyNumber({ message: 'Please, Enter Number into File Port' })
  @MaxLength(8, { message: 'File Port must be shorter than or equal to 8 characters' })
  node_file_port: string;

  @IsNotEmpty({ message: 'Please, Enter Number into Tcp Port' })
  @IsOnlyNumber({ message: 'Please, Enter Number into Tcp Port' })
  @MaxLength(8, { message: 'Tcp Portmust be shorter than or equal to 8 characters' })
  node_tcp_port: string;

  @IsNotEmpty({ message: 'Please, Enter Number into Http Port' })
  @IsOnlyNumber({ message: 'Please, Enter Number into Http Port' })
  @MaxLength(8, { message: 'Http Port must be shorter than or equal to 8 characters' })
  node_http_port: string;

  @MaxLength(8)
  node_is_ssl: string;

  @MaxLength(1028)
  description: string;
}
export default NodeModel;
