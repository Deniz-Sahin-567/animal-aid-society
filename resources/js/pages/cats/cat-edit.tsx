import { Head, Form, useForm, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import cats from '@/routes/cats';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';

import {
    User,
    Calendar,
    Cat as CatIcon,
    Info,
    CalendarDays,
    Trash2,
    Map,
    SquareScissors,
    MapPlus,
} from 'lucide-react';

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Spinner } from '@/components/ui/spinner';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

import { Cat } from './cat-interface';
import { Area } from '../areas/area-interface';
import animal_locations from '@/routes/animal-locations';
import CatPhotoUpload from './cat-components/cat-photo-upload';
import photos from '@/routes/photos';
import animalLocations from '@/routes/animal-locations';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Edit Cat', href: '#' },
];

export default function CatEditPage({ cat, locations }: { cat: Cat, locations: Area[] }) {
    const { delete: destroy } = useForm();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${cat.name}`} />

            <Form
                method="patch"
                action={cats.update(cat.id)}
                disableWhileProcessing
                className="flex flex-col gap-8 max-w-5xl mx-auto px-4"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="flex flex-col gap-8">

                            {/* Top Section: Photo + Basic Info */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start mt-2">

                                {/* Profile Photo (2 rows) */}
                                <div className="lg:row-span-2 gap-3 flex flex-col">
                                    <Card className="rounded-3xl shadow-sm border border-outline/20 p-4 flex flex-col items-center justify-center h-full">
                                        <CardTitle className="mb-3 text-xl font-medium flex items-center gap-2">
                                            <CatIcon className="h-6 w-6" /> Photo
                                        </CardTitle>

                                        {cat.photos.length === 0 ? (
                                            <CatPhotoUpload cat={cat} />
                                        ) : (
                                            <div className="relative w-full max-w-xs mx-auto">
                                                <img
                                                    src={cat.photos[0].path}
                                                    alt="Cat"
                                                    className="rounded-2xl w-full object-cover h-72 shadow-sm"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => router.delete(photos.destroy([cat.id, cat.photos[0].id]).url)}
                                                    className="absolute top-2 right-2 bg-error text-white p-1 rounded-full shadow-md"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        )}
                                    </Card>

                                    {/* Locations */}
                                    <Card className="rounded-3xl shadow-sm border border-outline/20">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-xl font-semibold">
                                                <Map /> Locations
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex justify-end mb-4">
                                                <Button className="flex gap-2" onClick={() => router.get(animalLocations.create(cat.id).url)}>
                                                    <MapPlus className="h-4 w-4" /> Add Locations
                                                </Button>
                                            </div>
                                            {locations?.length > 0 && (
                                                <div className="flex flex-wrap gap-3">
                                                    {locations.map(area => (
                                                        <span key={area.id} className="flex items-center gap-2 bg-primary/15 text-primary px-3 py-1 rounded-full text-sm">
                                                            {area.name}
                                                            <button
                                                                type="button"
                                                                onClick={() => router.delete(animal_locations.destroy([cat.id, area.id]).url)}
                                                                className="hover:bg-primary/25 text-primary rounded-full w-5 h-5 flex items-center justify-center"
                                                            >
                                                                ×
                                                            </button>
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Right Column */}
                                <div className="lg:col-span-2 flex flex-col gap-3">

                                    {/* Basic Info */}
                                    <Card className="rounded-3xl shadow-sm border border-outline/20">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-xl font-semibold">
                                                <CatIcon /> Basic Information
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="flex flex-col gap-2">
                                                <Label htmlFor="name">Name</Label>
                                                <div className="relative">
                                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
                                                    <Input id="name" name="name" defaultValue={cat.name} className="pl-10" />
                                                </div>
                                                <InputError message={errors.name} />
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <Label>Gender</Label>
                                                <RadioGroup name="gender" defaultValue={cat.gender} className="flex gap-6">
                                                    {['male', 'female', 'unknown'].map(g => (
                                                        <div key={g} className="flex items-center space-x-2">
                                                            <RadioGroupItem value={g} id={`gender-${g}`} />
                                                            <Label htmlFor={`gender-${g}`}>{g.charAt(0).toUpperCase() + g.slice(1)}</Label>
                                                        </div>
                                                    ))}
                                                </RadioGroup>
                                                <InputError message={errors.gender} />
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Dates */}
                                    <Card className="rounded-3xl shadow-sm border border-outline/20">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-xl font-semibold">
                                                <Calendar /> Important Dates
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                            <div className="flex flex-col gap-2">
                                                <Label htmlFor="birth_date">Birth Date</Label>
                                                <div className="relative">
                                                    <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
                                                    <Input id="birth_date" name="birth_date" type="date" defaultValue={cat.birth_date ?? ''} className="pl-10" />
                                                </div>
                                                <InputError message={errors.birth_date} />
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <Label htmlFor="arrival_date">Arrival Date</Label>
                                                <div className="relative">
                                                    <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
                                                    <Input id="arrival_date" name="arrival_date" type="date" defaultValue={cat.arrival_date ?? ''} className="pl-10" />
                                                </div>
                                                <InputError message={errors.arrival_date} />
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
                                            <RadioGroup name="neutered" defaultValue={cat.neutered} className="flex gap-6">
                                                {['yes', 'no', 'unknown'].map(n => (
                                                    <div key={n} className="flex items-center space-x-2">
                                                        <RadioGroupItem value={n} id={`neutered-${n}`} />
                                                        <Label htmlFor={`neutered-${n}`}>{n.charAt(0).toUpperCase() + n.slice(1)}</Label>
                                                    </div>
                                                ))}
                                            </RadioGroup>
                                            <InputError message={errors.neutered} />
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
                                            <textarea
                                                id="description"
                                                name="description"
                                                defaultValue={cat.description ?? ''}
                                                className="border rounded-2xl px-4 py-3 h-36 w-full text-sm bg-surface"
                                            />
                                            <InputError message={errors.description} />
                                        </CardContent>
                                    </Card>


                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-4 lg:col-span-2">

                                    {/* Submit — takes 2/3 on large screens, full width on mobile */}
                                    <Button
                                        type="submit"
                                        className="w-full py-3 rounded-2xl text-base lg:col-span-2"
                                    >
                                        {processing && <Spinner />}
                                        Update Cat
                                    </Button>

                                    {/* Delete — takes 1/3 on large screens, full width on mobile */}
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="destructive"
                                                className="flex items-center gap-2 w-full justify-center py-3 rounded-2xl text-base"
                                            >
                                                <Trash2 className="h-5 w-5" /> Delete
                                            </Button>
                                        </DialogTrigger>

                                        <DialogContent className="rounded-3xl">
                                            <DialogHeader>
                                                <DialogTitle>Delete Cat</DialogTitle>
                                                <DialogDescription>
                                                    Are you sure you want to delete <strong>{cat.name}</strong>? This cannot be undone.
                                                </DialogDescription>
                                            </DialogHeader>

                                            <DialogFooter className="mt-6 flex justify-end gap-3">
                                                <DialogTrigger asChild>
                                                    <Button variant="outline" className="rounded-xl px-4 py-2">Cancel</Button>
                                                </DialogTrigger>
                                                <Button
                                                    variant="destructive"
                                                    onClick={() => destroy(cats.destroy(cat.id).url)}
                                                    disabled={processing}
                                                    className="rounded-xl px-4 py-2"
                                                >
                                                    {processing ? 'Deleting...' : 'Confirm Delete'}
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>

                                </div>


                            </div>
                        </div>
                    </>
                )}
            </Form>
        </AppLayout>
    );
}
