import { Head, Form, useForm } from '@inertiajs/react';
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
    VenusAndMars,
    Trash2,
} from 'lucide-react';

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Spinner } from '@/components/ui/spinner';
import { Cat } from './cat-interface';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit Cat',
        href: '#',
    },
];

export default function CatEditPage({ cat }: { cat: Cat }) {

    const { delete: destroy, } = useForm();
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <AuthLayout
                title={`Edit Cat: ${cat.name}`}
                description="Update the details below"
            >
                <Head title={`Edit ${cat.name}`} />

                <Form
                    method="patch"
                    action={cats.update(cat.id)}
                    disableWhileProcessing
                    className="flex flex-col gap-6"
                >
                    {({ processing, errors }) => (
                        <>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                                {/* ---------- BASIC INFO CARD ---------- */}
                                <Card className="shadow-md rounded-2xl">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <CatIcon className="h-6 w-6" />
                                            Basic Information
                                        </CardTitle>
                                    </CardHeader>

                                    <CardContent className="space-y-6">

                                        {/* Name */}
                                        <div className="grid gap-2">
                                            <Label htmlFor="name">Name</Label>
                                            <div className="flex items-center gap-3">
                                                <User className="h-5 w-5 text-gray-600" />
                                                <Input
                                                    id="name"
                                                    name="name"
                                                    defaultValue={cat.name}
                                                />
                                            </div>
                                            <InputError message={errors.name} />
                                        </div>

                                        {/* Gender */}
                                        <div className="grid gap-2">
                                            <Label>Gender</Label>
                                            <div className="mt-1 flex gap-4">
                                                <RadioGroup
                                                    name="gender"
                                                    defaultValue={cat.gender}
                                                    className="flex flex-row gap-4"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="male" id="gender-male" />
                                                        <Label htmlFor="gender-male">Male</Label>
                                                    </div>

                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="female" id="gender-female" />
                                                        <Label htmlFor="gender-female">Female</Label>
                                                    </div>

                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="unknown" id="gender-unknown" />
                                                        <Label htmlFor="gender-unknown">Unknown</Label>
                                                    </div>
                                                </RadioGroup>
                                            </div>
                                            <InputError message={errors.gender} />
                                        </div>

                                    </CardContent>
                                </Card>

                                {/* ---------- DATES CARD ---------- */}
                                <Card className="shadow-md rounded-2xl">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Calendar className="h-6 w-6" />
                                            Important Dates
                                        </CardTitle>
                                    </CardHeader>

                                    <CardContent className="space-y-6">

                                        {/* Birth_date */}
                                        <div className="grid gap-2">
                                            <Label htmlFor="birth_date">Birth Date</Label>
                                            <div className="flex items-center gap-3">
                                                <CalendarDays className="h-5 w-5 text-gray-600" />
                                                <Input
                                                    id="birth_date"
                                                    name="birth_date"
                                                    type="date"
                                                    defaultValue={cat.birth_date ? cat.birth_date : ''}
                                                />
                                            </div>
                                            <InputError message={errors.birth_date} />
                                        </div>

                                        {/* Arrival Date */}
                                        <div className="grid gap-2">
                                            <Label htmlFor="arrival_date">Arrival Date</Label>
                                            <div className="flex items-center gap-3">
                                                <CalendarDays className="h-5 w-5 text-gray-600" />
                                                <Input
                                                    id="arrival_date"
                                                    name="arrival_date"
                                                    type="date"
                                                    defaultValue={cat.arrival_date ? cat.arrival_date : ''}
                                                />
                                            </div>
                                            <InputError message={errors.arrival_date} />
                                        </div>

                                    </CardContent>
                                </Card>

                                {/* ---------- NEUTERED CARD ---------- */}
                                <Card className="shadow-md rounded-2xl">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <VenusAndMars className="h-6 w-6" />
                                            Neutered Status
                                        </CardTitle>
                                    </CardHeader>

                                    <CardContent>
                                        <div className="grid gap-2">
                                            <Label>Neutered</Label>
                                            <RadioGroup
                                                name="neutered"
                                                defaultValue={cat.neutered}
                                                className="flex flex-row gap-4"
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="yes" id="neutered-yes" />
                                                    <Label htmlFor="neutered-yes">Yes</Label>
                                                </div>

                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="no" id="neutered-no" />
                                                    <Label htmlFor="neutered-no">No</Label>
                                                </div>

                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="unknown" id="neutered-unknown" />
                                                    <Label htmlFor="neutered-unknown">Unknown</Label>
                                                </div>
                                            </RadioGroup>

                                            <InputError message={errors.neutered} />
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* ---------- DESCRIPTION CARD ---------- */}
                                <Card className="shadow-md rounded-2xl lg:col-span-2">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Info className="h-6 w-6" />
                                            Description
                                        </CardTitle>
                                    </CardHeader>

                                    <CardContent>
                                        <textarea
                                            id="description"
                                            name="description"
                                            defaultValue={cat.description ? cat.description : ''}
                                            className="border rounded-xl px-3 py-2 h-32 w-full"
                                        />
                                        <InputError message={errors.description} />
                                    </CardContent>
                                </Card>
                            </div>
                            
                            {/* ---------- SUBMIT BUTTON ---------- */}
                            <Button type="submit" className="w-full mt-4">
                                {processing && <Spinner />}
                                Update Cat
                            </Button>
                            
                            
                            {/* --- Delete Button + Confirmation Dialog --- */}
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button
                                        variant="destructive"
                                        className="flex items-center gap-2"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                        Delete
                                    </Button>
                                </DialogTrigger>

                                <DialogContent className="rounded-xl">
                                    <DialogHeader>
                                        <DialogTitle>Delete Cat</DialogTitle>
                                        <DialogDescription>
                                            Are you sure you want to delete <strong>{cat.name}</strong>?
                                            <br />This action cannot be undone.
                                        </DialogDescription>
                                    </DialogHeader>

                                    <DialogFooter className="flex justify-end gap-3 mt-4">
                                        <DialogTrigger asChild>
                                            <Button variant="outline">Cancel</Button>
                                        </DialogTrigger>

                                        <Button
                                            variant="destructive"
                                            onClick={() => destroy(cats.destroy(cat.id).url)}
                                            disabled={processing}
                                        >
                                            {processing ? "Deleting..." : "Confirm Delete"}
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>

                        </>
                    )}
                </Form>
            </AuthLayout>
        </AppLayout>
    );
}
