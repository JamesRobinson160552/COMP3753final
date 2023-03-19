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

    $.get("server.php?action=getcustomers", function(data)  
    {

        //iterate over the JSON response, building an HTML string
        var html_string = "";
            
        $(data).each(function(key, object) {
     
            console.log(object['MediumID']);
    
        });
    
        //set the HTML string on the client
        //$("#table_body").html(html_string);
    
    });
}