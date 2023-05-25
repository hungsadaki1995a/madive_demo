import { TestCaseFilterDto, TestCaseListResponseDto } from '@/types/dtos/testCaseDtos';
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
};

export default TestCaseApi;
