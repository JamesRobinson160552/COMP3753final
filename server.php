<?php
$con = odbc_connect("comp3753-db-zjbr.cxbac3bydx0a.us-east-2.rds.amazonaws.com1", "Postgres", "123456789");


if(!$con)
{
    echo "not found";
    exit("not found");
}
else
{
    echo "im here";
}

$action = $_GET['action'];

if ($action === 'getcustomers') //gets all customer data from customer table
{
    $odbc_statement = "SELECT MediumID FROM Medium;";
}

$result = Odbc.Query($con, $odbc_statement); //all information is given to $result

header('Content-Type: application/json; charset=utf-8');

if ($result != null) 
{
    //while($row = $result->fetch_array(MYSQLI_ASSOC)) 
    //{
    //        $myArray[] = $row;
    //}
    //echo json_encode($myArray);
    echo json_encode($result);
} 
else 
{
    echo json_encode("'success':false}");
}

//close the connection
$con->close();
?>