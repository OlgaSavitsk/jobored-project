import {
  Favorites,
  FilterParams,
  IndustryInfo,
  VacancyData,
} from 'core/models/vacancy.model';

export enum ActionType {
  SetData,
  Fetching,
  SetParams,
  SetIndustryData,
  AddFavorites,
}

export type SetParams = {
  type: ActionType.SetParams;
  payload: FilterParams | Favorites;
};

export interface AddFavorites {
  type: ActionType.AddFavorites;
  payload: number | number[];
}

export interface SetData {
  type: ActionType.SetData;
  payload: VacancyData;
}

export interface SetIndustryData {
  type: ActionType.SetIndustryData;
  payload: IndustryInfo[];
}

export interface Fetching {
  type: ActionType.Fetching;
  payload: boolean;
}

export const setParamsValue = (params: FilterParams | Favorites): SetParams => ({
  type: ActionType.SetParams,
  payload: params,
});

export const addFavoriteId = (id: number | number[]): AddFavorites => ({
  type: ActionType.AddFavorites,
  payload: id,
});

export const setData = (data: VacancyData): SetData => ({
  type: ActionType.SetData,
  payload: data,
});

export const setIndustryData = (data: IndustryInfo[]): SetIndustryData => ({
  type: ActionType.SetIndustryData,
  payload: data,
});

export type AppAction = SetParams | AddFavorites | SetData | SetIndustryData | Fetching;
