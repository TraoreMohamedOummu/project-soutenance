<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\ResetPassword as ResetPasswordNotification;
use Illuminate\Notifications\Messages\MailMessage;

class ResetPasswordNotification1 extends ResetPasswordNotification
{

    public function toMail($notifiable): MailMessage
    {
        return (new MailMessage)
        ->subject('Réinitialisation de votre mot de passe')
        ->line('Vous recevez cet email car nous avons
         reçu une demande de réinitialisation de mot de passe pour votre compte.')
        ->action('Réinitialiser le mot de passe',
         url(config('app.url') . route('password.reset', ['token' => $this->token, 'email' => $notifiable->getEmailForPasswordReset()], false)))
        ->line('Si vous n\'avez pas demandé de réinitialisation de mot de passe, aucune action n\'est requise.');
    }

}
