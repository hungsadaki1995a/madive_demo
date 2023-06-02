import { SyntheticEvent, useState } from 'react';

// img, icon
import StarsIcon from '@mui/icons-material/StarsOutlined';
import { TreeItem, TreeView } from '@mui/lab';
import {
  Box,
  Grid,
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

// Common Atoms
import { CmButton } from '@/components/atoms/CmButton';
import CmModal from '@/components/atoms/CmModal';

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

type ViewTestResultModalProps = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
};

export default function ViewTestResultModal({ visible, handleSave, handleClose }: ViewTestResultModalProps) {
  const [value, setValue] = useState(0);
  const [test, setTest] = useState('');
  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <CmModal
      title="View Test Result"
      visible={visible}
      onSave={handleSave}
      onClose={handleClose}
      className="medium"
    >
      {/* contents */}
      <Box className="inputDataBox">
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
              label="Output Do"
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
                    <TableCell>
                      <span className="success">success</span>
                    </TableCell>
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
                    <TableCell>
                      <span className="error">Error</span>
                    </TableCell>
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
    </CmModal>
  );
}
