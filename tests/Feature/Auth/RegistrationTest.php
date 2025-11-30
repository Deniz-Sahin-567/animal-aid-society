<?php

test('registration screen cannot be rendered', function () {
    $response = $this->get(route('register'));

    $response->assertStatus(404);
});

test('new users cannot register', function () {
    $response = $this->post(route('register.store'), [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $this->assertGuest();
    // $response->assertRedirect(route('dashboard', absolute: false));
});