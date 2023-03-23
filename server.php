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


$action = $_GET['action'];

if ($action === 'getfeatured') //gets all customer data from customer table
{
    //$statement = "SELECT * FROM Public.\"Medium\"";
    $statement = "SELECT * FROM Public.\"Art\"";
}

if ($action === 'getcustomers') //gets all customer data from customer table
{
    //$statement = "SELECT * FROM Public.\"Medium\"";
    $statement = "SELECT \"MediumID\", \"Size\", \"Material\" FROM Public.\"Medium\"";
}

if($action === 'productInfo')
{
    $statement = "SELECT * FROM Public.\"Art\" NATURAL JOIN Public.\"Artist\" WHERE \"ArtID\" = " . $_GET['ArtID'];
}

$result = pg_query($con, $statement); //all information is given to $result

header('Content-Type: application/json; charset=utf-8');

if ($result != null) 
{
    while($row = pg_fetch_assoc($result))
    {
        //echo "\n";
        //echo $row['MediumID'];
        //echo $row['Size'];
        //echo $row['Material'];
        //echo "\n";
        $arr[]  = $row;
    }
    //$arr = pg_fetch_results($result,1,1);
    echo json_encode($arr);
} 
else 
{
    echo json_encode("'success':false}");
}

//close the connection
//$con->close();
pg_close($con);
?>