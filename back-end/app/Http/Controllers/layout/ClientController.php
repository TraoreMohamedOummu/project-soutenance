<?php

namespace App\Http\Controllers\layout;

use App\Http\Controllers\Controller;
use App\Models\Clients;
use App\Notifications\ResetPasswordNotification1;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;

class ClientController extends Controller
{
    public function createClient(Request $request) {

        $clientExiste = Clients::where("email", $request->email)->first();
        if($clientExiste) {
            return response()->json([
                "status" => false,
                "message" => "cet email existe déjà",
            ]);
        }
        $client = new Clients();
        $client->nom = $request->nom;
        $client->prenom = $request->prenom;
        $client->email = $request->email;
        $client->telephone = $request->telephone;
        $client->password = Hash::make($request->password);
        $client->ville = $request->ville;
        $client->pays = $request->pays;
        if($client->save()) {
            return response()->json([
                "status" => true,
                "message" => "Compte crée avec succes"
            ]);
        }else {
            return response()->json([
                "status" => false,
                "message" => "Compte crée avec succes"
            ]);
        }
    }

    public function updateClient(Request $request, $id) {

        $client = Clients::find($id);    
        if($client) {
            if ($request->hasFile('photo')) {
                $photo = $request->file('photo');
                $photoName = time().'.'.$photo->getClientOriginalExtension();
                $photo->move(public_path('client_images'), $photoName);
                $client->photo = $photoName;    
            }
            $client->nom = $request->input('nom');
            $client->prenom = $request->input('prenom');
            $client->email = $request->input('email');
            $client->telephone = $request->input('telephone');
            $client->ville = $request->input('ville');
            $client->pays = $request->input('pays');
            if($client->save()) {
                return response()->json([
                    "status" => true,
                    "message" => "Mise à jour effectuée avec succes"
                ]);
            }else {
                return response()->json([
                    "status" => false,
                    "message" => "mise à jour non effectuée"
                ]);
            }
        }
        
        
    }

    public function updatePasswordClient(Request $request, $id) {
        try {

            $client = Clients::where('id', $id)->first();
            $ancienPassword = $request->input('ancien_password');
            $newPassword = $request->input('new_password');
            
            if ($client && Hash::check($ancienPassword, $client->password)) {
                $updateResult =  Clients::where('id', $id)
                ->update(['password' => bcrypt($newPassword)]);
                if($updateResult === 1) {
                    return response()->json([
                        "status" => true,
                        "message" => "Mot de passe modifié avec succes",
                    ]);
                }else {
                    return response()->json([
                        "status" => false,
                        "message" => "Erreur de modification",
                    ]);
                }
            } else {
                return response()->json([
                    "status" => false,
                    "message" => "Ancien mot de passe est incorrect",
                ]);
            }

        }catch(\Exception $ex) {

        }
    }

    public function getClient($id) {
        $client = Clients::with(['achats'])->where('id', $id)->first();
        if($client) {
            return response()->json([
                "status" => true,
                "client" => $client ,
            ]);
        }else {
            return response()->json([
                "status" => false,
                "message" => "Aucune donnée n'est trouvée",
            ]);
        }
    }

    public function getClients() {
        $clients= Clients::all();
        if($clients) {
            return response()->json([
                "status" => true,
                "clients" => $clients ,
            ]);
        }else {
            return response()->json([
                "status" => false,
                "message" => "Aucune donnée n'est trouvée",
            ]);
        }
    }

    public function loginClient(Request $request) {

        $client = Clients::where("email", $request->email)->first();

        if($client && Hash::check($request->password, $client->password)) {
            return response()->json([
                "status" => true,
                "id" => $client->id,
                "message" => "Connexion reussie"
            ]);
        }else {
            return response()->json([
                "status" => false,
                "message" => "Email ou mot de passe incorrect"
            ]);
        }
        
    }

    public function sendResetLinkEmail(Request $request)
    {
        $request->validate(['email' => 'email']);

        $status = Password::sendResetLink(
            $request->only('email'),
            function (Clients $client, string $token) {
                $client->notify(new ResetPasswordNotification1($token));
            }
        );

        return $status === Password::RESET_LINK_SENT
            ? response()->json(['message' => __($status)], 200)
            : response()->json(['message' => __($status)], 400);
    }
}
