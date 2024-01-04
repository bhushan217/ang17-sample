import { environment } from '../../environments/environment.prod';

export const API_URL: string = environment.apiURL;

export const API_ENDPOINTS = {
  // Authentication
  user: API_URL + '/users',
  unit: API_URL + '/units',
};