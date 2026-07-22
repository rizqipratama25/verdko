<?php

namespace App\Http\Controllers\Auth;

use App\ApiResponse;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;

class ForgotPasswordController extends Controller
{
    use ApiResponse;
    public function sendResetLink(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);

        Password::sendResetLink(
            $request->only('email')
        );

        return $this->successResponse(message: "Password reset link sent.", code: 200);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'token' => 'required',
            'password' => 'required|confirmed|min:6',
        ]);

        $status = Password::reset(
            $request->only(
                'email',
                'password',
                'password_confirmation',
                'token'
            ),
            function ($user, $password) {

                $user->password = Hash::make($password);

                $user->save();
            }
        );

        if ($status === Password::PASSWORD_RESET) {
            return $this->successResponse(message: "Password reset successfully.", code: 200);
        }

        return $this->successResponse(message: __($status), code: 400);
    }
}
