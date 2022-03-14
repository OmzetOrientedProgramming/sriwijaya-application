import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { headers } from '../../../api/constants';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  mockCheckPhoneResponse,
  checkPhoneParams,
  verifyOTPParams,
  mockVerifyOTPResponse,
} from '../../../__mocks__/api/authMocks';
import InputPhone from '../../../components/LandingPage/AuthForm/InputPhone';
import {
  AuthFormWrapper,
  registerSession,
  loginSession,
} from '../../../__mocks__/authForm/authFormMocks';
import axios from 'axios';
import React from 'react';
import endpoint from '../../../api/endpoint';
import InputName from '../../../components/LandingPage/AuthForm/InputName';
import AuthForm from '../../../components/LandingPage/AuthForm';
import { AuthFormSession } from '../../../components/LandingPage/AuthForm/types';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

const setStateMock = jest.fn();
const useStateMock: any = (useState: any) => [useState, setStateMock];
jest.spyOn(React, 'useState').mockImplementation(useStateMock);

beforeAll(() => {
  console.error = jest.fn();
});

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('useCheckPhoneNumber()', () => {
  test('check phone number request successful', async () => {
    mockAxios.post.mockResolvedValueOnce(mockCheckPhoneResponse);

    render(
      <AuthFormWrapper>
        <InputPhone session={checkPhoneParams.session as AuthFormSession} />
      </AuthFormWrapper>
    );

    const phoneInput = screen.getByLabelText('Nomor HP*');
    fireEvent.change(phoneInput, {
      target: { value: checkPhoneParams.phone_number.slice(1) },
    });

    fireEvent.click(screen.getByText('Selanjutnya'));

    await waitFor(() => {
      expect(mockAxios.post).toHaveBeenCalledTimes(1);
      expect(mockAxios.post).toHaveBeenCalledWith(
        endpoint.checkPhoneNumber,
        {
          phone_number: checkPhoneParams.phone_number,
        },
        {
          headers: headers,
          params: { session: checkPhoneParams.session },
        }
      );
      expect(setStateMock).toHaveBeenCalled();
    });
  });
});

describe('test step', () => {
  test('step 1 to step 2 renders as expected', async () => {
    const queryClient = new QueryClient();

    mockAxios.post.mockResolvedValueOnce(mockCheckPhoneResponse);

    render(
      <QueryClientProvider client={queryClient}>
        <AuthForm session={registerSession} />
      </QueryClientProvider>
    );

    const phoneInput = screen.getByLabelText('Nomor HP*');
    fireEvent.change(phoneInput, {
      target: { value: checkPhoneParams.phone_number.slice(1) },
    });

    fireEvent.click(screen.getByText('Selanjutnya'));
    await waitFor(async () => {
      expect(screen.getByText('Verifikasi nomor teleponmu')).not.toBeNull();
    });
  });
});
