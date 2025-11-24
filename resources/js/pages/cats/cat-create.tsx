import { Head, Form } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import cats from '@/routes/cats';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Cat',
        href: cats.create().url,
    },
];


export default function CatCreationForm() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <AuthLayout
                title="Cat Creation Form"
                description="Enter the details below to register a new cat"
            >
                <Head title="Cat Creation" />

                <Form
                    action={cats.store()}
                    disableWhileProcessing
                    className="flex flex-col gap-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-6">
                                {/* Name */}
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Name"
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                {/* Gender */}
                                <div className="grid gap-2">
                                    <Label htmlFor="gender">Gender</Label>

                                    <RadioGroup
                                        name="gender"
                                        defaultValue="unknown"
                                        className="mt-1 flex flex-row gap-4"
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

                                    <InputError message={errors.gender} />
                                </div>



                                {/* Birth_date */}
                                <div className="grid gap-2">
                                    <Label htmlFor="birth_date">Birth Date</Label>
                                    <Input
                                        id="birth_date"
                                        name="birth_date"
                                        type="date"
                                    />
                                    <InputError message={errors.birth_date} />
                                </div>

                                {/* Arrival Date */}
                                <div className="grid gap-2">
                                    <Label htmlFor="arrival_date">Arrival Date</Label>
                                    <Input
                                        id="arrival_date"
                                        name="arrival_date"
                                        type="date"
                                    />
                                    <InputError message={errors.arrival_date} />
                                </div>

                                {/* Neutered */}
                                <div className="grid gap-2">
                                    <Label htmlFor="neutered">Neutered</Label>

                                    <RadioGroup
                                        name="neutered"
                                        defaultValue="unknown"
                                        className="mt-1 flex flex-row gap-4"
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

                                {/* Description */}
                                <div className="grid gap-2">
                                    <Label htmlFor="description">Description</Label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        className="border rounded-xl px-3 py-2 h-28"
                                        placeholder="Additional details..."
                                    />
                                    <InputError message={errors.description} />
                                </div>

                                <Button type="submit" className="mt-2 w-full">
                                    {processing && <Spinner />}
                                    Submit
                                </Button>
                            </div>
                        </>
                    )}
                </Form>
            </AuthLayout></AppLayout>
    );
}
