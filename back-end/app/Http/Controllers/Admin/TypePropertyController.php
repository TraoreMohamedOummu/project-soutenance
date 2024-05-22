<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TypeProperty;
use Illuminate\Http\Request;

class TypePropertyController extends Controller
{
    public function getTypeProperties() {
        $typProperties = TypeProperty::orderby('id', "DESC")->get();
        if($typProperties) {
            return response()->json([
                "status" => true,
                "type_properties" => $typProperties
            ]);
        }else {
            return response()->json([
                "status" => false,
                "message" => "Impossible de trouvé les données"
            ]);
        }
    }

    public function createTypeProperty(Request $request) {

        $typePropertyExiste = TypeProperty::where("name", $request->name)->first();
        if($typePropertyExiste) {
            return response()->json([
                "status" => false,
                "message" => "Type propriéte existe déjà",
            ]);
        }

        $typeProperty = new TypeProperty();
        $typeProperty->name = $request->name;
       
        if( $typeProperty->save()) {
            return response()->json([
                "status" => true,
                "message" => "Type de propriété ajoutée avec succes"
            ]);
        }else {
            return response()->json([
                "status" => false,
                "message" => "Impossible d'ajoutée, veuillez revoir vos données"
            ]);
        }
    }

    public function getTypeProperty($id) {

        $typeProperty = TypeProperty::find($id);
        if($typeProperty) {
            return response()->json([
                "status" => true,
                "type_property" => $typeProperty ,
            ]);
        }else {
            return response()->json([
                "status" => false,
                "message" => "Aucune donnée n'est trouvée",
            ]);
        }

    }

    public function updateTypeProperty(Request $request, $id) {
        $typeProperty = TypeProperty::find($id);
        $typeProperty->name = $request->name;
       
        if( $typeProperty->save()) {
            return response()->json([
                "status" => true,
                "message" => "Type de propriété modifiée avec succes"
            ]);
        }else {
            return response()->json([
                "status" => false,
                "message" => "Impossible de modifier, veuillez revoir vos données"
            ]);
        }
    }

    public function deleteTypeProperty( $id) {

        $typeProperty = TypeProperty::find($id);
        if($typeProperty) {
            $typeProperty->delete();
            return response()->json([
                "status" => true,
                "message" => "Type proprieté supprimée avec succes",
            ]);
        }else {
            return response()->json([
                "status" => false,
                "message" => "Aucune donnée n'est trouvée",
            ]);
        }

    }
}
