<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCatRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        //TODO: Implement authorization logic if needed
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            //TODO: Check how enum works in validation rules
            //TODO: Add date validations
            'name' => 'required|string|max:30',
            'gender' => 'required|string',
            'birthdate' => 'required|date',
            'arrival_date' => 'nullable|date',
            'neutered' => 'required|string',
            'description' => 'nullable|string',
        ];
    }
}
