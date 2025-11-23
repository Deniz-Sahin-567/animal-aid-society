import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import cats from '@/routes/cats';
import {columns} from './cat-columns';
import { DataTable } from './cat-data-table';
import { Cat } from '../cat-interface';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Cat List',
        href: cats.index().url,
    },
];


export default function CatIndexTable({ cats }: { cats: Cat[] }) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <DataTable columns={columns} data={cats} />
        </AppLayout>
    );
}
