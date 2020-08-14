<?php
if(isset( $_POST['name']))
$name = $_POST['name'];
if(isset( $_POST['email']))
$email = $_POST['email'];
if(isset( $_POST['phone']))
$email = $_POST['phone'];
if(isset( $_POST['message']))
$message = $_POST['message'];
if(isset( $_POST['subject']))
$subject = $_POST['subject'];

$content="From: $name \n Email: $email Phone: $email \n Message: $message";
$recipient = "yvonnewjy97@gmail.com";
$mailheader = "From: $email \r\n";
mail($recipient, $subject, $content, $mailheader) or die("Error!");
echo "Thank you for contacting us! Your message has been sent!";
// print json_encode(array('message' => 'Thank you for contacting us! Your message has been sent!', 'code' => 1));
?>