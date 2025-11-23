import { Head, Link } from '@inertiajs/react';
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
} from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Cat } from './cat-interface';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'View Cat',
        href: '#',
    },
];

export default function CatShowPage({ cat }: { cat: Cat }) {
    
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

                            {/* Birthdate */}
                            <div className="flex items-center gap-3">
                                <CalendarDays className="h-5 w-5 text-gray-600" />
                                <div>
                                    <p className="text-sm text-gray-500">Birth Date</p>
                                    <p className="text-lg font-medium">
                                        {cat.birthdate ?? '—'}
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
                </div>
            </AuthLayout>
        </AppLayout>
    );
}
