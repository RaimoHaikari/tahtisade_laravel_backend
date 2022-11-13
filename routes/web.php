<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;

use App\Models\Bar;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
/*
Route::get('/', function () {

    $critics = Bar::find('anttiSelkokari')
        ->reviews;

    dd($critics);

});
*/

/*
Route::get('/about', function () {
    return view('scholl');
});
*/


Route::get('{reactRoutes}', function () {
    return view('scholl'); // your start view
})->where('reactRoutes', '^((?!api).)*$'); // except 'api' word


