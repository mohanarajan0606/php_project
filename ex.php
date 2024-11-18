
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Simple Form</title>
    <style>
        .content{
            padding: 5px;
        }
       
    </style>
</head>
<body>
    <form action="ex.php" method="post">
        <div class="content">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required>
        </div>
        <br>
        <div class="content">
        <label for="mobile" >Mobile:</label>
        <input type="text" id="name" name="mobile"  required>
        <br>
        </div>
        <div class="content">
        <input type="submit" value="Submit" >
        </div>
    </form>
<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    echo "Hello, $name!";
    $mobile=$_POST['mobile'];
    echo "<br>$mobile";
   }
?>
</body>
</html>


