'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import css from './MedicinePage.module.css';
import { getProducts } from '@/app/lib/api/client/products';
import { useEffect, useState } from 'react';
import { MedicineList } from './components/MedicineList/MedicineList';
import { Pagination } from '@/app/components/Pagination/Pagination';
import { Title } from '../medicine-store/components/Title/Title';
import { Input } from '@/app/(auth)/components/Input';
import { Button } from '@/app/components/Button/Button';
import Select, { SingleValue } from 'react-select';
import { selectStyles } from '@/app/lib/services/reactSelectStyles';
import { Icon } from '@/app/components/Icon/Icon';
import { getCategories } from '@/app/lib/api/client/products';
import { Loader } from '@/app/components/Loader/Loader';
import { ErrorMessage } from '@/app/components/ErrorMessage/ErrorMessage';

type SelectOption = {
  value: string;
  label: string;
};

export default function MedicinePage() {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const categoryOptions = categories.map((category: string) => ({
    value: category,
    label: category,
  }));

  const {
    data: productsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['products', debouncedSearch, page, category],
    queryFn: () => getProducts({ search: debouncedSearch, page, category }),
    placeholderData: keepPreviousData,
  });

  const products = productsData?.products ?? [];

  const totalPages = productsData?.totalPages ?? 0;

  const handleReset = () => {
    setSearch('');
    setCategory(null);

    setPage(1);
  };

  const handleClear = () => {
    setSearch('');
    setPage(1);
  };

  return (
    <section className={css.medicinePage}>
      <Title>Medicine</Title>

      <div className={css.formWrapper}>
        <form id="filter-form" className={css.inputs}>
          <Select<SelectOption>
            options={categoryOptions}
            id="category"
            value={
              categoryOptions.find(
                (option: SelectOption) => option?.value === category,
              ) ?? null
            }
            placeholder="Product category"
            className={css.select}
            styles={selectStyles}
            onChange={(option: SingleValue<SelectOption>) =>
              setCategory(option?.value || null)
            }
          />
          <div className={css.inputWrap}>
            <Input
              label="search"
              id="search"
              className={css.input}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className={css.buttons}>
              {search && (
                <button
                  type="button"
                  className={css.clearButton}
                  onClick={handleClear}
                >
                  <Icon name="icon-x" className={css.icon} />
                </button>
              )}
              <div className={css.clearButton}>
                <Icon name="icon-search" className={css.icon} />
              </div>
            </div>
          </div>
        </form>
        <Button
          type="button"
          className={css.resetButton}
          onClick={handleReset}
          form="filter-form"
        >
          Reset Filters
        </Button>
      </div>

      <div className={css.productsWrapper}>
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <ErrorMessage />
        ) : (
          <MedicineList products={products} />
        )}
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </section>
  );
}
