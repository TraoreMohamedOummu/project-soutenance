<?php

use App\Http\Controllers\Admin\AchatController;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\CityController;
use App\Http\Controllers\Admin\AgenceController;
use App\Http\Controllers\Admin\AgentController;
use App\Http\Controllers\Admin\PropertyController;
use App\Http\Controllers\Admin\SilderController;
use App\Http\Controllers\Admin\TypePropertyController;
use App\Http\Controllers\layout\ClientController;
use App\Http\Controllers\layout\MessageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::prefix('admin')->controller(AuthController::class)->group(function () {

    Route::get('/users', 'getUsers');
    Route::post('/add-user', 'addUser');
    Route::post('/get-user-email-password', 'getUserByEmailAndPassword');
    Route::post('/update-user-role-image/{id}', 'updateUserById');
    Route::post('/update-user/{id}', 'updateUser');
    Route::get('/get-user-id/{id}', 'getUserById');
    Route::delete('/delete-user/{id}', 'deleteUser');
    Route::post('/reset-password/{id}', 'resetPassword');

    Route::controller(CityController::class)->group(function (){

        Route::get('/cities', 'getCities');
        Route::get('/cities/{id}', 'getCity');
        Route::post('create-city', 'createCity');
        Route::put('update-city/{id}', 'updateCity');
        Route::delete('delete-city/{id}', 'deleteCity');


    });

    Route::controller(AgenceController::class)->group(function (){

        Route::get('/agences', 'getAgences');
        Route::get('/agences/{id}', 'getAgence');
        Route::post('create-agence', 'createAgence');
        Route::put('update-agence/{id}', 'updateAgence');
        Route::delete('delete-agence/{id}', 'deleteAgence');

    });

    Route::controller(SilderController::class)->group(function (){

        Route::get('/sliders', 'getSliders');
        Route::get('/sliders/{id}', 'getSlider');
        Route::post('create-slider', 'createSlider');
        Route::put('update-slider/{id}', 'updateSlider');
        Route::delete('delete-slider/{id}', 'deleteSlider');

    });

    Route::controller(TypePropertyController::class)->group(function (){

        Route::get('/type-properties', 'getTypeProperties');
        Route::get('/type-properties/{id}', 'getTypeProperty');
        Route::post('create-type-property', 'createTypeProperty');
        Route::put('update-type-property/{id}', 'updateTypeProperty');
        Route::delete('delete-type-property/{id}', 'deleteTypeProperty');

    });

    Route::controller(PropertyController::class)->group(function (){

        Route::get('/properties', 'getProperties');
        Route::get('/properties/{id}', 'getProperty');
        Route::post('create-property', 'createProperty');
        Route::post('add-image-property/{id}', 'addImageProperty');
        Route::put('update-property/{id}', 'updateProperty');
        Route::put('update-terrain-property/{id}', 'updatePropertyTerrain');
        Route::put('update-feactures-property/{id}', 'updateFeactureProperty');
        Route::delete('delete-property/{id}', 'deleteProperty');
        Route::get('/properties-trie-by-price', 'triePropertiesByPrice');
        Route::get('/property-slug/{slug}', 'getPropertyBySlug');


    });

    Route::controller(MessageController::class)->group(function (){

        Route::post('/create-message', 'createMessage');


    });

    Route::controller(AchatController::class)->group(function (){

        Route::get('/achats', 'getAchats');
        Route::get('/achats/{id}', 'getAchatById');
        Route::post('/faire-achat', 'createAchat');

    });

    Route::prefix('')->controller(AgentController::class)->group(function () {

        Route::post('/login', 'loginAgent');
        Route::post('/register', 'createAgent');
        Route::post('/update-agent/{id}', 'updateAgent');
        Route::get('/agent/{id}', 'getAgent');
        Route::post('/update-password/{id}', 'updatePasswordAgent');
        Route::get('/agents', 'getAgents');
    
    });
    

});

Route::prefix('')->controller(ClientController::class)->group(function () {

    Route::post('/login', 'loginClient');
    Route::post('/register', 'createClient');
    Route::post('/update-client/{id}', 'updateClient');
    Route::get('/client/{id}', 'getClient');
    Route::post('/update-password/{id}', 'updatePasswordClient');
    Route::get('/clients', 'getClients');
    Route::post('/forgot-password', 'sendResetLinkEmail');

});

