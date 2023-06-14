interface TreeNode {
  callDepth: string;
  callee_class: string;
  caller_class: string;
  callee_type: string;
  children?: TreeNode[];
}

interface rowTable {
  hierarchy: string[];
  packageName: string;
  resourceType: string;
  id: number;
}

const treeData: any = [
  {
    parent_class: '',
    impl_interfaces: '',
    dof_name: '',
    query_tables: '',
    do_name: '',
    declaring_class: '',
    declared_type: '',
    field_name: '',
    field_type: '',
    datasource_name: '',
    is_injection: '',
    return_type: '',
    method_name: '',
    loc: '',
    rendezvous: '',
    has_rcall_return: '',
    caller_class: 'com.tmax.bo.SHBO',
    caller_method: '',
    caller_type: '',
    callee_class: 'com.tmax.dof.SHDOF',
    callee_method: '',
    callee_type: 'DATA_OBJECT_FACTORY',
    svc_call_method: '',
    is_svc_name_called: '',
    method_modifier: '',
    declaring_method: '',
    variable_name: '',
    variable_type: '',
    callDepth: '1',
  },
  {
    parent_class: '',
    impl_interfaces: '',
    dof_name: '',
    query_tables: '',
    do_name: '',
    declaring_class: '',
    declared_type: '',
    field_name: '',
    field_type: '',
    datasource_name: '',
    is_injection: '',
    return_type: '',
    method_name: '',
    loc: '',
    rendezvous: '',
    has_rcall_return: '',
    caller_class: 'com.tmax.dof.SHDOF',
    caller_method: '',
    caller_type: '',
    callee_class: 'com.tmax.dto.SHDO',
    callee_method: '',
    callee_type: 'DATA_OBJECT',
    svc_call_method: '',
    is_svc_name_called: '',
    method_modifier: '',
    declaring_method: '',
    variable_name: '',
    variable_type: '',
    callDepth: '2',
  },
  {
    parent_class: '',
    impl_interfaces: '',
    dof_name: '',
    query_tables: '',
    do_name: '',
    declaring_class: '',
    declared_type: '',
    field_name: '',
    field_type: '',
    datasource_name: '',
    is_injection: '',
    return_type: '',
    method_name: '',
    loc: '',
    rendezvous: '',
    has_rcall_return: '',
    caller_class: 'com.tmax.bo.SHBO',
    caller_method: '',
    caller_type: '',
    callee_class: 'com.tmax.dto.SHDO',
    callee_method: '',
    callee_type: 'DATA_OBJECT',
    svc_call_method: '',
    is_svc_name_called: '',
    method_modifier: '',
    declaring_method: '',
    variable_name: '',
    variable_type: '',
    callDepth: '1',
  },
  {
    parent_class: '',
    impl_interfaces: '',
    dof_name: '',
    query_tables: '',
    do_name: '',
    declaring_class: '',
    declared_type: '',
    field_name: '',
    field_type: '',
    datasource_name: '',
    is_injection: '',
    return_type: '',
    method_name: '',
    loc: '',
    rendezvous: '',
    has_rcall_return: '',
    caller_class: 'com.tmax.dof.SHDOF',
    caller_method: '',
    caller_type: '',
    callee_class: 'com.tmax.dof.SHDOF.FULLQUERY',
    callee_method: '',
    callee_type: 'JAVA',
    svc_call_method: '',
    is_svc_name_called: '',
    method_modifier: '',
    declaring_method: '',
    variable_name: '',
    variable_type: '',
    callDepth: '2',
  },
  {
    parent_class: '',
    impl_interfaces: '',
    dof_name: '',
    query_tables: '',
    do_name: '',
    declaring_class: '',
    declared_type: '',
    field_name: '',
    field_type: '',
    datasource_name: '',
    is_injection: '',
    return_type: '',
    method_name: '',
    loc: '',
    rendezvous: '',
    has_rcall_return: '',
    caller_class: 'com.tmax.dof.SHDOF',
    caller_method: '',
    caller_type: '',
    callee_class: 'com.tmax.dof.SHDOF$FULLQUERY',
    callee_method: '',
    callee_type: 'JAVA',
    svc_call_method: '',
    is_svc_name_called: '',
    method_modifier: '',
    declaring_method: '',
    variable_name: '',
    variable_type: '',
    callDepth: '2',
  },
  {
    parent_class: '',
    impl_interfaces: '',
    dof_name: '',
    query_tables: '',
    do_name: '',
    declaring_class: '',
    declared_type: '',
    field_name: '',
    field_type: '',
    datasource_name: '',
    is_injection: '',
    return_type: '',
    method_name: '',
    loc: '',
    rendezvous: '',
    has_rcall_return: '',
    caller_class: 'com.tmax.dto.SHDO',
    caller_method: '',
    caller_type: '',
    callee_class: 'com.tmax.promapper.engine.dto.record.common.FieldProperty',
    callee_method: '',
    callee_type: 'JAVA',
    svc_call_method: '',
    is_svc_name_called: '',
    method_modifier: '',
    declaring_method: '',
    variable_name: '',
    variable_type: '',
    callDepth: '3',
  },
  {
    parent_class: '',
    impl_interfaces: '',
    dof_name: '',
    query_tables: '',
    do_name: '',
    declaring_class: '',
    declared_type: '',
    field_name: '',
    field_type: '',
    datasource_name: '',
    is_injection: '',
    return_type: '',
    method_name: '',
    loc: '',
    rendezvous: '',
    has_rcall_return: '',
    caller_class: 'com.tmax.dto.SHDO',
    caller_method: '',
    caller_type: '',
    callee_class: 'com.tmax.promapper.engine.dto.record.common.FieldProperty',
    callee_method: '',
    callee_type: 'JAVA',
    svc_call_method: '',
    is_svc_name_called: '',
    method_modifier: '',
    declaring_method: '',
    variable_name: '',
    variable_type: '',
    callDepth: '2',
  },
];

const cutCaller = (row: any): string => {
  const callerClass = row?.split('.').pop();
  return callerClass || '';
};

const useTableTree = () => {
  const dataTable: rowTable[] = [];
  const arr = [];
  for (let i = 0; i < treeData.length; ++i) {
    let hierarchy = [cutCaller(treeData[i].caller_class), cutCaller(treeData[i].callee_class)];
    const resourceType = treeData[i].callee_type;
    const packageName = treeData[i].callee_class.split(cutCaller(treeData[i].callee_class))[0].slice(0, -1);
    if (+treeData[i].callDepth === 1) {
      arr.push({ depth: treeData[i].callDepth, path: hierarchy });
    } else {
      for (let j = 0; j < arr.length; ++j) {
        if (+arr[j]?.depth === +treeData[i].callDepth - 1) {
          hierarchy = [...arr[j].path, hierarchy[1]];
          arr.push({ depth: treeData[i].callDepth, path: hierarchy });
          break;
        }
      }
    }
    const row: rowTable = {
      hierarchy,
      resourceType,
      packageName,
      id: i,
    };
    dataTable.push(row);
  }
};

export default useTableTree;
