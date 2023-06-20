import { useEffect, useState } from 'react';

import CancelIcon from '@mui/icons-material/Cancel';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Table, TableBody, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { v4 as uuid } from 'uuid';

import { CmButton } from '@/components/atoms/CmButton';
import Loader from '@/components/molecules/Loader';

import { IPlainObject } from '@/types/common';

import {
  ButtonWrapper,
  ExpandsionIconWrapper,
  TableCellContentStyled,
  TableCellStyled,
  TableRowStyled,
  TreeWrapper,
} from './styled';
import { CmTreeDepthProps, ESearchType, IColumnConfig, TreeData } from './types';

const topButton = [
  { title: 'All', value: ESearchType.FORWARD },
  { title: 'Forward', value: ESearchType.FORWARD },
  { title: 'Backward', value: ESearchType.BACKWARD },
];

// formatDataFn must return an array of array of TreeData
// Every directly child must is the next item of their parent
// For example:
// const testData: TreeData[][] = [
//   [
//     {
//       // id must be unique
//       id: '1',
//       value: {
//         callee_method: '1',
//         callee_class: '1',
//         callee_type: '1',
//       },
//       // parentId = '' mean this object doesn't have parent, and depth must be 1
//       parentId: '',
//       depth: 1,
//       // `true` if this depth has child, `false` for vice verse
//       hasChildren: true,
//       // `false` for initial, CmTreeTable will handle everything else
//       isShow: false,
//       // Same as above
//       isExpand: false,
//     },
//     {
//       id: '1.1',
//       value: {
//         callee_method: '1.1',
//         callee_class: '1.1',
//         callee_type: '1.1',
//       },
//       // This object will be directly child of object have id = '1', and depth must be 2
//       parentId: '1',
//       depth: 2,
//       hasChildren: true,
//       isShow: false,
//       isExpand: false,
//     },
//     {
//       id: '1.1.1',
//       value: {
//         callee_method: '1.1.1',
//         callee_class: '1.1.1',
//         callee_type: '1.1.1',
//       },
//       parentId: '1.1',
//       depth: 3,
//       hasChildren: true,
//       isShow: false,
//       isExpand: false,
//     },
//     {
//       id: '1.2',
//       value: {
//         callee_method: '1.2',
//         callee_class: '1.2',
//         callee_type: '1.2',
//       },
//       parentId: '1',
//       depth: 3,
//       hasChildren: false,
//       isShow: false,
//       isExpand: false,
//     },
//   ],
// ];

const CmTreeDepth = <TValue extends IPlainObject, TValue2 extends IPlainObject>({
  isShowTopButton,
  onTopButtonClicked,
  isLoading,
  rootColumns,
  rootRow,
  dataColumns,
  data: initialData,
  formatDataFn,
}: CmTreeDepthProps<TValue, TValue2>) => {
  const [activeButton, setActiveButton] = useState<string>(topButton[0].title);
  const [isShowRootChildren, setIsShowRootChildren] = useState<boolean>(true);
  const [data, setData] = useState<TreeData[][]>([]);

  const handleRootChildren = (value: boolean) => {
    const temp = [...data];

    temp.map((firstLevelItem) => {
      if (firstLevelItem.length) {
        firstLevelItem.map((secondLevelItem, idx) => {
          if (idx === 0) {
            secondLevelItem.isShow = value;
          }

          // Hide all child when close root
          if (idx !== 0) {
            secondLevelItem.isShow = false;
          }

          secondLevelItem.isExpand = false;
        });
      }
    });

    setData(temp);

    setIsShowRootChildren(!isShowRootChildren);
  };

  const onRowClicked = (value: TreeData) => {
    const newData = [...data];
    let arrIndex;
    let valueIndex;

    for (let i = 0; i < newData.length; i++) {
      if (newData[i].length) {
        for (let j = 0; j < newData[i].length; j++) {
          if (newData[i][j].id === value.id) {
            arrIndex = i;
            valueIndex = j;
            break;
          }
        }
      }
    }

    if (typeof arrIndex === 'number' && typeof valueIndex === 'number') {
      if (newData[arrIndex][valueIndex].isExpand) {
        for (let i = valueIndex + 1; i < newData[arrIndex].length; i++) {
          newData[arrIndex][i].isShow = false;
          newData[arrIndex][i].isExpand = false;
        }
      }

      if (!newData[arrIndex][valueIndex].isExpand) {
        for (let i = valueIndex + 1; i < newData[arrIndex].length; i++) {
          if (newData[arrIndex][i].parentId === value.id) {
            newData[arrIndex][i].isShow = true;
          }
        }
      }

      newData[arrIndex][valueIndex].isExpand = !newData[arrIndex][valueIndex].isExpand;
    }

    setData(newData);
  };

  const renderDepthData = ({ data, columns }: { data: TreeData[][]; columns: IColumnConfig[] }) => {
    return data.map((rowArr) => {
      if (rowArr.length) {
        return rowArr.map((row) => {
          const hasChild = row.hasChildren;
          const isShow = row.isShow;
          const isExpand = row.isExpand;

          return (
            isShow && (
              <TableRowStyled
                key={row.id}
                hasCursor={!!hasChild}
                onClick={
                  hasChild
                    ? () => {
                        onRowClicked(row);
                      }
                    : undefined
                }
              >
                {columns.map((column, idx) => {
                  return (
                    <TableCellStyled
                      key={row.id + row.value[column.field]}
                      depth={idx === 0 ? row.depth : 0}
                    >
                      <TableCellContentStyled>
                        {idx === 0 &&
                          (hasChild ? (
                            <ExpandsionIconWrapper>
                              {isExpand ? <ExpandMoreIcon /> : <ChevronRightIcon />}
                            </ExpandsionIconWrapper>
                          ) : (
                            <>
                              <CancelIcon color="error" />
                              <Typography color="red.500">영향도가 없습니다.</Typography>
                            </>
                          ))}
                        {Object.keys(row.value).length ? row.value[column.field] : ''}
                      </TableCellContentStyled>
                    </TableCellStyled>
                  );
                })}
              </TableRowStyled>
            )
          );
        });
      }
    });
  };

  useEffect(() => {
    if (initialData) {
      const formattedData = formatDataFn(initialData);
      const newData = JSON.parse(JSON.stringify(formattedData)) as TreeData[][];

      formattedData.map((data, idx) => {
        if (data.length) {
          for (let i = 0; i < data.length; i++) {
            if (!data[i].hasChildren) {
              newData[idx][i].hasChildren = true;

              newData[idx].splice(i + 1, 0, {
                id: uuid(),
                value: {},
                depth: Number(data[i].depth + 1),
                parentId: data[i].id,
                hasChildren: false,
                isShow: false,
                isExpand: false,
              });
            }
          }
        }
      });

      setData(newData);
      setIsShowRootChildren(true);
    }
  }, [initialData]);

  return (
    <TreeWrapper>
      <Typography>Relation</Typography>
      <ButtonWrapper>
        {isShowTopButton &&
          topButton.map((item) => {
            return (
              <CmButton
                key={item.title}
                variant={activeButton === item.title ? 'contained' : 'outlined'}
                btnTitle={item.title}
                onClick={() => {
                  setActiveButton(item.title);
                  onTopButtonClicked?.(item.value);
                }}
              />
            );
          })}
      </ButtonWrapper>
      {isLoading ? (
        <Loader />
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {rootColumns.map((item) => {
                  return (
                    <TableCellStyled
                      key={item.field}
                      width={item.width}
                    >
                      {item.label}
                    </TableCellStyled>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRowStyled
                hasCursor={!!data.length}
                onClick={() => {
                  if (isShowRootChildren) {
                    handleRootChildren(false);
                  } else {
                    handleRootChildren(true);
                  }
                }}
              >
                {rootColumns.map((item, idx) => {
                  return (
                    <TableCellStyled key={item.field}>
                      <TableCellContentStyled>
                        {idx === 0 && data.length ? (
                          <ExpandsionIconWrapper>
                            {isShowRootChildren ? <ExpandMoreIcon /> : <ChevronRightIcon />}
                          </ExpandsionIconWrapper>
                        ) : (
                          <></>
                        )}
                        {rootRow[item.field]}
                      </TableCellContentStyled>
                    </TableCellStyled>
                  );
                })}
              </TableRowStyled>
              {isShowRootChildren && renderDepthData({ data, columns: dataColumns })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </TreeWrapper>
  );
};

export default CmTreeDepth;
