<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Translation\PotentiallyTranslatedString;

class SupportedProductUrl implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  Closure(string, ?string=): PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $host = parse_url($value, PHP_URL_HOST);

        $allowedHosts = [
            'tokopedia.com',
            'www.tokopedia.com',
            "tk.tokopedia.com"
        ];

        if (! in_array($host, $allowedHosts, true)) {
            $fail('Invalid product URL!');
        }
    }
}
