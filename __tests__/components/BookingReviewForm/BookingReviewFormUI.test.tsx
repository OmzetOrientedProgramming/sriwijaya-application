import {
        cleanup,
        fireEvent,
        render,
        screen,
    }   from '@testing-library/react';
import { act } from 'react-test-renderer';
import BookingReviewForm from '../../../components/BookingList/Review/BookingReviewCard';
import { BookingReviewFormWrapper } from '../../../__mocks__/bookingReviewForm/bookingReviewFormMocks';

const mockForm = <BookingReviewForm
        bookingId={1}
        placeName='test_name'
        placeImage='test_image'
        date = "2022-11-05T00:00"
        startTime= "0001-01-01T15:00"
        endTime = "0001-01-01T19:00"
        totalPrice={20000}
        />

afterEach(() => {
    cleanup();
    jest.clearAllMocks();
});

describe('Input', () => {
    test('rating and review input fields update correctly', () => {
        render(
            <BookingReviewFormWrapper>
                {mockForm}
            </BookingReviewFormWrapper>
        );
    
        const ratingInput = screen.getByLabelText('Beri Penilaian (Wajib)');
        expect(ratingInput).toHaveValue(null);

        act(() => {
            fireEvent.change(ratingInput, { target: { value: 5 } });
        });
        expect(ratingInput).toHaveValue(5);

        const reviewInput = screen.getByLabelText('Berikan Ulasan (Opsional)');
        expect(reviewInput).toHaveValue("");

        act(() => {
            fireEvent.change(reviewInput, { target: { value: "TEST REVIEW" } });
        });
        expect(reviewInput).toHaveValue("TEST REVIEW");

        const sendButton = screen.getByText('Kirim');
        act(() => {
            fireEvent.click(sendButton);
        });
    });

    test('rating input field shows required message', async () => {
        render(
            <BookingReviewFormWrapper>
                {mockForm}
            </BookingReviewFormWrapper>
        );

        expect(screen.queryByText('*Name is required')).not.toBeInTheDocument();
        const sendButton = screen.getByText('Kirim');

        act(() => {
            fireEvent.click(sendButton);
        });
      
        expect(await screen.findByText('*Penilaian wajib diisi.')).toBeInTheDocument();
    })
});


  


