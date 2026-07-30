<?php

namespace App\Http\Controllers\Telegram;

use App\ApiResponse;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Telegram\Bot\Laravel\Facades\Telegram;
use Telegram\Bot\Objects\Update;

class TelegramController extends Controller
{
    use ApiResponse;
    public function handle(Request $request)
    {
        logger('Webhook masuk');

        if (class_exists(\App\Telegram\Commands\StartCommand::class)) {
            logger('Class StartCommand TERBACA oleh Autoloader');
        } else {
            logger('Class StartCommand GAGAL DIBACA (Autoload Problem)');
        }

        $chatId = $request->input('message.chat.id');
        if ($chatId) {
            Telegram::sendMessage([
                'chat_id' => $chatId,
                'text' => 'Halo! Ini balasan manual dari Docker.'
            ]);
        }

        $update = new Update($request->all());

        // Eksekusi command secara manual
        Telegram::bot('mybot')->processCommand($update);

        logger()->info('Telegram webhook payload', $request->all());

        logger('Selesai command');
        return $this->successResponse("ok");
    }

    public function setWebhook()
    {
        Telegram::setWebhook([
            'url' => config('telegram.bots.mybot.webhook_url')
        ]);

        return $this->successResponse("Webhook configured successfully");
    }
}
