import {
  TestCaseDeleteResponseDto,
  TestCaseDetailResponseDto,
  TestCaseFilterDto,
  TestCaseListResponseDto,
  TestCaseRequestDto,
} from '@/types/dtos/testCaseDtos';
import axios, { AxiosError } from 'axios';

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
};

export default TestCaseApi;
