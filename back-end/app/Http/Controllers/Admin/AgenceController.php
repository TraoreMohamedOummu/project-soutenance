<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Agence;
use Illuminate\Http\Request;

class AgenceController extends Controller
{
    public function getAgences() {
        $agences = Agence::with(['city'])->orderby('id', "DESC")->get(["id", "name", "desc", "city_id"]);
        
        if($agences) {
            return response()->json([
                "status" => true,
                "agences" =>  $agences
            ]);
        }
        return response()->json([
            "status" => true,
            "message" =>  "Impossible de trouver les données"
        ]);
    }

    public function createAgence(Request $request) {

        $agenceExiste = Agence::where("name", $request->name)->first();
        if($agenceExiste) {
            return response()->json([
                "status" => false,
                "message" => "Agence existe déjà",
            ]);
        }
        $agence = new Agence();

        $agence->name = $request->name;
        $agence->desc = $request->desc;
        $agence->city_id = $request->city_id;
        
        if($agence->save()) {
            return response()->json([
                "status" => true,
                "message" => "Agence ajoutée avec succes",
            ]);
        }else {
            return response()->json([
                "status" => false,
                "message" => "Impossible d'ajoutée cette agence",
            ]);
        }

    }

    public function getAgence($id) {

        $agence = Agence::find($id);
        if($agence) {
            return response()->json([
                "status" => true,
                "agence" => $agence ,
            ]);
        }else {
            return response()->json([
                "status" => false,
                "message" => "Aucune donnée n'est trouvée",
            ]);
        }

    }


    public function updateAgence(Request $request, $id) {

        $agence = Agence::find($id);
        if($agence) {
            $agence->name = $request->name;
            $agence->desc = $request->desc;
            $agence->city_id = $request->city_id;
            $agence->save(); 
            return response()->json([
                "status" => true,
                "message" => "Agence modifiée avec succes",
            ]);
        }else {
            return response()->json([
                "status" => false,
                "message" => "Aucune donnée n'est trouvée",
            ]);
        }

    }

    public function deleteAgence( $id) {

        $agence = Agence::find($id);
        if($agence) {
            $agence->delete();
            return response()->json([
                "status" => true,
                "message" => "Agence supprimée avec succes",
            ]);
        }else {
            return response()->json([
                "status" => false,
                "message" => "Aucune donnée n'est trouvée",
            ]);
        }

    }

    
}
