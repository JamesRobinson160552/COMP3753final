$(document).ready(function() {

    Data();
});


function Data() {
    console.log("hello2");
    $.get("DBserver.php?action=getcustomers", function(data)  
    {

        //iterate over the JSON response, building an HTML string
        var html_string = "";
        //html_string+="<tr><td> im here </td></tr>";
            
        $(data).each(function(key, object) {
     
        html_string+="<tr><td>" + object['MediumID'] +"</td><td>"+ object['Size'] +"</td><td>"+ object['Material'] +"</td></tr>";
    
        });
    
        //set the HTML string on the client
        $("#table_body").html(html_string);
    });
}