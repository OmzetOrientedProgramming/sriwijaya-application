import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { act } from 'react-test-renderer';
import AuthForm from '../../../components/Auth/AuthForm';
import InputName from '../../../components/Auth/AuthForm/InputName';
import InputOTP, {
  combineArrayToString,
} from '../../../components/Auth/AuthForm/InputOTP';
import { AuthFormWrapper } from '../../../__mocks__/authForm/authFormMocks';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('InputPhone', () => {
  test('phone input field updates correctly', () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <AuthForm session="register" />
      </QueryClientProvider>
    );

    const phoneInput = screen.getByLabelText('Nomor HP*');
    expect(phoneInput).toHaveValue(null);

    fireEvent.change(phoneInput, { target: { value: '8123456789' } });
    expect(phoneInput).toHaveValue(8123456789);
  });

  test('error message displayed when invalid', async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <AuthForm session="register" />
      </QueryClientProvider>
    );

    expect(
      screen.queryByText('*Phone number is required')
    ).not.toBeInTheDocument();
    const nextButton = screen.getByText('Selanjutnya');

    act(() => {
      fireEvent.click(nextButton);
    });

    expect(
      await screen.findByText('*Phone number is required')
    ).toBeInTheDocument();

    const phoneInput = screen.getByLabelText('Nomor HP*');
    fireEvent.change(phoneInput, { target: { value: '812345678987654321' } });

    expect(
      await screen.findByText('*Phone number is invalid')
    ).toBeInTheDocument();
  });
});

describe('InputOTP', () => {
  test('otp input field updates correctly', () => {
    render(
      <AuthFormWrapper>
        <InputOTP session="register" />
      </AuthFormWrapper>
    );

    const otpInput1 = screen.getByTestId('otp-1');
    const otpInput2 = screen.getByTestId('otp-2');
    expect(otpInput1).toHaveValue(null);
    expect(otpInput2).toHaveValue(null);

    fireEvent.change(otpInput1, { target: { value: '2' } });
    fireEvent.change(otpInput2, { target: { value: '1' } });
    expect(otpInput1).toHaveValue(2);
    expect(otpInput2).toHaveValue(1);
    expect(screen.getByTestId('otp-0')).toHaveValue(null);
  });

  test('combineArrayToString works correctly', () => {
    const mockOtpData: string[] = ['1', '4', '0', '4', '5', '6'];
    const res = combineArrayToString(mockOtpData);

    expect(res).toEqual('140456');
  });

  test('error message displayed when invalid', async () => {
    render(
      <AuthFormWrapper>
        <InputOTP session="register" />
      </AuthFormWrapper>
    );

    expect(screen.queryByText('*OTP is invalid')).not.toBeInTheDocument();
    const nextButton = screen.getByText('Selanjutnya');

    act(() => {
      fireEvent.click(nextButton);
    });

    expect(await screen.findByText('*OTP is invalid')).toBeInTheDocument();
  });
});

describe('InputName', () => {
  test('name input field updates correctly', () => {
    render(
      <AuthFormWrapper>
        <InputName session="register" />
      </AuthFormWrapper>
    );

    const nameInput = screen.getByLabelText('Nama*');
    expect(nameInput).toHaveValue('');

    fireEvent.change(nameInput, { target: { value: 'Budi Budiman' } });
    expect(nameInput).toHaveValue('Budi Budiman');
  });

  test('error message displayed when invalid', async () => {
    render(
      <AuthFormWrapper>
        <InputName session="register" />
      </AuthFormWrapper>
    );
    expect(screen.queryByText('*Name is required')).not.toBeInTheDocument();
    const nextButton = screen.getByText('Selanjutnya');

    act(() => {
      fireEvent.click(nextButton);
    });

    expect(await screen.findByText('*Name is required')).toBeInTheDocument();

    const nameInput = screen.getByLabelText('Nama*');
    fireEvent.change(nameInput, { target: { value: '123Crawler' } });

    expect(await screen.findByText('*Name is invalid')).toBeInTheDocument();
  });

  test('error too long message displayed when invalid', async () => {
    render(
      <AuthFormWrapper>
        <InputName session="register" />
      </AuthFormWrapper>
    );

    const nameInput = screen.getByLabelText('Nama*');
    fireEvent.change(nameInput, {
      target: { value: 'Bu Budi Budiman Budimanto Budimantowandi XII' },
    });
    expect(nameInput).toHaveValue(
      'Bu Budi Budiman Budimanto Budimantowandi XII'
    );

    expect(await screen.findByText('*Name is too long')).toBeInTheDocument();
  });
});
