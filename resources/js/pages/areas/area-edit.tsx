import { Head, Form, useForm } from '@inertiajs/react';
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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Trash2 } from 'lucide-react';

const breadcrumbs = (areaId: number): BreadcrumbItem[] => [
    {
        title: 'Edit Area',
        href: areas.edit(areaId).url,
    },
];

interface AreaEditFormProps {
    area: Area;
    allAreas: Area[];
}

export default function AreaEditForm({ area, allAreas }: AreaEditFormProps) {
    const { delete: destroy } = useForm(); // Added for delete button

    const buildInitialSelection = (currentArea: Area | undefined): string[] => {
        const hierarchy: string[] = [];
        let temp: Area | undefined = currentArea;
        while (temp?.parent) {
            hierarchy.unshift(String(temp.parent.id));
            temp = allAreas.find(a => a.id === temp?.parent?.id);
        }
        return hierarchy;
    };

    const [selectedAreas, setSelectedAreas] = useState<string[]>(buildInitialSelection(allAreas.find(a => a.id == area.id)));
    const [name, setName] = useState(area.name);

    const getChildren = (parentId: number) => allAreas.filter(a => a.parent?.id === parentId);

    const handleChange = (level: number, value: string) => {
        const newSelected = [...selectedAreas];
        newSelected[level] = value;
        newSelected.splice(level + 1);
        setSelectedAreas(newSelected);
    };

    const handleClear = (level: number) => {
        const newSelected = [...selectedAreas];
        newSelected.splice(level);
        setSelectedAreas(newSelected);
    };

    const getOptionsForLevel = (level: number) => {
        if (level === 0) return allAreas.filter(a => !a.parent?.id);
        const parentId = selectedAreas[level - 1];
        return parentId ? getChildren(Number(parentId)).filter(a => a.id != area.id) : [];
    };

    const areaIdToSubmit = selectedAreas.length
        ? selectedAreas[selectedAreas.length - 1]
        : '';

    return (
        <AppLayout breadcrumbs={breadcrumbs(area.id)}>
            <AuthLayout title="Edit Area" description="Modify the details of this area">
                <Head title="Edit Area" />

                <Form
                    method="patch"
                    action={areas.update(area.id)}
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
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                {/* Hidden input to ensure the selected area ID is sent */}
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
                                                        onValueChange={(value) => handleChange(level, value)}
                                                        value={selectedAreas[level] || "Default"}
                                                    >
                                                        <SelectTrigger id={`area-${level}`}>
                                                            <SelectValue placeholder="Select a sub-area" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {options.map(a => (
                                                                <SelectItem key={a.id} value={String(a.id)}>
                                                                    {a.name}
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
                                    Update
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
                                            <DialogTitle>Delete Area</DialogTitle>
                                            <DialogDescription>
                                                Are you sure you want to delete <strong>{area.name}</strong>?
                                                <br />This action cannot be undone.
                                            </DialogDescription>
                                        </DialogHeader>

                                        <DialogFooter className="flex justify-end gap-3 mt-4">
                                            <DialogTrigger asChild>
                                                <Button variant="outline">Cancel</Button>
                                            </DialogTrigger>

                                            <Button
                                                variant="destructive"
                                                onClick={() => destroy(areas.destroy(area.id).url)}
                                                disabled={processing}
                                            >
                                                {processing ? "Deleting..." : "Confirm Delete"}
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>

                            </div>
                        </>
                    )}
                </Form>
            </AuthLayout>
        </AppLayout>
    );
}
