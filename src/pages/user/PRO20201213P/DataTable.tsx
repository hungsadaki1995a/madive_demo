import { useEffect, useMemo } from 'react';

import { observer } from 'mobx-react';

import CommonTable from '@/components/organisms/CmCommonTable';
import { ICommonTableColumn, IFilterConfig } from '@/components/organisms/CmCommonTable/types';

import { IPlainObject } from '@/types/common';
import { useStore } from '@/utils';

function RolePermissionAssignDataTable() {
  const { AlertStore } = useStore();

  // -----------------------------------
  // Sample Data

  const sampleRows = [
    {
      menu_name: 'Overview/APP&SG',
      on_off: 'on',
    },
    {
      menu_name: 'Overview/Meta',
      on_off: 'on',
    },
    {
      menu_name: 'Overview/Do Info',
      on_off: 'on',
    },
    {
      menu_name: 'Node/Node Management',
      on_off: 'on',
    },
  ];

  // -----------------------------------
  // Config table
  const columnsConfig = useMemo<ICommonTableColumn<IPlainObject>[]>(() => {
    return [
      {
        field: 'menu_name',
        label: 'Menu',
        type: 'text',
        sortable: true,
      },
      {
        field: 'on_off',
        label: 'Access',
        type: 'text',
        sortable: true,
      },
    ];
  }, []);

  const filterConfig = useMemo<IFilterConfig>(() => {
    return {
      submitBy: 'enter',
      submitLabel: 'Search',
      filters: [
        {
          type: 'dropdown',
          name: 'filterFieldName',
          options: [
            {
              label: 'Menu',
              value: 'menu_name',
            },
            {
              label: 'Access',
              value: 'on_off',
            },
          ],
        },
        {
          type: 'simple',
          name: 'search',
          // className: '',
          // label: 'Keyword',
          // icon: <SearchIcon />,
        },
      ],
    };
  }, []);

  // ------------------------------------------------------------------------------------
  // Handle Data

  useEffect(() => {
    //fetch();
  }, []);

  return (
    <CommonTable
      fieldAsRowId="field"
      columnsConfig={columnsConfig}
      rows={sampleRows}
      filterConfig={filterConfig}
      sortDefault={{
        field: 'menu_name',
        direction: 'asc',
      }}
      paginationConfig={{
        rowsPerPageOptions: [10, 25, 50, 100],
        currentPage: 0,
        rowsPerPage: 10,
        totalCount: 0,
        rowsPerPagePosition: 'last',
        onPageChange: (newPageIndex: number) => console.log(newPageIndex),
        onRowsPerPageChange: (newRowsPerPage: number) => console.log(newRowsPerPage),
      }}
    />
  );
}
export default observer(RolePermissionAssignDataTable);
