import { AxiosResponse } from "axios";

export const dummyResponse = {
    status: 200,
    message: "success",
    data: {
        id: 1,
        name: "test tempat",
        image: "https://www.visa.co.id/dam/VCOM/regional/ap/indonesia/global-elements/marquees/marquee-wonderful-indonesia-640x640.jpg",
        distance: 9,
        address: "jakarta",
        description: "test tempat description",
        open_hour: "09:00",
        close_hour: "21:00",
        booking_price: 15000,
        average_rating: 4.5,
        review_count: 20,
        min_slot: 1,
        max_slot: 10,
        reviews: [
            {
                id: 1,
                user: "test user",
                rating: 5,
                content : "bagus banget tempatnyaa"
            },
            {
                id: 2,
                user: "test user 2",
                rating: 5,
                content: "bagus banget tempatnyaa"
            }
        ]
    } 
}

export const mockedResponse = {
    status: 200,
    message : "success",
    data: dummyResponse,
    statusText : 'OK',
    headers: {},
    config: {},
}

export const getParams = {
    id : "1",
}