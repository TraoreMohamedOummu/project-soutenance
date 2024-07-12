<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Image;
use App\Models\Property;
use Illuminate\Http\Request;

use function Laravel\Prompts\search;

class PropertyController extends Controller
{

    public function triePropertiesByPrice(Request $request) {
        $arg = $request->input('arg');
        $properties = Property::with(['user', 'agence', 'city', 'type_property', 'images'])
        ->orderby('price', $arg)->get();
         
        if($properties) {
            return response()->json([
                "status" => true,
                "properties" => $properties,
            ]);
        }else {
            return response()->json([
                "status" => false,
                "message" => "Erreur de recuperation des données",
            ]);
        }
    }        
    
    public function getProperties(Request $request) {
        try {

            $searchTerm  = $request->input('searchTerm') ?? null;
            $properties = Property::orderby('id', "DESC")->with(['user', 'agence', 'city', 'type_property', 'images']);
            
            if($searchTerm !== null) {
              $properties = $properties->where('name', 'like', "%{$searchTerm}%")
                                      ->orWhere('price', 'like', "%{$searchTerm}%" )  
                                      ->orWhere('quartier', 'like', "%{$searchTerm}%");
            }

            if($filterAgence = $request->input('agenceId')) {
                $properties = $properties->where('agence_id', $filterAgence);
            }

            if($filterCity = $request->input('cityId')) {
                $properties = $properties->where('city_id', $filterCity);
            }

            if($filterTypeProperty = $request->input('typePropertyId')) {
                $properties = $properties->where('type_property_id', $filterTypeProperty);
            }

            $properties = $properties->get();
            if($properties) {
                return response()->json([
                    "status" => true,
                    "properties" => $properties,
                ]);
            }else {
                return response()->json([
                    "status" => false,
                    "message" => "Erreur de recuperation des données",
                ]);
            }

        }catch(\Exception $ex) {

            return response()->json([
                "status" => false,
                "message" => "Error" . $ex,
            ]);
        }
    }

    public function getPropertyBySlug( $slug) {

        $PropertyExiste = Property::with(['user', 'agence', 'city', 'type_property', 'images'])
        ->where("slug", $slug)->first();
        if($PropertyExiste) {
            return response()->json([
                "status" => true,
                "property" => $PropertyExiste,
            ]);
        }else {
            return response()->json([
                "status" => false,
                "message" => "Bien existe déjà",
            ]);
        }

    }

    public function createProperty(Request $request) {
        $PropertyExiste = Property::where("name", $request->name)->first();
        if($PropertyExiste) {
            return response()->json([
                "status" => false,
                "message" => "Bien existe déjà",
            ]);
        }
        $property = new Property();
        $property->name = $request->name;
        $property->price = $request->price;
        $property->quartier = $request->quartier;
        $property->slug = $request->slug;
        $property->desc = $request->desc;
        $property->type_property_id = $request->type_property_id;
        $property->agence_id = $request->agence_id;
        $property->city_id = $request->city_id;
        $property->user_id = $request->user_id;
        $property->status = 0;
        if($property->save()) {
            return response()->json([
                "status" => true,
                "message" => "Bien crée avec succes",
            ]); 
        }else {
            return response()->json([
                "status" => false,
                "message" => "Impossible de crée, veuillez revoir les données",
            ]); 
        }
    }

    public function getProperty($id) {
        $property = Property::find($id);
        if($property) {
            return response()->json([
                'status' => true,
                'property' => $property
            ]);
        }else {
            return response()->json([
                'status' => false,
                'message' => 'Aucune donnée trouvée'
            ]);
        } 
    }

    public function updateFeactureProperty(Request $request, $id){
        try {
            $property = Property::find($id);
            $property->nombre_piece = $request->nombre_piece ?? null;
            $property->nombre_chambre = $request->nombre_chambre ?? null;
            $property->nombre_salle_bain = $request->nombre_salle_bain ?? null;
            $property->is_eau = $request->is_eau ?? null;
            $property->is_electricite = $request->is_electricite ?? null;
            $property->is_salle_gym = $request->is_salle_gym ?? null;
            $property->status = $request->status ? 1 : 0;
            if($property->save()) {
                return response()->json([
                    "status" => true,
                    "message" => "Mise à jour effecturée avec succes",
                ]); 
            }else {
                return response()->json([
                    "status" => false,
                    "message" => "Impossible de crée, veuillez revoir les données",
                ]); 
            }

        }catch(\Exception $ex) {
            return response()->json([
                "status" => false,
                "message" => "Erreur  : ".$ex,
            ]);
        }
    }
    public function updateProperty(Request $request, $id ) {
        try {
            $property = Property::find($id);
            $property->name = $request->name ;
            $property->price = $request->price;
            $property->desc = $request->desc;
            $property->quartier = $request->quartier;
            $property->slug = $request->slug;
            $property->adresse = $request->adresse;
            $property->type_property_id = $request->type_property_id;
            $property->agence_id = $request->agence_id;
            $property->city_id = $request->city_id;
            $property->user_id = $request->user_id;
            if($property->save()) {
                return response()->json([
                    "status" => true,
                    "message" => "Mise à jour effecturée avec succes",
                ]); 
            }else {
                return response()->json([
                    "status" => false,
                    "message" => "Impossible de crée, veuillez revoir les données",
                ]); 
            }

        }catch(\Exception $ex) {
            return response()->json([
                "status" => false,
                "message" => "Erreur  : ".$ex,
            ]);
        }
    }

    public function updatePropertyTerrain(Request $request, $id) {
        try {
            $property = Property::find($id);
            $property->longueur = $request->longueur;
            $property->largueur = $request->largueur;
            $property->largueur = $request->largueur;
            $property->status = $request->status ? 1 : 0;
            if($property->save()) {
                return response()->json([
                    "status" => true,
                    "message" => "Mise à jour effecturée avec succes",
                ]); 
            }else {
                return response()->json([
                    "status" => false,
                    "message" => "Impossible de crée, veuillez revoir les données",
                ]); 
            }

        }catch(\Exception $ex) {
            return response()->json([
                "status" => false,
                "message" => "Erreur  : ".$ex,
            ]);
        }
    }

    public function addImageProperty(Request $request, $id) {
        $property = Property::find($id);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {                
                $filename = time().'.'.$file->getClientOriginalName();

                $file->move(public_path('property_images'), $filename);

                $image = new Image();
                $image->photo = $filename;
                $image->property_id = $property->id;
                $image->save();
            }

            return response()->json([
                'status' => true,
                'message' => 'Images ajoutées avec succes'
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Impossible d\'ajoutée des images'
            ]);
        }

    }

    public function deleteProperty($id) {
        $property = Property::find($id);
        if($property->delete()) {
            return response()->json([
                'status' => true,
                'message' => 'Bien supprimée avec success'
            ]);
        }else {
            return response()->json([
                'status' => false,
                'message' => 'Bien non supprimé'
            ]);
        }
    }
}
