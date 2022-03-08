<?php


	$prinome = $_POST['prinome'];
	$ultinome = $_POST['ultinome'];
	$email = $_POST['email'];
	$assunto = $_POST['assunto'];
	$mensagem = $_POST['mensagem'];
	
	$to = 'lisbonroadmapimmigrant@gmail.com';
	$subject = "$assunto";
	$message = "$mensagem";
	$headers = "Enviado por $prinome $ultinome, $email";
	if (mail($to, $subject, $message, $headers)) {
	 echo "SUCCESS";
	} else {
	 echo "ERROR";
	}
	
	
 header("Location: index-pt.html");
	
?>