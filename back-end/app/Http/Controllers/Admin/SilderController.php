<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Slider;
use Illuminate\Http\Request;

class SilderController extends Controller
{
    public function getSliders() {
        $sliders = Slider::orderby('id', "DESC")->get();
        
        if($sliders) {
            return response()->json([
                "status" => true,
                "sliders" =>  $sliders
            ]);
        }
        return response()->json([
            "status" => true,
            "message" =>  "Impossible de trouver les données"
        ]);
    }

    public function createSlider(Request $request) {

        $sliderExiste = Slider::where("name", $request->name)->first();
        if($sliderExiste) {
            return response()->json([
                "status" => false,
                "message" => "Slider existe déjà",
            ]);
        }

        $slider = new Slider();
        if($request->hasFile("photo")) {
            $photo = $request->file('photo');
            $photoName = time().'.'.$photo->getClientOriginalExtension();
            $photo->move(public_path('slider_images'), $photoName);
            $slider->name = $request->name;
            $slider->photo = $photoName;
        }
        
        
        if($slider->save()) {
            return response()->json([
                "status" => true,
                "message" => "Slider ajoutée avec succes",
            ]);
        }else {
            return response()->json([
                "status" => false,
                "message" => "Impossible d'ajoutée cette slider",
            ]);
        }

    }

    public function getSlider($id) {

        $slider = Slider::find($id);
        if($slider) {
            return response()->json([
                "status" => true,
                "slider" => $slider,
            ]);
        }else {
            return response()->json([
                "status" => false,
                "message" => "Aucune donnée n'est trouvée",
            ]);
        }

    }


    public function updateSlider(Request $request, $id) {

        $slider = Slider::find($id);
        $slider->name = $request->name;
        
        if($request->hasFile("photo")) {
            $photo = $request->file('photo');
            $photoName = time().'.'.$photo->getClientOriginalExtension();
            $photo->move(public_path('slider_images'), $photoName);
            $slider->photo = $photoName;
        }
        
        
        if($slider->save()) {
            return response()->json([
                "status" => true,
                "message" => "Slider modifiée avec succes",
            ]);
        }else {
            return response()->json([
                "status" => false,
                "message" => "Impossible de modifier le slider",
            ]);
        }


    }

    public function deleteSlider( $id) {

        $slider = Slider::find($id);
        if($slider) {
            $slider->delete();
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
