import { VACANCY_API_PATH } from 'constants/api.constants';
import {
  Favorites,
  VacancyData,
  VacancyFilterParams,
  VacancyInfo,
} from 'core/models/vacancy.model';
import { baseInstance, getRequest } from './api-base.service';

export const getVacancies = (
  filterParams: VacancyFilterParams | Favorites,
): Promise<VacancyData> => {
  return getRequest(
    baseInstance.get<VacancyData>(VACANCY_API_PATH, {
      params: filterParams,
    }),
  );
};

export const getVacancy = (vacancyId: string): Promise<VacancyInfo> => {
  return getRequest(baseInstance.get<VacancyInfo>(`${VACANCY_API_PATH}${vacancyId}`));
};
