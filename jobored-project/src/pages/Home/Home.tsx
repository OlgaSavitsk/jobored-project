import { Box, Group } from '@mantine/core';
import { VacancyCardList } from 'components/CardList/CardList';
import { FilterForm } from 'components/Filter/Filter';
import { PaginationComponent } from 'components/Pagination/Pagination';
import { SearchField } from 'components/Search/SearchField';
import { useEffect } from 'react';
import { setParamsValue, useParams } from 'store';
import { useHomeStyles } from './styles';

const Home = () => {
  const { classes } = useHomeStyles();
  const { dispatch } = useParams();

  useEffect(() => {
    dispatch(setParamsValue({ ids: [] }));
  }, [dispatch]);

  return (
    <div className={classes.container}>
      <Box className={classes.wrapper} mt={40}>
        <FilterForm />
        <Group className={classes.inner}>
          <SearchField />
          <VacancyCardList />
          <PaginationComponent />
        </Group>
      </Box>
    </div>
  );
};

export default Home;
