import { Head, Link, router } from '@inertiajs/react';
import AuthLayout from '@/layouts/auth-layout';
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
    MapPlus,
} from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Cat } from './cat-interface';
import { Area } from '../areas/area-interface';
import animalLocations from '@/routes/animal-locations';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'View Cat',
        href: '#',
    },
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
            <AuthLayout
                title={`Cat: ${cat.name}`}
                description="Details about this cat"
            >

                <div className="flex justify-end gap-3 mb-4">

                    {/* --- Edit Button --- */}
                    <Button asChild className="flex items-center gap-2">
                        <Link href={cats.edit(cat.id).url}>
                            <Pencil className="h-4 w-4" />
                            Edit
                        </Link>
                    </Button>
                </div>


                <Head title={`Cat: ${cat.name}`} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* ——— Basic Info ——— */}
                    <Card className="shadow-md rounded-2xl">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CatIcon className="h-6 w-6" />
                                Basic Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">

                            {/* Name */}
                            <div className="flex items-center gap-3">
                                <User className="h-5 w-5 text-gray-600" />
                                <div>
                                    <p className="text-sm text-gray-500">Name</p>
                                    <p className="text-lg font-medium">{cat.name}</p>
                                </div>
                            </div>

                            {/* Gender */}
                            <div className="flex items-center gap-3">
                                <VenusAndMars className="h-5 w-5 text-gray-600" />
                                <div>
                                    <p className="text-sm text-gray-500">Gender</p>
                                    <p className="text-lg font-medium capitalize">
                                        {cat.gender}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* ——— Dates ——— */}
                    <Card className="shadow-md rounded-2xl">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="h-6 w-6" />
                                Important Dates
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">

                            {/* Birth_date */}
                            <div className="flex items-center gap-3">
                                <CalendarDays className="h-5 w-5 text-gray-600" />
                                <div>
                                    <p className="text-sm text-gray-500">Birth Date</p>
                                    <p className="text-lg font-medium">
                                        {cat.birth_date ?? '—'}
                                    </p>
                                </div>
                            </div>

                            {/* Arrival Date */}
                            <div className="flex items-center gap-3">
                                <CalendarDays className="h-5 w-5 text-gray-600" />
                                <div>
                                    <p className="text-sm text-gray-500">Arrival Date</p>
                                    <p className="text-lg font-medium">
                                        {cat.arrival_date ?? '—'}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* ——— Neutered Status ——— */}
                    <Card className="shadow-md rounded-2xl">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <SquareScissors className="h-6 w-6" />
                                Neutered Status
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-3">
                                {neuteredIcon}
                                <div>
                                    <p className="text-sm text-gray-500">Neutered</p>
                                    <p className="text-lg font-medium capitalize">
                                        {cat.neutered}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* ——— Description ——— */}
                    <Card className="shadow-md rounded-2xl lg:col-span-2">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Info className="h-6 w-6" />
                                Description
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                                {cat.description || 'No description provided.'}
                            </p>
                        </CardContent>
                    </Card>

                    {/* Locations */}
                    <Card className="shadow-md rounded-2xl lg:col-span-2">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Map className="h-6 w-6" />
                                Locations

                            </CardTitle>
                            <div className="flex justify-end">

                                <Button className="flex gap-2"
                                    onClick={() => router.get(animalLocations.create(cat.id).url)}>
                                    <MapPlus className="h-4 w-4" />
                                    Add Locations
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {locations && locations.length > 0 && (
                                <div>
                                    <p className="text-sm text-gray-500 mb-2">Locations:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {locations.map(area => (
                                            <span
                                                key={area.id}
                                                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                                            >
                                                {area.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </AuthLayout>
        </AppLayout>
    );
}
