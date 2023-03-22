$(document).ready(function() {

    Data();
});


function Data() {
    console.log("hello2");
    //$.get("server.php?action=getcustomers", function(data)
    $.get("server.php?action=getfeatured", function(data)  
    {

        //iterate over the JSON response, building an HTML string
        var html_string = "";
        //html_string+="<tr><td> im here </td></tr>";
            
        $(data).each(function(key, object) {
     
        //html_string+="<tr><td>" + object['MediumID'] +"</td><td>"+ object['Size'] +"</td><td>"+ object['Material'] +"</td></tr>";
        //html_string+="<tr><td>" + object['Title'] +"</td><td>"+ object['Price'] +"</td></tr>";
        html_string += "<div class=\"row\">"
        html_string += "<img src = \"im.jpeg\" alt = \"\">"
        html_string += "<div class=\"product-text\">"
        html_string += "<h5>"+object['Title']+"</h5>"
                       // <p>4566</p>
        html_string += "</div>"
        html_string += "<div class=\"likes\">"
        html_string += "<i class='bx bxs-heart'></i>"
        html_string += "</div>"
        html_string += "<div class=\"price\">"
        html_string += "<p>"+object['Price']+"</p>"
        html_string += "</div></div>"
    
        });
    
        //set the HTML string on the client
        $("#featured").html(html_string);
    });
}