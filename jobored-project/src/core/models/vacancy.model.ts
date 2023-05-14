export interface VacancyData {
  objects: VacancyInfo[];
  total: number;
}

export interface VacancyInfo {
  id: number;
  profession: string;
  town: {
    title: string;
  };
  catalogues: { title: string }[];
  type_of_work: { title: string };
  payment_to: number;
  payment_from: number;
  currency: string;
}

export interface IndustryInfo {
  title: string;
  key: number;
}

export type VacancyFilterParams = {
  count: number;
  published: number;
} & FilterParams;

export type FilterParams = {
  page?: number;
  keyword?: string;
  catalogues?: number[];
  payment_from?: number;
  payment_to?: number;
};

export interface Favorites {
  ids: number[];
}