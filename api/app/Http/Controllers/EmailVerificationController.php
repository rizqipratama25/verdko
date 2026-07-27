<?php

namespace App\Http\Controllers;

use App\ApiResponse;
use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;

class EmailVerificationController extends Controller
{
    use ApiResponse;

    public function verify(Request $request, $id, $hash)
    {
        $user = User::findOrFail($id);

        if (! hash_equals(sha1($user->getEmailForVerification()), $hash)) {
            return $this->errorResponse(message: 'Invalid verification link.', code: 403);
        }

        if (! $user->hasVerifiedEmail()) {
            $user->markEmailAsVerified();
            event(new Verified($user));
        }

        return $this->successResponse(message: 'Email verified successfully.', code: 200);
    }

    public function resend(Request $request)
    {
        if ($request->user()->hasVerifiedEmail()) {
            return $this->successResponse(message: 'Email already verified.');
        }

        $request->user()->sendEmailVerificationNotification();

        return $this->successResponse(message: 'Verification email sent.');
    }
}
