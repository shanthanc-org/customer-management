import axios, {AxiosResponse} from 'axios';

const API_BASE_URL = 'http://localhost:8083/api';

export const US_STATES = [
    {code: 'AL', name: 'Alabama'},
    {code: 'AK', name: 'Alaska'},
    {code: 'AZ', name: 'Arizona'},
    {code: 'AR', name: 'Arkansas'},
    {code: 'CA', name: 'California'},
    {code: 'CO', name: 'Colorado'},
    {code: 'CT', name: 'Connecticut'},
    {code: 'DE', name: 'Delaware'},
    {code: 'FL', name: 'Florida'},
    {code: 'GA', name: 'Georgia'},
    {code: 'HI', name: 'Hawaii'},
    {code: 'ID', name: 'Idaho'},
    {code: 'IL', name: 'Illinois'},
    {code: 'IN', name: 'Indiana'},
    {code: 'IA', name: 'Iowa'},
    {code: 'KS', name: 'Kansas'},
    {code: 'KY', name: 'Kentucky'},
    {code: 'LA', name: 'Louisiana'},
    {code: 'ME', name: 'Maine'},
    {code: 'MD', name: 'Maryland'},
    {code: 'MA', name: 'Massachusetts'},
    {code: 'MI', name: 'Michigan'},
    {code: 'MN', name: 'Minnesota'},
    {code: 'MS', name: 'Mississippi'},
    {code: 'MO', name: 'Missouri'},
    {code: 'MT', name: 'Montana'},
    {code: 'NE', name: 'Nebraska'},
    {code: 'NV', name: 'Nevada'},
    {code: 'NH', name: 'New Hampshire'},
    {code: 'NJ', name: 'New Jersey'},
    {code: 'NM', name: 'New Mexico'},
    {code: 'NY', name: 'New York'},
    {code: 'NC', name: 'North Carolina'},
    {code: 'ND', name: 'North Dakota'},
    {code: 'OH', name: 'Ohio'},
    {code: 'OK', name: 'Oklahoma'},
    {code: 'OR', name: 'Oregon'},
    {code: 'PA', name: 'Pennsylvania'},
    {code: 'RI', name: 'Rhode Island'},
    {code: 'SC', name: 'South Carolina'},
    {code: 'SD', name: 'South Dakota'},
    {code: 'TN', name: 'Tennessee'},
    {code: 'TX', name: 'Texas'},
    {code: 'UT', name: 'Utah'},
    {code: 'VT', name: 'Vermont'},
    {code: 'VA', name: 'Virginia'},
    {code: 'WA', name: 'Washington'},
    {code: 'WV', name: 'West Virginia'},
    {code: 'WI', name: 'Wisconsin'},
    {code: 'WY', name: 'Wyoming'},
];

export const ACCOUNT_KEY_PATTERN = /^[1-5][0-9]{8}$/;

export interface Address {
    street: string;
    city: string;
    state: string;
    zipCode: string;
}

export interface Customer {
    accountKey?: string;
    accountNumber?: string;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    ssn: string;
    phoneNumber: string;
    address: Address;
}

export interface UpdateAddress {
    accountKey: string;
    address: Address;
}

export interface CustomerAddSuccessResponse {
    accountKey: string;
    accountNumber: string;
}

export interface DefaultSuccessResponse {
    accountKey: string;
    message: string;
}

export interface ErrorResponse {
    errorMessage: string;
}

export const addCustomer = (customer: Customer):
    Promise<AxiosResponse<CustomerAddSuccessResponse>> => {
    return axios.post(`${API_BASE_URL}/v1/add/customer`, customer)
};

export const updateCustomerAddress = (updateAddress: UpdateAddress):
    Promise<AxiosResponse<DefaultSuccessResponse>> => {
    return axios.put(`${API_BASE_URL}/v1/customer/update/address`, updateAddress)
}

export const deleteCustomer = (accountKey: string): Promise<AxiosResponse<DefaultSuccessResponse>> => {
    return axios.delete(`${API_BASE_URL}/v1/delete/customer/${accountKey}`)
};

export const getCustomer = (accountKey: string): Promise<AxiosResponse<Customer>> => {
    return axios.get(`${API_BASE_URL}/v1/get/customer/${accountKey}`)
}

export const getCustomerList = (searchType: 'firstName' | 'lastName', searchValue: string):
    Promise<AxiosResponse<Customer[]>> => {
    return axios.get(`${API_BASE_URL}/v1/get/customers/by/${searchType}/${searchValue}`)
}


