import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import {areaColumns} from './area-columns';
import { DataTable } from './area-data-table';
import { Area } from '../area-interface';
import areas from '@/routes/areas';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Area List',
        href: areas.index().url,
    },
];


export default function AreaIndexTable({ areas }: { areas: Area[] }) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <DataTable columns={areaColumns} data={areas} />
        </AppLayout>
    );
}
