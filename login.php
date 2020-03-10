<?php

	$conn = new mysqli('localhost', 'root', '', 'autodesk');

	if (isset($_POST['username']) && !isset($_POST['password']))
	{
	    $user = mysqli_real_escape_string($conn, $_POST['username']);

	    $query = mysqli_query($conn, "SELECT * FROM users WHERE username='$user' ") or die("Could not execute query: " . mysqli_error($conn));
	    $found = mysqli_fetch_assoc($query);
	    if (!$found)
	    {
	        echo "no";
	    }
	    else
	    {
	        echo "yes";
	    }
	}

	if (isset($_POST['username']) and isset($_POST['password']))
	{
	    $user = mysqli_real_escape_string($conn, $_POST['username']);
	    $pass = mysqli_real_escape_string($conn, $_POST['password']);

	    $query = "SELECT * FROM users WHERE username = '$user'";
	    $result = mysqli_query($conn, $query);
	    if (mysqli_num_rows($result) > 0)
	    {
	        $row = mysqli_fetch_assoc($result);
	        if (password_verify($pass, $row['password']))
	        {

	            echo "login";

	        }
	        else
	        {
	            echo "The username or password do not match";
	        }
	    }
	    else
	    {
	        echo 'failed';
	    }
	}

?>
