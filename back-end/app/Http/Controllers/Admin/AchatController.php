<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Achat;
use App\Models\Property;
use Illuminate\Http\Request;

class  AchatController extends Controller
{
    public function getAchats() {
        $achats = Achat::all();

        if($achats) {
            return response()->json([
                "status" => true,
                "achats" => $achats,
            ]);
        }else {
            return response()->json([
                "status" => false,
                "message" => "Aucune donnée n'est trouvée",
            ]);
        }  
    }

    public function getAchatById($id) {
        $achat = Achat::with(['property'])->where('id', $id)->get();

        if($achat) {
            return response()->json([
                "status" => true,
                "achat" => $achat,
            ]);
        }else {
            return response()->json([
                "status" => false,
                "message" => "Aucune donnée n'est trouvée",
            ]);
        }  
    }

    public function createAchat(Request $request) {

        $achat = new Achat();
        $priceTotal = $request->input("price_total");
        $idProperty = $request->input("property_id");
        if($idProperty) {
            $property = Property::find($idProperty);
            if($priceTotal == $property->price) {
                $achat->price_total = $priceTotal;
                $achat->property_id = $request->input("property_id");
                $achat->clients_id = $request->input("client_id");
                $achat->email = $request->input("email");
                $achat->telephone = $request->input("telephone");
                $achat->desc = $request->input("desc");
                if($achat->save()) {
                    $property->status = 1;
                    $property->save();
                    return response()->json([
                        "status" => true,
                        "message" => "Propriéte achetée avec succes",
                    ]);
                }else {
                    return response()->json([
                        "status" => false,
                        "message" => "Propriéte non achetée",
                    ]);
                }
            }else {
                return response()->json([
                    "status" => false,
                    "message" => "Le prix est insufissant, veuillez rentrer un prix valable.",
                ]);
            }
        }else {
            return response()->json([
                "status" => false,
                "message" => "Erreur de donnée",
            ]);
        }

    }
}
