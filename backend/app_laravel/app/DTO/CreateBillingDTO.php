<?php

namespace App\DTO;

use Brick\Math\{BigDecimal, BigInteger};
use Carbon\Carbon;
use DateTime;

class CreateBillingDTO {
   public function __construct(
      public string $name,
      public BigInteger $governmentId,
      public string $email,
      public BigDecimal $debtAmount,
      public DateTime $debtDueDate,
      public string $debtId,
      public DateTime $created_at,
      public DateTime $updated_at
   ) {}

   public static function makeFromReader(array $data): self {
      return new self(
         $data["name"],
         BigInteger::of($data["governmentId"]),
         $data["email"],
         BigDecimal::of($data["debtAmount"]),
         Carbon::parse($data["debtDueDate"]),
         $data["debtId"],
         now(),
         now()
      );
   }
}