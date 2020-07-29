<?php

if($_POST["submit"]) {
    $recipient="yvonnewjy97@gmail.com";
    $subject="Form to email message";
    $sender=$_POST["sender"];
    $senderPhone=$_POST["senderPhone"];
    $senderEmail=$_POST["senderEmail"];
    $message=$_POST["senderMessage"];
    $subscribed=$_POST["gridCheck"];

    $mailBody="Name: $sender\n Phone: $senderPhone\n Email: $senderEmail\n\n$message \n\n Subscribed:$gridCheck";

    mail($recipient, $subject, $mailBody, "From: $sender <$senderEmail>");
    print json_encode(array('message' => 'Thank you! Your message has been sent', 'code' => 1));
    exit();
}

?>