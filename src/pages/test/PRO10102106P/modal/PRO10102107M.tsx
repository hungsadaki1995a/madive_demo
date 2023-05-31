import CmModal from '@/components/atoms/CmModal';

import { ITestCaseExecResult } from '../types';

type TestCaseExecResultModalProps = {
  resultData: ITestCaseExecResult;
  handleClose: () => void;
  isOpen: boolean;
};

// export default function TestCaseExecResultModal({ resultData, handleClose, isOpen }: TestCaseExecResultModalProps) {
//   const footerRender = () => (
//     <Box className="alignL">
//       <CmButton
//         variant="contained"
//         btnTitle="OK"
//         startIcon={<></>}
//         className=""
//         color="info"
//         onClick={handleClose}
//       />
//     </Box>
//   );

//   const renderTestFailComponent = () => {
//     return (
//       <Grid
//         container
//         columnSpacing={4}
//       >
//         <Grid
//           item
//           xs={12}
//         >
//           <label className="labelFormArea">
//             <span>response code</span>
//             <TextField
//               className="labelTextField"
//               value={resultData.responseCode}
//               size="small"
//               disabled
//             />
//           </label>
//         </Grid>
//         <Grid
//           item
//           xs={12}
//         >
//           <label className="labelFormArea">
//             <span>exception</span>
//             <TextareaAutosize
//               className="labelTextField"
//               value={resultData.stackTrace}
//               disabled
//               minRows={8}
//             />
//           </label>
//         </Grid>
//       </Grid>
//     );
//   };

//   return (
//     <CmModal
//       title={resultData.success ? 'Success' : 'Error'}
//       visible={isOpen}
//       onClose={handleClose}
//       className="medium"
//       footerRenderAs={footerRender}
//     >
//       {resultData.success ? renderTestFailComponent() : renderTestFailComponent()}
// import CmModal from '@/components/atoms/CmModal';

type ViewTestResultModalProps = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
};

export default function ViewTestResultModal({ visible, handleSave, handleClose }: ViewTestResultModalProps) {
  return (
    <CmModal
      title="View Test Result"
      visible={visible}
      onSave={handleSave}
      onClose={handleClose}
      className="medium"
    >
      {/* contents */}
      contents area
    </CmModal>
  );
}
