import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import cats from '@/routes/cats';
import {columns} from './cat-columns';
import { DataTable } from './cat-data-table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Cat List',
        href: cats.index().url,
    },
];


export default function CatIndexTable({ cats }: { cats: any[] }) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <DataTable columns={columns} data={cats} />
            {/* {cats.map((cat) => {
                return <div key={cat.id} className="p-4 mb-4 border rounded-lg">
                    <h2 className="text-xl font-bold mb-2">{cat.name}</h2>
                    <p className="text-gray-600">Gender: {cat.gender}</p>
                    <p className="text-gray-600">Age: {(new Date().getFullYear() - new Date(cat.birthdate).getFullYear())
                    }</p> 
                </div>
            })} */}
        </AppLayout>
    );
}
