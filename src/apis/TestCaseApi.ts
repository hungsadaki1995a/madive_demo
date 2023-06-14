import axios, { AxiosError } from 'axios';

import {
  TestCaseDeleteResponseDto,
  TestCaseDetailResponseDto,
  TestCaseDto,
  TestCaseFilterDto,
  TestCaseListResponseDto,
  TestCaseRequestDto,
} from '@/types/dtos/testCaseDtos';

const TestCaseApi = {
  getTestCases: async (filterDto: TestCaseFilterDto): Promise<TestCaseListResponseDto | any> => {
    try {
      const { data } = await axios.get<TestCaseListResponseDto>(
        'http://101.101.209.11:14000/proobject/proobject-manager/TestCaseList',
        {
          params: {
            [JSON.stringify({
              dto: filterDto,
            })]: '',
            _: new Date().getTime(),
          },
        }
      );
      return data;
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },
  getHistoryTest: async (filterDto: TestCaseFilterDto): Promise<TestCaseListResponseDto | any> => {
    try {
      const { data } = await axios.get<TestCaseListResponseDto>(
        'http://101.101.209.11:14000/proobject/proobject-manager/TestCaseList',
        {
          params: {
            [JSON.stringify({
              dto: filterDto,
            })]: '',
            _: new Date().getTime(),
          },
        }
      );
      return data;
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },
  getTestCaseResourceInfo: async (testCaseRequestDto: TestCaseRequestDto): Promise<TestCaseDetailResponseDto | any> => {
    try {
      const { data } = await axios.get<TestCaseListResponseDto>(
        'http://101.101.209.11:14000/proobject/proobject-manager/TestCaseRscInfo',
        {
          params: {
            [JSON.stringify({
              dto: testCaseRequestDto,
            })]: '',
            _: new Date().getTime(),
          },
        }
      );
      return data;
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },
  deleteTestCase: async (testCaseId: string): Promise<TestCaseDeleteResponseDto | any> => {
    try {
      const { data } = await axios.delete('http://101.101.209.11:14000/proobject/proobject-manager/TestCase', {
        data: {
          dto: {
            testcase_id: testCaseId,
          },
        },
      });
      return data;
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },
  runTestCase: async (testCaseData: TestCaseDto) => {
    try {
      const { data } = await axios.post(
        `http://101.101.209.11:14000/${testCaseData.application_name}/${testCaseData.service_group_name}/${testCaseData.service_name}?action=`,
        {
          dto: JSON.parse(testCaseData.input_data),
          header: JSON.parse(testCaseData.header_data),
        }
      );
      return data;
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response?.data : error;
    }
  },
};

export default TestCaseApi;
