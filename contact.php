<?php

// ===============================
// CONFIGURATION
// ===============================

$to = "your@email.com"; // Change this

// ===============================
// ONLY POST REQUESTS
// ===============================

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    exit("Invalid request.");
}

// ===============================
// HONEYPOT SPAM CHECK
// ===============================

if (!empty($_POST['website'])) {
    exit("Spam detected.");
}

// ===============================
// SANITIZE INPUT
// ===============================

$name = trim(filter_input(INPUT_POST, 'name', FILTER_SANITIZE_FULL_SPECIAL_CHARS));
$email = trim(filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL));
$phone = trim(filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_FULL_SPECIAL_CHARS));
$company = trim(filter_input(INPUT_POST, 'company', FILTER_SANITIZE_FULL_SPECIAL_CHARS));
$subject = trim(filter_input(INPUT_POST, 'subject', FILTER_SANITIZE_FULL_SPECIAL_CHARS));
$message = trim(filter_input(INPUT_POST, 'message', FILTER_SANITIZE_FULL_SPECIAL_CHARS));

$lang = isset($_POST['lang']) ? $_POST['lang'] : "en";

// ===============================
// VALIDATION
// ===============================

if (
    empty($name) ||
    empty($email) ||
    empty($subject) ||
    empty($message)
) {
    exit("Please complete all required fields.");
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    exit("Invalid email address.");
}

// ===============================
// EMAIL SUBJECT
// ===============================

$mailSubject = "New Website Inquiry - " . $subject;

// ===============================
// EMAIL BODY
// ===============================

$mailBody = "

New Contact Form Submission

----------------------------------------

Name:
$name

Email:
$email

Phone:
$phone

Company:
$company

Language:
$lang

----------------------------------------

Subject:
$subject

----------------------------------------

Message:

$message

----------------------------------------

Sent From Website Contact Form

";

// ===============================
// EMAIL HEADERS
// ===============================

$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "From: Website Contact <no-reply@" . $_SERVER['SERVER_NAME'] . ">\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// ===============================
// SEND EMAIL
// ===============================

if (mail($to, $mailSubject, $mailBody, $headers)) {

    echo "success";

} else {

    echo "Unable to send email.";

}

?>