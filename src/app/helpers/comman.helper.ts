import axios from 'axios';
import { API_BASE_URL, API_AUTH_BASE_URL } from '../constants/config.constant';
import { LOGIN_TOKEN_KEY } from './local.storage.helper';
import { API_STATE } from 'app/stores/api.reducer';

/**
 *
 * @param listingData {data: [], filter: {key, value}}
 */

interface color {
  [key: string]: string;
}

export interface IListObj {
  apiState: number;
  data: any[];
  error?: string;
}

export interface IBatch {
  id: string;
  name: string;
  subjects: IChapter[];
}

export interface IChapter {
  ids: string[];
  name: string;
  proficiency: string;
  topics: {
    total: number;
    unlocked: number;
  };
}

export interface IStudent {
  id: string;
  name: string;
  enrollmentNo: string;
  submissions: { total: number; count: number };
  proficiency: string;
}

export function filterData(listingData: any) {
  const { data = [], filter = {} } = listingData;
  const { key, value } = filter;
  const regexValue = new RegExp(value, 'i');
  const filteredData = data.filter((el: any) => {
    return regexValue.exec(el[key]);
  });
  return filteredData;
}

export function titleCase(str: string) {
  if (!str) {
    return '';
  }
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const colorList: color = {
  a: '#ffbc58',
  b: '#420420',
  c: '#bada55',
  d: '#002060',
  e: '#d3ffce',
  f: '#b6fcd5',
  g: '#b4eeb4',
  h: '#a0db8e',
  i: '#00ff00',
  j: '#7f00ff',
  k: '#d4af37',
  l: '#094276',
  m: '#505c5e',
  n: '#000000',
  o: '#317256',
  p: '#FFE3E3',
  q: '#99cccc',
  r: '#954bff',
  s: '#D1EAFF',
  t: '#d9a0c6',
  u: '#d0a0d9',
  v: '#a9d9a0',
  w: '#024500',
  x: '#301d12',
  y: '#596e78',
  z: '#a8d3ee',
};

export const getColorCode = (color: string) => colorList[color];

export function sortProficiencyFunction(list: any[]) {
  return list.sort((item1: any, item2: any) => {
    if (item1.proficiency === 'NA') {
      return -1;
    } else {
      return (
        item1.proficiency.replace(/[%]/g, '') -
        item2.proficiency.replace(/[%]/g, '')
      );
    }
  });
}

export const API_REQUEST_TIMEOUT = 30000;

// creating axios instance
export const publicAxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: API_REQUEST_TIMEOUT,
});
export const createPrivateAxiosInstance = function() {
  // TODO - add a way to skip this step in every call
  return axios.create({
    baseURL: API_AUTH_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem(LOGIN_TOKEN_KEY),
    },
    timeout: API_REQUEST_TIMEOUT,
  });
};

export const isLoading = (state: number) => state === API_STATE.LOADING;

export const isApiFailed = (state: number) =>
  state === API_STATE.ERROR || state === API_STATE.FAILED;
