import { useState } from 'react';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { act } from 'react-test-renderer';
import axios from 'axios';
import '@testing-library/jest-dom';

import { BookingFormWrapper } from '../../../__mocks__/bookingForm/bookingFormMocks';
import BookingForm from '../../../components/Booking/BookingForm';

import InputVisitor from '../../../components/Booking/BookingForm/InputVisitor';
import InputDate from '../../../components/Booking/BookingForm/InputDate';
import InputHour from '../../../components/Booking/BookingForm/InputHour';
import InputResult from '../../../components/Booking/BookingForm/InputResult';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

beforeAll(() => {
  console.error = jest.fn();
});

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('InputVisitor', () => {
  test('visitor field inputtable as expected', async () => {
    render(
      <BookingFormWrapper step={1} setStep={jest.fn()}>
        <InputVisitor
          placeName="Kopi Kenangan"
          placeImage="https://contents.file-server.net/store/6/tenant-item-image/225/044f5c08-306e-474b-97c2-fd3313109f5f-web.jpg"
          minVisitor={1}
          maxVisitor={10}
        />
      </BookingFormWrapper>
    );

    expect(screen.getByTestId('visitor-input')).toHaveValue(0);

    fireEvent.change(screen.getByTestId('visitor-input'), {
      target: { value: 1 },
    });

    expect(screen.getByTestId('visitor-input')).toHaveValue(1);

    // Test interaction if decrease button is hit
    const decreaseButton = screen.getByTestId('decrease-button');
    act(() => {
      fireEvent.click(decreaseButton);
    });
    expect(screen.getByTestId('visitor-input')).toHaveValue(0);

    // Test interaction if increase button is hit
    const increaseButton = screen.getByTestId('increase-button');
    act(() => {
      fireEvent.click(increaseButton);
    });
    expect(screen.getByTestId('visitor-input')).toHaveValue(1);
  });

  test('input visitor goes to next step given positive test', async () => {
    const Example = () => {
      let [step, setStep] = useState<number>(1);
      return (
        <>
          <BookingFormWrapper step={step} setStep={() => setStep(2)}>
            {step === 1 && (
              <InputVisitor
                placeName="Kopi Kenangan"
                placeImage="https://contents.file-server.net/store/6/tenant-item-image/225/044f5c08-306e-474b-97c2-fd3313109f5f-web.jpg"
                minVisitor={1}
                maxVisitor={10}
              />
            )}
            {step === 2 && <div>second step</div>}
          </BookingFormWrapper>
        </>
      );
    };
    act(() => {
      render(<Example />);
    });

    expect(screen.getByTestId('visitor-input')).toHaveValue(0);
    fireEvent.change(screen.getByTestId('visitor-input'), {
      target: { value: 1 },
    });

    const selanjutnyaButton = screen.getByText('Selanjutnya');

    await act(() => {
      fireEvent.click(selanjutnyaButton);
    });

    await waitFor(() => {
      expect(screen.getByText('second step')).not.toBeNull();
    });
  });

  test('input visitor goes wrong if given less than minimum visitor', async () => {
    render(
      <BookingFormWrapper step={1} setStep={jest.fn()}>
        <InputVisitor
          placeName="Kopi Kenangan"
          placeImage="https://contents.file-server.net/store/6/tenant-item-image/225/044f5c08-306e-474b-97c2-fd3313109f5f-web.jpg"
          minVisitor={1}
          maxVisitor={10}
        />
      </BookingFormWrapper>
    );

    fireEvent.change(screen.getByTestId('visitor-input'), {
      target: { value: -1 },
    });

    expect(screen.getByTestId('visitor-input')).toHaveValue(-1);

    await waitFor(() => {
      expect(
        screen.getByText('*Visitor is less than the minimum accepted visitors!')
      );
    });
  });

  test('input visitor goes wrong if given less than maximum visitor', async () => {
    render(
      <BookingFormWrapper step={1} setStep={jest.fn()}>
        <InputVisitor
          placeName="Kopi Kenangan"
          placeImage="https://contents.file-server.net/store/6/tenant-item-image/225/044f5c08-306e-474b-97c2-fd3313109f5f-web.jpg"
          minVisitor={1}
          maxVisitor={10}
        />
      </BookingFormWrapper>
    );

    fireEvent.change(screen.getByTestId('visitor-input'), {
      target: { value: 11 },
    });

    expect(screen.getByTestId('visitor-input')).toHaveValue(11);

    await waitFor(() => {
      expect(
        screen.getByText('*Visitor is over the maximum accepted visitors!')
      );
    });
  });
});
