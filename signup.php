<?php

	$conn = new mysqli('localhost', 'root', '', 'autodesk');

	$fname = mysqli_real_escape_string($conn, $_POST['fname']);
	$lname = mysqli_real_escape_string($conn, $_POST['lname']);
	$username = mysqli_real_escape_string($conn, $_POST['uname']);
	$password = password_hash(mysqli_real_escape_string($conn, $_POST['pass']) , PASSWORD_BCRYPT);

	$sql = "INSERT INTO `users` (`first_name`, `last_name`, `username`, `password`) VALUES ('$fname', '$lname', '$username', '$password')";
	if ($conn->query($sql) === true)
	{
	    echo "inserted";
	}
	else
	{
	    echo "failed";
	}

?>
