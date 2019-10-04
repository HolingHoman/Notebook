<?php
require_once 'config.php';
$time = trim($_POST['time']);
$text = trim($_POST['text']);
if ($time =='' OR $text==''){
    echo 2;
    die;
}
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$sql = "INSERT INTO users (time, text) VALUES ('".$time."', '".$text."')";
if ($conn->query($sql) === TRUE) {
    echo 1;
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
$conn->close();
?>