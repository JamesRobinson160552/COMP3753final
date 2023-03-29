<?php
$dbhost = 'comp3753-db-zjbr.cxbac3bydx0a.us-east-2.rds.amazonaws.com';
$dbport = '5432';
$dbname = 'COMP3753_DB_ZJBR';
$User = "postgres";
$Password =  "123456789";

$con =  pg_connect("host={$dbhost} port={$dbport} dbname={$dbname} user={$User} password={$Password}");


if(!$con)
{
    echo "not found";
    exit("not found");
}

$returnInformation = false;

//$UserIDSequence = "CREATE SEQUENCE uniqueID INCREMENT 1 START 2;";
//pg_query($con, $UserIDSequence);

$action = $_GET['action'];

if ($action === 'getfeatured') //gets all customer data from customer table
{
    //$statement = "SELECT * FROM Public.\"Medium\"";
    $statement = "SELECT * FROM Public.\"Art\"";
    $returnInformation = true;
}

if ($action === 'productMedium') //gets all customer data from customer table
{
    //$statement = "SELECT * FROM Public.\"Medium\"";
    $statement = "SELECT \"MediumID\", \"Size\", \"Material\" FROM Public.\"Medium\" WHERE \"MediumID\" = " . $_GET['MediumID'];
    $returnInformation = true;
}

if($action === 'productInfo')
{
    $statement = "SELECT * FROM Public.\"Art\" NATURAL JOIN Public.\"Artist\" art WHERE \"ArtID\" = " . $_GET['ArtID'];
    $returnInformation = true;
}

if($action === 'getUser')
{
    $statement = "SELECT * FROM Public.\"User\" WHERE \"UserID\" = " . $_GET['UserID'];
    $returnInformation = true;
}


if($action === 'deleteart')
{
    //$statement = "DELETE * FROM Public.\"Art\" WHERE \"ArtID\" = " . $_GET['artid'];
    $statement = "DELETE FROM Public.\"Art\" WHERE \"ArtID\" = " . $_GET['artid'];
    $returnInformation = true;
}

if(isset($_POST['email']) && isset($_POST['password']) && isset($_POST['name']))
{
    $value1 = $_POST['email'];
    $value2 = $_POST['password'];
    $value3 = $_POST['name'];

    $UserIDSequence = "CREATE SEQUENCE uniqueID INCREMENT 1 START 2;";
    pg_query($con, $UserIDSequence);

    $statement = "INSERT INTO Public.\"User\" (\"UserID\", \"Password\", \"Email\", \"Name\") VALUES (nextval('uniqueID'), '{$value2}', '{$value1}', '{$value3}')";
}

if(isset($_POST['city']) && isset($_POST['postal']) && isset($_POST['street']))
{
    $value1 = $_POST['city'];
    $value2 = $_POST['postal'];
    $value3 = $_POST['street'];
    $value4 = $_POST['userID'];

    $UserIDSequence = "CREATE SEQUENCE uniqueIDLocation INCREMENT 1 START 30;";
    pg_query($con, $UserIDSequence);

    $statement = "INSERT INTO Public.\"Location\" (\"LocationID\", \"City\", \"Postal\", \"Street\") VALUES (nextval('uniqueIDLocation'), '{$value1}', '{$value2}', '{$value3}')";
    pg_query($con, $statement);

    $statement = "INSERT INTO Public.\"Artist\" (\"UserID\", \"Password\", \"Email\", \"Name\", \"Quantity Sold\", \"LocationID\") ";
    $statement .= "SELECT \"UserID\", \"Password\", \"Email\", \"Name\", 0, currval('uniqueIDLocation') FROM Public.\"User\" ";
    $statement .= "WHERE \"UserID\" = '{$value4}'";
}

if(isset($_POST['size']) && isset($_POST['material']))
{
    $value1 = $_POST['size'];
    $value2 = $_POST['material'];

    $UserIDSequence = "CREATE SEQUENCE uniqueIDMedium INCREMENT 1 START 2;";
    pg_query($con, $UserIDSequence);

    $statement = "INSERT INTO Public.\"Medium\" (\"MediumID\", \"Size\", \"Material\") VALUES (nextval('uniqueID'), '{$value1}', '{$value2}')";
}

//artid,title,desc,date,userid,artistid,mediumid,locationid,price
if(isset($_POST['size']) && isset($_POST['material']))
{
    $value1 = $_POST['size'];
    $value2 = $_POST['material'];

    $UserIDSequence = "CREATE SEQUENCE uniqueIDMedium INCREMENT 1 START 2;";
    pg_query($con, $UserIDSequence);

    $statement = "INSERT INTO Public.\"Medium\" (\"MediumID\", \"Size\", \"Material\") VALUES (nextval('uniqueID'), '{$value1}', '{$value2}')";
}

if(isset($_POST['loginEmail']) && isset($_POST['password']))
{
    $value1 = $_POST['loginEmail'];
    $value2 = $_POST['password'];

    $statement = "SELECT * FROM Public.\"User\" WHERE \"Email\" = '{$value1}' AND \"Password\" = '{$value2}'";
    $returnInformation = true;
}

if($action === 'getartbyartist')
{
    $statement = "SELECT * FROM (Public.\"Art\" NATURAL JOIN Public.\"Artist\" art) WHERE \"UserID\" = " . $_GET['artist'];
    $returnInformation = true;
}

$result = pg_query($con, $statement); //all information is given to $result

header('Content-Type: application/json; charset=utf-8');

if ($result != null && $returnInformation == true) 
{
    while($row = pg_fetch_assoc($result))
    {
        $arr[]  = $row;
    }
    
    echo json_encode($arr);
} 

//close the connection
//$con->close();
pg_close($con);
?>