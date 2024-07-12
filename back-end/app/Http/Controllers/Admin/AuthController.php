<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\SignupRequest;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Mockery\Undefined;

class AuthController extends Controller
{

    public function getUsers() {

        try {
            $users = User::all(['id', 'name', 'email','telephone', 'adresse', 'role_id']);

            if($users) {
                return response()->json($users);
            }else {
                return response()->json("Impossible de trouver les données");
            }
        }catch(\Exception $ex) {
            return response()->json($ex);
        }
    }
    public function addUser(SignupRequest $request) {

        try {
            if($request->validated()) {
                $user = new User();
                $user->name = $request->name;
                $user->email = $request->email;
                $user->password = Hash::make($request->password);
                $user->telephone = $request->telephone;
                $user->adresse = $request->adresse;
                $user->role_id = 2;
                $user->save();

                return response()->json([
                    "status" => true,
                    "message" => "Compte crée avec succes"
                ]);
            }else {
                return response()->json([
                    "status" => false,
                    "message" => "Impossible de crée votre compte, veuillez revoir les champs"
                ]);
            }
            

        }catch(\Exception $e) {
            return "Error : ".$e;
        }
        
    }

    public function getUserByEmailAndPassword(Request $request) {

        try {
            $email = $request->email ?? '';
            $password = $request->password ?? '';
            if($email !== '' && $password !== '') {
                $credentials = [
                    "email" => $email,
                    "password" => $password
                ];

                $auth = Auth::attempt($credentials); 
                if($auth) {

                    $user = User::where('email', '=', $email)->get();

                    return response()->json([
                        "status" => $auth,
                        "data" => $user
                    ]);

                } else {
                    return response()->json([
                        "status" => $auth,
                        "message" => "Email ou mot de password invalid",
                    ]);
                }
            

                
            }else {
                return response()->json([
                    "status" => false,
                    "Error" => "Aucun données n'est existe"
                ]);
            }
            

        }catch(\Exception $e) {
            return "Error : ".$e;
        }
        
    }

    public function getUserById(int $id) {
       try {
        $user = User::where('id', $id)->first();
        $roles = Role::all(['id', 'name']);

        if($user && $roles) {
            return response()->json([
                "status" => true,
                "data" => $user,
                "roles" => $roles
            ]);
        }else {
            return response()->json([
                "status" => false,
                "message" => "Impossible de recuperer les données"
            ]);
        }
       } catch (\Exception $ex) {
        return response()->json([
            "status" => false,
            "Erreur" => $ex
        ]);
       }
    }

    public function updateUserById(Request $request, int $id) {

        try {
            $roleId = $request->role_id ?? '';
            if($roleId !== '') {
                $user = User::find($id);
                if($user) {

                    $user->role_id = $roleId;
                    $user->save();

                    if ($request->hasFile('photo')) {
                        $photo = $request->file('photo');
                        $photoName = time().'.'.$photo->getClientOriginalExtension();
                        $photo->move(public_path('user_images'), $photoName);
                        $user->photo = $photoName;
                        $user->save();
                    }

                    return response()->json([
                        "status" => true,
                        "data" => [
                            "message" => "mise à jour effectuée avec succes",
                            'image_url' => 'user_images'.$photoName
                        ]
                    ]);

                } else {
                    return response()->json([
                        "status" => false,
                        "message" => "Impossible de modifiers",
                    ]);
                }
                
            }else {
                return response()->json([
                    "status" => false,
                    "Error" => "Aucun données n'est existe"
                ]);
            }
            

        }catch(\Exception $e) {
            return "Error : ".$e;
        }

    }

    public function deleteUser(int $id) {

        try {
            $user = User::find($id);
            if($user) {
                $user->delete();
                return response()->json([
                    "status" => true,
                    "message" => "utilisateur supprimé avec succes",
                ]);
            }else {
                return response()->json([
                    "status" => false,
                    "message" => "Impossible de recuperer les données"
                ]);
            }
           } catch (\Exception $ex) {
            return response()->json([
                "status" => false,
                "Erreur" => $ex
            ]);
           }
    }

    public function updateUser(Request $request, int $id) {

        try {
            $user = User::find($id);
            
            if($user) {

                $user->name = $request->name;
                $user->email = $request->email;
                $user->telephone = $request->telephone;
                $user->adresse = $request->adresse;
                $user->save();

                if ($request->hasFile('photo')) {
                    $photo = $request->file('photo');
                    $photoName = time().'.'.$photo->getClientOriginalExtension();
                    $photo->move(public_path('user_images'), $photoName);
                    $user->photo = $photoName;
                    $user->save();
                }

                return response()->json([
                    "status" => true,
                    "message" => "L'utilisateur modifié avec succes",
                ]);

            }else {

                return response()->json([
                    "status" => false,
                    "data" => "Impossible de modifier utilisateur"
                ]);

            }
            

        }catch(\Exception $e) {
            return "Error : ".$e;
        }

    }

    public function resetPassword(Request $request, $id) {
        try {

            $user = User::where('id', $id)->first();
            $ancienPassword = $request->ancien_password;
            $newPassword = $request->new_password;
            
            if ($user && Hash::check($ancienPassword, $user->password)) {
                $updateResult =  User::where('id', $id)
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
}
