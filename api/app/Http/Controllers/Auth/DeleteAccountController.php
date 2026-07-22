<?php

namespace App\Http\Controllers\Auth;

use App\ApiResponse;
use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;

class DeleteAccountController extends Controller
{
    use ApiResponse;

    public function deleteAccount(Request $request)
    {
        $request->validate([
            'password' => ['required', 'current_password']
        ]);

        try {
            $user = $request->user();

            $user->tokens()->delete();

            $user->delete();

            return $this->deletedResponse("User account deleted successfully");
        } catch (Exception $e) {
            return $this->errorResponse("Failed to delete user account", 500, $e->getMessage());
        }
    }
}
