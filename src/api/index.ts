import { ActivityLevel, MaleEnum } from '@lib/commonTypes';
import axios from 'axios';

export const https = axios.create({
  baseURL: 'https://gym-fit.p.rapidapi.com/v1/',
  headers: {
    'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
    'x-rapidapi-host': process.env.NEXT_PUBLIC_RAPIDAPI_HOST
  }
});
export type TdeeTypes = {
  activityLevel: ActivityLevel;
  gender: MaleEnum;
  age: string;
  weight: string;
  height: string;
};
export const getTdee = async (params: TdeeTypes) => {
  return await https
    .get('calculator/tdee', {
      params: params
    })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
};
