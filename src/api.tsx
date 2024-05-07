import axios, {AxiosResponse} from 'axios';

const API_BASE_URL = 'http://localhost:8083/api';

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

export const getCustomersByFirstName = (firstName: string): Promise<AxiosResponse<Customer[]>> => {
    return axios.get(`${API_BASE_URL}/v1/get/customers/by/firstName/${firstName}`)
}

export const getCustomersByLastName = (lastName: string): Promise<AxiosResponse<Customer[]>> => {
    return axios.get(`${API_BASE_URL}/v1/get/customers/by/lastName/${lastName}`)
}