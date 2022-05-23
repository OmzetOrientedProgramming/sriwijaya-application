import React, { createContext, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AxiosResponse } from 'axios';

import BookingReviewCard from '../../components/BookingList/Review/BookingReviewCard';

interface BookingReviewFormWrapperProps {
    rating?:number,
    review?:string,
}

export const BookingReviewFormWrapper: React.FC<BookingReviewFormWrapperProps> = ({
    rating,
    review,
    children,
}) => {
    const queryClient = new QueryClient();

    const BookingReviewFormContext = createContext<{
        step: number;
        setStep: any;
    }>({
        step: 1,
        setStep: null,
    });

    const [step, setStep] = useState(1);
    const methods = useForm({
        mode: 'onChange',
        defaultValues: {
        rating: rating || 0,
        review: review || '',
        },
    });

    return (
        <QueryClientProvider client={queryClient}>
        <BookingReviewFormContext.Provider
            value={{
            step: step,
            setStep: setStep,
            }}
        >
            <FormProvider {...methods}>
            {children}
            </FormProvider>
        </BookingReviewFormContext.Provider>
        </QueryClientProvider>
    );
};

