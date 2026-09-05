'use client';

import { useQuery } from '@tanstack/react-query';
import css from './page.module.css';
import { getProducts } from '@/app/lib/api/client/products';
import { useState } from 'react';
import { MedicineList } from './components/MedicineList/MedicineList';
import { Pagination } from '@/app/components/Pagination/Pagination';
import { Title } from '../medicine-store/components/Title/Title';
import { Input } from '@/app/(auth)/components/Input';
import { Button } from '@/app/components/Button/Button';
import Select from "react-select";
import { selectStyles } from '@/app/lib/services/reactSelectStyles';
import { Icon } from '@/app/components/Icon/Icon';

type SelectOption = {
  value: string;
  label: string;
};

export default function MedicinePage() {
     const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

    const handleClear = () => {
    setQuery("");
  };

  console.log(search);

  const { data: products } = useQuery({
    queryKey: ['products', search, page],
    queryFn: () => getProducts({ search, page }),
  });

  if (!products) return;

  const totalPages = products?.length;

  const categories = [...new Set(products.map((product) => product.category))];

  console.log(categories);

  console.log(products);
  return (
    <section className={css.medicinePage}>
      <Title>Medicine</Title>
      <div className={css.inputs}>
        {/* <Input label="category" placeholder='Product category'/> */}
        <Select<SelectOption>
  options={categories.map(category => ({
    value: category,
    label: category,
  }))}
  placeholder='Product category'
  className={css.select}
  styles={selectStyles}
/>
     <div className={css.inputWrap}>
        <Input label="query" />
            <div className={css.buttons}>
              {query && (
                <button
                  type="button"
                  className={css.clearButton}
                  onClick={handleClear}
                >
                  <Icon name="icon-x" className={css.icon} />
                </button>
              )}
              <button type="submit" className={css.clearButton}>
                <Icon name="icon-search" className={css.icon} />
              </button>
            </div>
            </div>
       
              
      </div>
      <Button>Filter</Button>

      <MedicineList products={products} />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </section>
  );
}
