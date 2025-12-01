import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import cats from '@/routes/cats';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import {
    User,
    Calendar,
    Cat as CatIcon,
    Info,
    VenusAndMars,
    SquareScissors,
    CalendarDays,
    Check,
    X,
    HelpCircle,
    Pencil,
    Map,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Cat } from './cat-interface';
import { Area } from '../areas/area-interface';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'View Cat', href: '#' },
];

export default function CatShowPage({ cat, locations }: { cat: Cat, locations: Area[] }) {

    const neuteredIcon =
        cat.neutered === 'yes'
            ? <Check className="h-5 w-5 text-green-600" />
            : cat.neutered === 'no'
                ? <X className="h-5 w-5 text-red-600" />
                : <HelpCircle className="h-5 w-5 text-gray-500" />;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Cat: ${cat.name}`} />

            <div>
                    <div className="flex justify-between items-center mb-2 mt-3 max-w-5xl mx-auto px-4">
                    <div className="text-3xl font-semibold ml-4">
                        {cat.name}
                    </div>

                    <Button asChild className="flex items-center gap-2 rounded-2xl px-4 py-2 text-base mr-3">
                        <Link href={cats.edit(cat.id).url}>
                            <Pencil className="h-4 w-4" /> Edit
                        </Link>
                    </Button>
                </div>


                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-5xl mx-auto px-4 mb-4">

                    <div className='lg:col-span-1 gap-3 grid grid-cols-1 flex'>

                        {/* Photos */}
                        <Card className="rounded-3xl shadow-sm border border-outline/20 ">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-xl font-semibold">
                                    <CatIcon className="h-6 w-6" /> Photo
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {cat.photos.length === 0 ? (
                                    <p className="text-sm text-secondary">No photos uploaded.</p>
                                ) : (
                                    <img
                                        src={cat.photos[0].path}
                                        alt="Cat"
                                        className="rounded-2xl w-full object-cover h-72 shadow-sm"
                                    />
                                )}
                            </CardContent>
                        </Card>

                        {/* Locations */}
                        <Card className="rounded-3xl shadow-sm border border-outline/20">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-xl font-semibold">
                                    <Map /> Locations
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {locations?.length > 0 ? (
                                    <div className="flex flex-wrap gap-3">
                                        {locations.map(area => (
                                            <span
                                                key={area.id}
                                                className="flex items-center gap-2 bg-primary/15 text-primary px-3 py-1 rounded-full text-sm"
                                            >
                                                {area.name}
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-secondary">No locations recorded.</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-2 flex flex-col gap-3">

                        {/* Basic Information */}
                        <Card className="rounded-3xl shadow-sm border border-outline/20">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-xl font-semibold">
                                    <CatIcon /> Basic Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2 text-secondary">
                                        <User className="h-5 w-5" />
                                        <span className="text-sm">Name</span>
                                    </div>
                                    <p className="text-lg font-medium">{cat.name}</p>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2 text-secondary">
                                        <VenusAndMars className="h-5 w-5" />
                                        <span className="text-sm">Gender</span>
                                    </div>
                                    <p className="text-lg font-medium capitalize">{cat.gender}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Important Dates */}
                        <Card className="rounded-3xl shadow-sm border border-outline/20">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-xl font-semibold">
                                    <Calendar /> Important Dates
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2 text-secondary">
                                        <CalendarDays className="h-5 w-5" />
                                        <span className="text-sm">Birth Date</span>
                                    </div>
                                    <p className="text-lg font-medium">{cat.birth_date || '—'}</p>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2 text-secondary">
                                        <CalendarDays className="h-5 w-5" />
                                        <span className="text-sm">Arrival Date</span>
                                    </div>
                                    <p className="text-lg font-medium">{cat.arrival_date || '—'}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Neutered */}
                        <Card className="rounded-3xl shadow-sm border border-outline/20">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-xl font-semibold">
                                    <SquareScissors /> Neutered Status
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-3">
                                    {neuteredIcon}
                                    <div>
                                        <p className="text-sm text-secondary ">Neutered</p>
                                        <p className="text-lg font-medium capitalize">{cat.neutered}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Description */}
                        <Card className="rounded-3xl shadow-sm border border-outline/20">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-xl font-semibold">
                                    <Info /> Description
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                    {cat.description || 'No description provided.'}
                                </p>
                            </CardContent>
                        </Card>


                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
