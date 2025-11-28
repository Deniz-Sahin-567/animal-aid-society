import { Head, Form } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import areas from '@/routes/areas';
import { Area } from './area-interface';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Area',
        href: areas.create().url,
    },
];

export default function AreaCreationForm({ allAreas }: { allAreas: Area[] }) {
    const [selectedAreas, setSelectedAreas] = useState<string[]>([]);

    const getChildren = (parentId: number) => {
        return allAreas.filter(area => area.parent?.id === parentId);
    };

    const handleChange = (level: number, value: string) => {
        const newSelected = [...selectedAreas];
        newSelected[level] = value;
        newSelected.splice(level + 1); // remove deeper selections if parent changes
        setSelectedAreas(newSelected);
    };

    const handleClear = (level: number) => {
        const newSelected = [...selectedAreas];
        newSelected.splice(level);
        setSelectedAreas(newSelected);
    };

    const getOptionsForLevel = (level: number) => {
        if (level === 0) {
            return allAreas.filter(area => !area.parent?.id); // top-level areas
        } else {
            const parentId = selectedAreas[level - 1];
            return parentId ? getChildren(Number(parentId)) : [];
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <AuthLayout
                title="Area Creation Form"
                description="Enter the details below to register a new area"
            >
                <Head title="Area Creation" />

                <Form
                    action={areas.store()}
                    disableWhileProcessing
                    className="flex flex-col gap-6"
                >
                    {({ processing, errors }) => {
                        // Send last selected area as area_id
                        const areaIdToSubmit = selectedAreas.length
                            ? selectedAreas[selectedAreas.length - 1]
                            : '';

                        return (
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

                                    {/* Hidden input to match update page */}
                                    <input type="hidden" name="area_id" value={areaIdToSubmit} />

                                    {/* Sub-Areas Cascade */}
                                    <div className="grid gap-2">
                                        {Array.from({ length: selectedAreas.length + 1 }).map((_, level) => {
                                            const options = getOptionsForLevel(level);
                                            if (!options.length) return null;

                                            return (
                                                <div key={level} className="flex items-center gap-2">
                                                    <div className="flex-1">
                                                        <Label htmlFor={`area-${level}`}>Sub-Area of</Label>
                                                        <Select
                                                            value={selectedAreas[level] || ""}
                                                            onValueChange={(value) => handleChange(level, value)}
                                                        >
                                                            <SelectTrigger id={`area-${level}`}>
                                                                <SelectValue placeholder="Select a sub-area" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {options.map(area => (
                                                                    <SelectItem key={area.id} value={String(area.id)}>
                                                                        {area.name}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>

                                                    {selectedAreas[level] && (
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => handleClear(level)}
                                                        >
                                                            Clear
                                                        </Button>
                                                    )}
                                                </div>
                                            );
                                        })}

                                        {errors?.subArea && (
                                            <p className="text-sm text-red-500">{errors.subArea}</p>
                                        )}
                                    </div>

                                    {/* Submit */}
                                    <Button type="submit" className="mt-2 w-full">
                                        {processing && <Spinner />}
                                        Submit
                                    </Button>
                                </div>
                            </>
                        );
                    }}
                </Form>

            </AuthLayout>
        </AppLayout>
    );
}
