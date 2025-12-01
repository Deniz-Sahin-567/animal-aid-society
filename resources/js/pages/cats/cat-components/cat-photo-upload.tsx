import { router } from '@inertiajs/react';

import { Cat } from '../cat-interface';
import { Dropzone, DropzoneContent, DropzoneEmptyState } from '@/components/ui/dropzone';
import photos from '@/routes/photos';

export default function CatPhotoUpload({ cat }: { cat: Cat }) {

    const uploadPhotos = (files: File[]) => {
        const formData = new FormData();
        files.forEach((file) => formData.append("photos[]", file));

        router.post(photos.store(cat.id).url, formData, {
            forceFormData: true,
        });
    };


    return (
        <Dropzone
            maxSize={1024 * 1024}
            minSize={1024}
            maxFiles={1}
            onDrop={(acceptedFiles) => uploadPhotos(acceptedFiles)}
            accept={{ images: [".png", ".jpg", ".jpeg"] }}
        >
            <DropzoneEmptyState />
            <DropzoneContent />
        </Dropzone>
    );
}
