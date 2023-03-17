<?php
$con = odbc_connect("comp3753-db-zjbr", "Postgres", "123456789");

if(!$con)
{
    echo "not found";
    exit("not found");
}
else
{
    echo "im here";
}
?>