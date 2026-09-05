'use client'

import { useQuery } from '@tanstack/react-query'
import css from './page.module.css'
import { getProducts } from '@/app/lib/api/client/products'
import { useState } from 'react'
import { MedicineList } from './components/MedicineList/MedicineList'

export default function MedicinePage() {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(3);

    console.log(search);

    const {data: products} = useQuery({
        queryKey: ['products', search, page],
        queryFn: () => getProducts({search, page}),
    })

    if(!products) return;

    console.log(products);
return <div className={css.title}>
    <MedicineList products={products}/>
    
</div>
}