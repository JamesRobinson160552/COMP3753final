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
else
{
    echo "im here";
}

//$action = $_GET['action'];

//if ($action === 'getcustomers') //gets all customer data from customer table
//{
    //$odbc_statement = "SELECT MediumID FROM Medium;";
    $statement = "SELECT * FROM Public.\"Medium\"";
//}

$result = pg_query($con, $statement); //all information is given to $result

header('Content-Type: application/json; charset=utf-8');

if ($result != null) 
{
    while($row = pg_fetch_array($result))
    {
        echo "\n";
        echo $row[0];
        echo $row[1];
        echo $row[2];
        echo "\n";
        $arr[]  = $row;
    }
} 
else 
{
    echo json_encode("'success':false}");
}

//close the connection
//$con->close();
?>