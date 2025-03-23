<?php
$servername = "localhost";  // Change this if needed
$username = "root";         // Your MySQL username
$password = "";             // Your MySQL password
$dbname = "payment_db";     // Database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form data
$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$address = $_POST['address'];

// Insert data into the database
$sql = "INSERT INTO payments (name, email, phone, address) VALUES ('$name', '$email', '$phone', '$address')";

if ($conn->query($sql) === TRUE) {
    echo "success";  // Response for AJAX
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
