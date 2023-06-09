import { useEffect, useMemo } from 'react';
import { Box, Group } from '@mantine/core';
import { VacancyCardList, PaginationComponent } from 'components';
import { setParamsValue, useAppState } from 'store';
import { useFavouritesStyles } from './styles';
import { VacancyFilterParams, VacancyInfo } from 'core/models';

export const FavoritesPage = () => {
  const { classes } = useFavouritesStyles();
  const {
    state: { data, favorites, params },
    dispatch,
  } = useAppState();

  const vacanciesData = useMemo(() => {
    return data?.objects.filter((vacancy: VacancyInfo) =>
      favorites.ids.includes(vacancy.id),
    );
  }, [data, favorites.ids]);

  useEffect(() => {
    if (vacanciesData?.length === 0) {
      dispatch(
        setParamsValue({ ...params, page: (params as VacancyFilterParams).page! - 1 }),
      );
    }
  }, [data, favorites.ids]);

  return (
    <div className="container">
      <Box className={classes.wrapper} mt={40}>
        <Group className={classes.inner}>
          <VacancyCardList data={vacanciesData} />
          <PaginationComponent />
        </Group>
      </Box>
    </div>
  );
};
