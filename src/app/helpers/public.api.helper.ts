import { loginUserParamsInterface } from 'app/types/api.params.types';
import { publicAxiosInstance } from './comman.helper';

export async function loginUser(params: loginUserParamsInterface) {
  return await publicAxiosInstance.post('/users/login', params);
}

export async function forgetPasswordRequest(params: any) {
  return await publicAxiosInstance.post('/users/password/recovery', params);
}

export async function getOrganizations() {
  return await publicAxiosInstance.get('/organizations');
}

export async function getOrganizationCentres(orgId: string) {
  return await publicAxiosInstance.get('/orgcenters?orgId=' + orgId);
}
