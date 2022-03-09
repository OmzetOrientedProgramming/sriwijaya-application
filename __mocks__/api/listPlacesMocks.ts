import { AxiosResponse } from "axios";

export const placePaginationSuccessResponse = {
    status: 200,
    message: "success",
    data: {
        pagination: {
            limit: 5,
            page: 1,
            first_url: "string",
            last_url: "string",
            next_url: "string",
            previous_url: "string",
            total_page: 5
        },
        places: [
            {
                id: 0,
                name: "mock_place_name_0",
                description: "mock_place_descriptions_0",
                address: "mock_place_address_0",
                distance: 50,
                rating: 3.5,
                review_count: 10
            },
            {
                id: 1,
                name: "mock_place_name_1",
                description: "mock_place_descriptions_1",
                address: "mock_place_address_1",
                distance: 50,
                rating: 2,
                review_count: 10
            },
            {
                id: 2,
                name: "mock_place_name_2",
                description: "mock_place_descriptions_2",
                address: "mock_place_address_2",
                distance: 50,
                rating: 1,
                review_count: 10
            },
            {
                id: 3,
                name: "mock_place_name_3",
                description: "mock_place_descriptions_3",
                address: "mock_place_address_3",
                distance: 50,
                rating: 1.2,
                review_count: 23
            },
            {
                id: 4,
                name: "mock_place_name_4",
                description: "mock_place_descriptions_4",
                address: "mock_place_address_4",
                distance: 50,
                rating: 4.7,
                review_count: 15
            }
        ]
    }
}