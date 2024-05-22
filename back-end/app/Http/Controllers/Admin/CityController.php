<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\City\CityRequest;
use App\Models\City;
use Illuminate\Http\Request;

class CityController extends Controller
{

    public function getCities() {
        $cities = City::orderby('id', "DESC")->get();

        if($cities) {
            return response()->json([
                "status" => true,
                "cities" => $cities,
            ]);
        }else {
            return response()->json([
                "status" => false,
                "cities" => $cities,
            ]);
        }

    }

    public function createCity(Request $request) {

        $cityExiste = City::where("name", $request->name)->first();
        if($cityExiste) {
            return response()->json([
                "status" => false,
                "message" => "Ville existe déjà",
            ]);
        }

        $city = new City();
        $city->name = $request->name;
        $city->desc = $request->desc;
        
        if($city->save()) {
            return response()->json([
                "status" => true,
                "message" => "Ville ajoutée avec succes",
            ]);
        }else {
            return response()->json([
                "status" => false,
                "message" => "Impossible d'ajoutée cette ville",
            ]);
        }

    }

    public function getCity($id) {

        $city = City::find($id);
        if($city) {
            return response()->json([
                "status" => true,
                "city" => $city ,
            ]);
        }else {
            return response()->json([
                "status" => false,
                "message" => "Aucune donnée n'est trouvée",
            ]);
        }

    }


    public function updateCity(Request $request, $id) {

        $city = City::find($id);
        if($city) {
            $city->name = $request->name;
            $city->desc = $request->desc; 
            $city->save(); 
            return response()->json([
                "status" => true,
                "message" => "Ville modifiée avec succes",
            ]);
        }else {
            return response()->json([
                "status" => false,
                "message" => "Aucune donnée n'est trouvée",
            ]);
        }

    }

    public function deleteCity( $id) {

        $city = City::find($id);
        if($city) {
            $city->delete();
            return response()->json([
                "status" => true,
                "message" => "Ville supprimée avec succes",
            ]);
        }else {
            return response()->json([
                "status" => false,
                "message" => "Aucune donnée n'est trouvée",
            ]);
        }

    }
}
