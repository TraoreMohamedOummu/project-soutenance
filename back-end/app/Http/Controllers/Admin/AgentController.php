<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Agent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AgentController extends Controller
{
    public function getAgents(Request $request) {
        $searchTerm  = $request->input('searchTerm') ?? null;
            $agents = Agent::orderby('id', "DESC");
            
            if($searchTerm !== null) {
              $agents = $agents->where('nom', 'like', "%{$searchTerm}%")
                                      ->orWhere('prenom', 'like', "%{$searchTerm}%" )  
                                      ->orWhere('ville', 'like', "%{$searchTerm}%");
            }

            if($filterAgence = $request->input('agenceId')) {
                $agents = $agents->where('agence_id', $filterAgence);
            }

            $agents = $agents->get();
            if($agents) {
                return response()->json([
                    "status" => true,
                    "agents" => $agents,
                ]);
            }else {
                return response()->json([
                    "status" => false,
                    "message" => "Erreur de recuperation des données",
                ]);
            }
    }

    public function getAgentBySlug( $slug) {

        $agentExiste = Agent::where("slug", $slug)->first();
        if($agentExiste) {
            return response()->json([
                "status" => true,
                "agent" => $agentExiste,
            ]);
        }else {
            return response()->json([
                "status" => false,
                "message" => "Bien existe déjà",
            ]);
        }

    }

    public function createAgent(Request $request) {
        $PropertyExiste = Agent::where("email", $request->email)->first();
        if($PropertyExiste) {
            return response()->json([
                "status" => false,
                "message" => "E-mail existe déjà",
            ]);
        }
        $agent = new Agent();
        $agent->nom = $request->nom;
        $agent->prenom = $request->prenom;
        $agent->email = $request->email;
        $agent->slug = $request->nom .'-'.$request->prenom.rand(100, 10000);
        $agent->telephone = $request->telephone;
        $agent->adresse = $request->adresse;
        $agent->ville = $request->ville;
        $agent->pays = $request->pays;
        $agent->commission_taux = $request->commission_taux ?? null;
        $agent->agence_id = $request->agenceId;
        $agent->password = Hash::make($request->password);
        $agent->notes = $request->notes ?? null;
        $agent->code_postal = $request->code_postal ?? null;
        $agent->date_embouche = $request->dateEmbouche;
        
        if($agent->save()) {
            return response()->json([
                "status" => true,
                "message" => "Compte crée avec succes",
            ]); 
        }else {
            return response()->json([
                "status" => false,
                "message" => "Impossible de crée, veuillez revoir les données",
            ]); 
        }
    }

    public function getAgent($id) {
        $agent = Agent::where('id', $id)->first();
        if($agent) {
            return response()->json([
                "status" => true,
                "agent" => $agent ,
            ]);
        }else {
            return response()->json([
                "status" => false,
                "message" => "Aucune donnée n'est trouvée",
            ]);
        }
    }


    public function updateAgent(Request $request, $id) {

        $agent = Agent::find($id);    
        if($agent) {
            if ($request->hasFile('photo')) {
                $photo = $request->file('photo');
                $photoName = time().'.'.$photo->getClientOriginalExtension();
                $photo->move(public_path('agent_images'), $photoName);
                $agent->photo = $photoName;    
            }
            $agent->nom = $request->input('nom');
            $agent->prenom = $request->input('prenom');
            $agent->email = $request->input('email');
            $agent->telephone = $request->input('telephone');
            $agent->adresse = $request->input('adresse');
            $agent->ville = $request->input('ville');
            $agent->pays = $request->input('pays');
            $agent->code_postal = $request->input('code_postal');
            $agent->notes = $request->input('notes');
            $agent->agence_id = $request->input('agence_id');
            if($agent->save()) {
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

    public function updatePasswordAgent(Request $request, $id) {
        try {

            $agent = Agent::where('id', $id)->first();
            $ancienPassword = $request->input('ancien_password');
            $newPassword = $request->input('new_password');
            
            if ($agent && Hash::check($ancienPassword, $agent->password)) {
                $updateResult =  Agent::where('id', $id)
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

    public function loginAgent(Request $request) {

        $agent = Agent::where("email", $request->email)->first();

        if($agent && Hash::check($request->password, $agent->password)) {
            return response()->json([
                "status" => true,
                "idAgent" => $agent->id,
                "message" => "Connexion reussie"
            ]);
        }else {
            return response()->json([
                "status" => false,
                "message" => "Email ou mot de passe incorrect"
            ]);
        }
        
    }

}
