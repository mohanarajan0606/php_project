<?php

$servername = "localhost";
$username = "root";
$password = "";
$db_name = "php_form";

// Create connection
$connect = mysqli_connect($servername, $username, $password, $db_name);

// Check connection
if (!$connect) {
    die("Connection failed: " . mysqli_connect_error());
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve and sanitize form data
    $email = $_POST['Email'];
    $password = $_POST['Password'];

    // Prepare and execute the statement
    $stmt = mysqli_prepare($connect, "SELECT password1 FROM login WHERE Email = ?");
    if ($stmt) {
        mysqli_stmt_bind_param($stmt, "s", $email);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_bind_result($stmt, $stored_password);
        mysqli_stmt_fetch($stmt);
        
        // Check if the email exists and verify the password directly
        if ($stored_password && $password == $stored_password) {
            echo "<div style='background-color: #d4edda; color: #155724; padding: 15px; border-radius: 5px;
             max-width: 500px; margin: 20px auto; text-align: center;'>
                    <strong>Success!</strong> You are logged in successfully.
                  </div>";
            // Uncomment below to redirect after successful login
            // header("Location: dashboard.html");
            // exit();
        } else {
            echo "<div style='background-color: #f8d7da; color: #721c24; padding: 15px; border-radius: 5px; max-width: 500px; margin: 20px auto; text-align: center;'>
                    <strong>Error:</strong> Invalid email or password.
                  </div>";
        }
        
        // Close the statement
        mysqli_stmt_close($stmt);
    } else {
        echo "Error: Could not prepare SQL statement.";
    }
}

// Close the connection
mysqli_close($connect);

?>