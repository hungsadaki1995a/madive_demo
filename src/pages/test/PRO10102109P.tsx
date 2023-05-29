/******************************************************
 * Program ID : src/pages/test/CreateTestCase.tsx
 * Program Name : Create Test Case
 * Create On : 2023.05.27
 * 개 요 : CreateTestCase.tsx
 * ====================================================
 * 변경 이력     수정자      내용
 * ====================================================
 * 2023.05.27   김정아 차장   최초 작성
 ******************************************************/
import { CmDataSearch, CmTextInput } from '@/components/atoms/CmDataInput';
import { TreeItem, TreeView } from '@mui/lab';
import {
  Box,
  Grid,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { SyntheticEvent, useState } from 'react';

// Common Atoms
import { CmButton } from '@/components/atoms/CmButton';

// Templates
import { CmPageTselectColum } from '@/components/templates/CmPageTitle';

import { TestStyled } from './Test.Styled';

// img, icon
import StarsIcon from '@mui/icons-material/StarsOutlined';

type propsType = {
  title: string;
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function CreateTestCase(props: propsType) {
  const { title } = props;

  const [value, setValue] = useState(0);

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [test, setTest] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setTest(event.target.value);
  };
  return (
    <TestStyled>
      {/* {title} */}
      <CmPageTselectColum />

      <Paper className="selectBox">
        {/* Select For Test */}
        <Box className="formBox">
          <Typography>Select For Test</Typography>
          {/* FormBox */}
          <label className="labelFormArea">
            <span>Test Case Name</span>
            <CmTextInput />
          </label>

          {/* FormBox */}
          <label className="labelFormArea">
            <span>Target Node</span>
            <CmDataSearch />
          </label>

          {/* FormBox */}
          <label className="labelFormArea">
            <span>Resource Name</span>
            <CmDataSearch />
          </label>
        </Box>
        {/* Test Information */}
        <Box className="formInfo">
          <Typography>Test Information</Typography>
          {/* FormBox */}
          <Paper className="infoBox">
            <figure>
              <span>Node Name</span>
              <figcaption>DevServer</figcaption>
            </figure>
            <figure>
              <span>Node ID</span>
              <figcaption>ca0726f809bae66f33fb36c12a3596fc</figcaption>
            </figure>
            <figure>
              <span>IP</span>
              <figcaption>101.101.209.11</figcaption>
            </figure>
            <figure>
              <span>Http Port</span>
              <figcaption>14000</figcaption>
            </figure>
            <figure>
              <span>Resource Name</span>
              <figcaption>SHDO</figcaption>
            </figure>
            <figure>
              <span>Input</span>
              <figcaption>com.tmax.dto.SHDO</figcaption>
            </figure>
            <figure>
              <span>Super DO</span>
              <figcaption>-</figcaption>
            </figure>
            <figure>
              <span>Custom Header</span>
              <figcaption>-</figcaption>
            </figure>
          </Paper>
        </Box>
        <Box className="flexEnd">
          <CmButton
            variant="contained"
            startIcon={<StarsIcon />}
            btnTitle="Test"
          />
        </Box>
      </Paper>

      <Paper className="inputDataBox">
        <Typography>Input Data</Typography>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleTabChange}
              aria-label="basic tabs example"
            >
              <Tab
                label="Header"
                {...a11yProps(0)}
              />
              <Tab
                label="Input Do"
                {...a11yProps(1)}
              />
            </Tabs>
          </Box>
          <TabPanel
            value={value}
            index={0}
          >
            <Grid
              container
              spacing={0}
            >
              {/* TreeView */}
              <Grid className="treeBox">
                <TreeView
                  aria-label="file system navigator"
                  defaultCollapseIcon={<StarsIcon />}
                  defaultExpandIcon={<StarsIcon />}
                  sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
                >
                  <TreeItem
                    nodeId="1"
                    label="Header1"
                  >
                    <TreeItem
                      nodeId="2"
                      label="Calendar"
                    />
                  </TreeItem>
                  <TreeItem
                    nodeId="5"
                    label="Header222"
                  >
                    <TreeItem
                      nodeId="10"
                      label="OSS"
                    />
                    <TreeItem
                      nodeId="6"
                      label="MUI"
                    >
                      <TreeItem
                        nodeId="8"
                        label="index.js"
                      />
                    </TreeItem>
                  </TreeItem>
                </TreeView>
              </Grid>
              {/* Table */}
              <Grid className="tableBox">
                <Table className="addRow">
                  <TableHead>
                    <TableRow>
                      <TableCell>Header</TableCell>
                      <TableCell>Header</TableCell>
                      <TableCell>Header</TableCell>
                      <TableCell>Header</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell rowSpan={3}>Header</TableCell>
                      <TableCell>Header</TableCell>
                      <TableCell>String</TableCell>
                      <TableCell>
                        <TextField
                          hiddenLabel
                          fullWidth
                          size="small"
                          defaultValue="Undefine"
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Header</TableCell>
                      <TableCell>String</TableCell>
                      <TableCell>
                        <CmButton
                          variant="contained"
                          btnTitle="+"
                        />
                        <CmButton
                          variant="contained"
                          btnTitle="-"
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Header</TableCell>
                      <TableCell>String</TableCell>
                      <TableCell>
                        <TextField
                          hiddenLabel
                          fullWidth
                          size="small"
                          defaultValue="Undefine"
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel
            value={value}
            index={1}
          >
            <Grid
              container
              spacing={0}
            >
              {/* TreeView */}
              <Grid className="treeBox">
                <TreeView
                  aria-label="file system navigator"
                  defaultCollapseIcon={<StarsIcon />}
                  defaultExpandIcon={<StarsIcon />}
                  sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
                >
                  <TreeItem
                    nodeId="1"
                    label="Input Do1"
                  >
                    <TreeItem
                      nodeId="2"
                      label="Input Do1-1"
                    />
                  </TreeItem>
                  <TreeItem
                    nodeId="5"
                    label="Documents"
                  >
                    <TreeItem
                      nodeId="10"
                      label="OSS"
                    />
                    <TreeItem
                      nodeId="6"
                      label="MUI"
                    >
                      <TreeItem
                        nodeId="8"
                        label="index.js"
                      />
                    </TreeItem>
                  </TreeItem>
                </TreeView>
              </Grid>
              {/* Table */}
              <Grid className="tableBox">
                <Table className="addRow">
                  <TableHead>
                    <TableRow>
                      <TableCell>Input Do</TableCell>
                      <TableCell>Input Do</TableCell>
                      <TableCell>Input Do</TableCell>
                      <TableCell>Input Do</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell rowSpan={3}>Input Do</TableCell>
                      <TableCell>Input Do</TableCell>
                      <TableCell>String</TableCell>
                      <TableCell>
                        <TextField
                          hiddenLabel
                          fullWidth
                          size="small"
                          defaultValue="Undefine"
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Header</TableCell>
                      <TableCell>String</TableCell>
                      <TableCell>
                        <CmButton
                          variant="contained"
                          btnTitle="+"
                        />
                        <CmButton
                          variant="contained"
                          btnTitle="-"
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Header</TableCell>
                      <TableCell>String</TableCell>
                      <TableCell>
                        <TextField
                          hiddenLabel
                          fullWidth
                          size="small"
                          defaultValue="Undefine"
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
          </TabPanel>
        </Box>
      </Paper>
    </TestStyled>
  );
}
export default CreateTestCase;
