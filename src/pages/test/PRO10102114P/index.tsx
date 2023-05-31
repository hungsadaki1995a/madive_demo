import { useState } from 'react';

import SelectTargetDataModal from './modal/PRO10102115M';
import SelectResourceDataModal from './modal/PRO10102116M';
import ViewTestResultModal from './modal/PRO10102117M';
import SaveTestCaseModal from './modal/PRO10102118M';

type propsType = {
  title: string;
};

function EditTestCase(props: propsType) {
  const { title } = props;

  const [isSelectTargetDataModalVisible, setIsSelectTargetDataModalVisible] = useState(false);
  const [isSelectResourceDataModalVisible, setIsSelectResourceDataModalVisible] = useState(false);
  const [isViewTestResultModalVisible, setIsViewTestResultModalVisible] = useState(false);
  const [isSaveTestCaseModalVisible, setIsSaveTestCaseModalVisible] = useState(false);

  // Select Target Data Modal Open
  const handleSelectTargetDataModalOpen = () => {
    setIsSelectTargetDataModalVisible(true);
  };

  // Select Target Data Modal Close
  const handleSelectTargetDataModalClose = () => {
    setIsSelectTargetDataModalVisible(false);
  };

  // Select Resource Data Modal Open
  const handleSelectResourceDataModalOpen = () => {
    setIsSelectResourceDataModalVisible(true);
  };

  // Select Resource Data Modal Close
  const handleSelectResourceDataModalClose = () => {
    setIsSelectResourceDataModalVisible(false);
  };

  // View Test Result Modal Open
  const handleViewTestResultModalOpen = () => {
    setIsViewTestResultModalVisible(true);
  };

  // View Test Result Modal Close
  const handleViewTestResultModalClose = () => {
    setIsViewTestResultModalVisible(false);
  };

  // Save Test Case Modal Open
  const handleSaveTestCaseModalOpen = () => {
    setIsSaveTestCaseModalVisible(true);
  };

  // Save Test Case Modal Close
  const handleSaveTestCaseModalClose = () => {
    setIsSaveTestCaseModalVisible(false);
  };

  return (
    <>
      {title}

      {/* Select Target Data - Modal */}
      <SelectTargetDataModal
        visible={isSelectTargetDataModalVisible}
        handleClose={handleSelectTargetDataModalClose}
      />

      {/* Select Resource Data - Modal */}
      <SelectResourceDataModal
        visible={isSelectResourceDataModalVisible}
        handleClose={handleSelectResourceDataModalClose}
      />

      {/* View Test Result - Modal */}
      <ViewTestResultModal
        visible={isViewTestResultModalVisible}
        handleClose={handleViewTestResultModalClose}
      />

      {/* Save Test Case - Modal */}
      <SaveTestCaseModal
        visible={isSaveTestCaseModalVisible}
        handleClose={handleSaveTestCaseModalClose}
      />
    </>
  );
}
export default EditTestCase;
