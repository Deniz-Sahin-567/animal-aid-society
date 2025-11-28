import { Head, Form } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

//import animalLocations from '@/routes/animal-locations'; // You will create this helper
import { Area } from '@/pages/areas/area-interface';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import { useState } from 'react';
import animalLocations from '@/routes/animal-locations';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Add Animal Location',
        href: '#',
    },
];

export default function AnimalLocationCreate({
    allAreas,
    cat,
}: {
    allAreas: Area[];
    cat: { id: number; name: string };
}) {
    const [selectedAreas, setSelectedAreas] = useState<string[]>([]);

    const getChildren = (parentId: number) => {
        return allAreas.filter(a => a.parent?.id === parentId);
    };

    const handleChange = (level: number, value: string) => {
        const updated = [...selectedAreas];
        updated[level] = value;
        updated.splice(level + 1); // reset deeper choices
        setSelectedAreas(updated);
    };

    const getOptionsForLevel = (level: number) => {
        if (level === 0) {
            return allAreas.filter(a => !a.parent); // root areas
        }
        const parentId = selectedAreas[level - 1];
        return parentId ? getChildren(Number(parentId)) : [];
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <AuthLayout
                title={`Add Location for ${cat.name}`}
                description="Assign a location to this cat using cascading area selection"
            >
                <Head title={`Add Location for ${cat.name}`} />

                <Form
                    action={animalLocations.store(cat.id)}
                    disableWhileProcessing
                    className="flex flex-col gap-6"
                >
                    {({ errors, processing }) => {
                        const finalAreaId = selectedAreas.length
                            ? selectedAreas[selectedAreas.length - 1]
                            : '';

                        return (
                            <div className="grid gap-6">
                                {/* Hidden to submit final selected area */}
                                <input type="hidden" name="location" value={finalAreaId} />

                                {/* Cascading Area selection */}
                                <div className="grid gap-2">
                                    {Array.from({ length: selectedAreas.length + 1 }).map((_, level) => {
                                        const options = getOptionsForLevel(level);
                                        if (!options.length) return null;

                                        return (
                                            <div key={level} className="flex items-center gap-2">
                                                <div className="flex-1">
                                                    <Label htmlFor={`area-${level}`}>
                                                        {level === 0 ? 'Area' : 'Sub-area'}
                                                    </Label>

                                                    <Select
                                                        value={selectedAreas[level] || ""}
                                                        onValueChange={(v) => handleChange(level, v)}
                                                    >
                                                        <SelectTrigger id={`area-${level}`}>
                                                            <SelectValue placeholder="Select an area" />
                                                        </SelectTrigger>

                                                        <SelectContent>
                                                            {options.map(area => (
                                                                <SelectItem
                                                                    key={area.id}
                                                                    value={String(area.id)}
                                                                >
                                                                    {area.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                        );
                                    })}

                                    <InputError message={errors.location} />
                                </div>

                                {/* Submit */}
                                <Button type="submit" className="mt-2 w-full">
                                    {processing && <Spinner />}
                                    Add Location
                                </Button>
                            </div>
                        );
                    }}
                </Form>
            </AuthLayout>
        </AppLayout>
    );
}
