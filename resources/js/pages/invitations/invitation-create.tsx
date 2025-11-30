import { Head, Form } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import invitations from '@/routes/invitations';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Invite Member',
        href: invitations.create().url,
    },
];

export default function InvitationCreationForm() {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <AuthLayout
                title="Invitation Creation Form"
                description="Enter the email below to send invitation to a new user"
            >
                <Head title="Invite Member" />

                <Form
                    action={invitations.store()}
                    disableWhileProcessing
                    className="flex flex-col gap-6"
                >
                    {({ processing, errors }) => {

                        return (
                            <>
                                <div className="grid gap-6">
                                    {/* E-mail */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">E-mail</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="example@test.com"
                                        />
                                        <InputError message={errors.email} />
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
