<html>
	<head>
		 <script type="text/javascript" src="js/jquery-1.11.3.min.js"></script>
	</head>
	<body>
	<div>

    <p>

    <?php
    $servername = "quickstoppro.se.mysql";
    $username = "quickstoppro_se";
    $password = "EGV8mQWf";
    $database = "quickstoppro_se";
    
    // Create connection
    $conn = new mysqli($servername, $username, $password, $database);
    
    // Check connection
    // Check connection
    if (mysqli_connect_error()) {
        die("Database connection failed: " . mysqli_connect_error());
    }
    echo "Connected successfully";

	  $sql = "SELECT * FROM `Poi`";
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            echo "id: " . $row["ID"]. " - Name: " . $row["Name"]. " " . $row["Description"]. "<br>";
        }
    } else {
        echo "0 results";
    }
    $conn->close();

    ?>
	  

	  </p>
	  
	</div>
	

   
     
    

	
	</body>
</html>

