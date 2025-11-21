<?php
use PHPMailer\PHPMailer\PHPMailer;
require_once 'PHPMailer/src/PHPMailer.php';
require_once 'PHPMailer/src/SMTP.php';
require_once 'PHPMailer/src/Exception.php';

$to        = "info@vialanex.ca";
$siteName  = "Vialanex.ca";

$name      = trim($_POST["userName"] ?? '');
$email     = trim($_POST["userEmail"] ?? '');
$phone     = trim($_POST["userPhone"] ?? '');
$comment   = trim($_POST["userMessage"] ?? '');
$services  = trim($_POST["userServices"] ?? '');

$body  = "New inquiry from $siteName website\n\n";
$body .= "Name: $name\n";
$body .= "Email: $email\n";
$body .= "Phone: $phone\n";
$body .= "Selected service: $services\n\n";
$body .= "Message:\n$comment\n";

$subject = "New Contact Form Submission – Vialanex.ca";

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
    $mail->addReplyTo($email, $name);

    $mail->Subject = $subject;
    $mail->Body    = $body;

    $mail->send();
    echo json_encode(['message' => 'Data sent, thanks for the message']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['message' => 'Error sending email']);
}