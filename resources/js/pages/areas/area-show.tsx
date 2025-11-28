import { Head, Link, router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BreadcrumbItem } from '@/types';
import { Area } from './area-interface';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import { Info, Map, Scan, LandPlot, Grid2X2, List } from 'lucide-react';
import { Button } from "@/components/ui/button";
import areas from '@/routes/areas';
import { Pencil } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'View Area',
        href: '#',
    },
];

interface AreaShowProps {
    area: Area;
    subAreas?: Area[];
}

export default function AreaShow({ area, subAreas = [] }: AreaShowProps) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <AuthLayout
                title={`Area: ${area.name}`}
                description="Details about this area"
            >

                <div className="flex justify-end gap-3 mb-4">
                    <Button asChild className="flex items-center gap-2">
                        <Link href={areas.edit(area.id).url}>
                            <Pencil className="h-4 w-4" />
                            Edit
                        </Link>
                    </Button>
                    <Button asChild className="flex items-center gap-2">
                        <Link href={areas.index().url}>
                            <List className="h-4 w-4" />
                            Area List
                        </Link>
                    </Button>
                </div>

                <Head title={area.name} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Area Details */}
                    <Card className="shadow-md rounded-2xl">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Info className="h-6 w-6 text-white-600" />
                                Area Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Map className="h-5 w-5 text-gray-600" />
                                <div>
                                    <p className="text-sm text-gray-500">Name</p>
                                    <p className="text-lg font-medium">{area.name}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3"
                                onClick={() => { if (area.parent) router.get(`/areas/${area.parent?.id}`) }}>
                                <Scan className="h-5 w-5 text-gray-600" />
                                <div>
                                    <p className="text-sm text-gray-500">Sub-Area of</p>
                                    <p className="text-lg font-medium">{area.parent?.name ?? "-"}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Sub-Areas */}
                    {subAreas.length > 0 && (
                        <Card className="shadow-md rounded-2xl lg:col-span-2">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <LandPlot className="h-6 w-6 text-white-600" />
                                    Sub Areas
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-2">
                                {subAreas.map((subArea) => (
                                    <Card key={subArea.id} className="shadow rounded-xl"
                                        onClick={() => router.get(`/areas/${subArea.id}`)}>
                                        <CardContent className="flex items-center gap-2">
                                            <Grid2X2 className="w-4 h-4 text-gray-400" />
                                            <p className="text-gray-500 font-medium">{subArea.name}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </CardContent>
                        </Card>
                    )}

                </div>
            </AuthLayout>
        </AppLayout>
    );
}
