<?php

namespace App\Http\Controllers\layout;

use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function createMessage(Request $request) {
        $idClient = $request->input('client_id');
        $msgContent = $request->input('content');
        $telephone = $request->input('telephone');

        $message = new Message();
        $message->client_id = $idClient ?? null;
        $message->telephone = $telephone;
        $message->content = $msgContent;
        if($message->save()) {
            return response()->json([
                "status" => true,
                "message" => "Envoyé avec succes"
            ]);
        }else {
            return response()->json([
                "status" => false,
                "message" => "Non Envoyé"
            ]);  
        }

        
    }

    
     
    
}
