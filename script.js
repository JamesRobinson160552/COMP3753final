$(document).ready(function() {

    SayHello();
});

function SayHello()
{
    console.log("hello");

    $.get("server.php") //found php file
    {
        console.log("got");
    }

    console.log("hello2");
}