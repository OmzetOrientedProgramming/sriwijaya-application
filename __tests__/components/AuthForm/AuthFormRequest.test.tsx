import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { headers } from '../../../api/constants';
import {
  mockCheckPhoneResponse,
  checkPhoneParams,
  mockRegisterCustomerResponse,
  registerCustomerParams,
} from '../../../__mocks__/api/registrationMocks';
import InputPhone from '../../../components/LandingPage/AuthForm/InputPhone';
import { AuthFormWrapper } from '../../../__mocks__/authForm/authFormMocks';
import axios from 'axios';
import React from 'react';
import endpoint from '../../../api/endpoint';
import InputName from '../../../components/LandingPage/AuthForm/InputName';

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
        <InputPhone />
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

describe('useRegisterCustomer()', () => {
  test('register customer request successful', async () => {
    mockAxios.post.mockResolvedValueOnce(mockRegisterCustomerResponse);

    render(
      <AuthFormWrapper>
        <InputName />
      </AuthFormWrapper>
    );

    const nameInput = screen.getByLabelText('Nama*');
    fireEvent.change(nameInput, {
      target: { value: registerCustomerParams.full_name },
    });

    fireEvent.click(screen.getByText('Selanjutnya'));

    await waitFor(() => {
      expect(mockAxios.post).toHaveBeenCalledTimes(1);
      expect(setStateMock).toHaveBeenCalled();
    });
  });
});
