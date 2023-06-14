export type NodeDto = {
  node_type: string;
  node_name: string;
  node_ip: string;
  node_file_port: string;
  node_tcp_port: string;
  node_admin: string;
  node_http_port: string;
  node_is_ssl: string;
  description: string;
};

export interface NodeDtos extends NodeDto {
  node_id?: string;
}

export type NodeTypeDtos = {
  description: string;
  node_admin: string;
  node_file_port: string;
  node_http_port: string;
  node_id: string;
  node_ip: string;
  node_is_ssl: string;
  node_name: string;
  node_path: string;
  node_tcp_port: string;
  node_type: string;
  master_node_key: string;
};

export type NodeResponseDto = {
  dto: {
    NodeDto: NodeTypeDtos[];
  };
};
