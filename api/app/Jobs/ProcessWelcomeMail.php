<?php

namespace App\Jobs;

use App\Mail\WelcomeMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Mail;

class ProcessWelcomeMail implements ShouldQueue
{
    use Queueable;
    protected Array $user;

    /**
     * Create a new job instance.
     */
    public function __construct(Array $user)
    {
        $this->user = $user;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Mail::to($this->user['email'])->send(new WelcomeMail($this->user));
        sleep(10);
    }
}
