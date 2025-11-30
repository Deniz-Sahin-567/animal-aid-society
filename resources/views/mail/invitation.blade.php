@component('mail::message')
# You have been invited to join {{ config('app.name') }}!

Hi animal friend,

We're excited to have you on board!

@isset($invitation->token)
@component('mail::button', ['url' => route('register', ['token' => $invitation->token])])
Create Your Account
@endcomponent

Your account will be fully activated once your click the link and fill in the form.
The link will expire in 24 hours and is single-use only.
@endisset

### What you can do next:
- Explore, edit and add new animal profiles 
- Explore your profile settings  

If you don't want an account, you can safely ignore this email.

Thanks,<br>
{{ config('app.name') }}
@endcomponent
