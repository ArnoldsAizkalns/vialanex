<?php
use PHPMailer\PHPMailer\PHPMailer;
require_once 'PHPMailer/src/PHPMailer.php';
require_once 'PHPMailer/src/SMTP.php';
require_once 'PHPMailer/src/Exception.php';

$name  = trim($_POST["firstFormName"] ?? '');
$phone = trim($_POST["firstFormPhone"] ?? '');

$body = "Quick Call-Back Request from Vialanex.ca\n\n";
$body .= "Name: $name\n";
$body .= "Phone: $phone\n";
$body .= "Requested a call back as soon as possible.\n";

$subject = "CALL ME BACK – Vialanex.ca";

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.europe.secureserver.net';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'info@vialanex.ca';
    $mail->Password   = 'YOUR_REAL_PASSWORD_HERE';     // ← change this
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;
    $mail->CharSet    = 'UTF-8';

    $mail->setFrom('info@vialanex.ca', 'Vialanex Website');
    $mail->addAddress('info@vialanex.ca');

    $mail->Subject = $subject;
    $mail->Body    = $body;

    $mail->send();
    echo json_encode(['message' => 'Data sent, thanks for the message']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['message' => 'Error sending email']);
}