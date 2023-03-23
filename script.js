
function Data() {
    console.log("hello2");
    //$.get("server.php?action=getcustomers", function(data)
    $.get("server.php?action=getfeatured", function(data)  
    {
       // href=\"./ProductPage.html\"

        //iterate over the JSON response, building an HTML string
        var html_string = "";
        //html_string+="<tr><td> im here </td></tr>";
            
        $(data).each(function(key, object) {
     
        //html_string+="<tr><td>" + object['MediumID'] +"</td><td>"+ object['Size'] +"</td><td>"+ object['Material'] +"</td></tr>";
        //html_string+="<tr><td>" + object['Title'] +"</td><td>"+ object['Price'] +"</td></tr>";
        html_string += "<div class=\"row\">"
        html_string += "<a onclick=\"ViewItemPage(" + object['ArtID'] + "); return false;\">"
        html_string += "<img src = \"im.jpeg\" alt = \"\"></a>"
        html_string += "<div class=\"product-text\">"
        html_string += "<h5>"+object['Title']+"</h5>"
        html_string += "</div>"
        html_string += "<div class=\"likes\">"
        html_string += "<i class='bx bxs-heart'></i>"
        html_string += "</div>"
        html_string += "<div class=\"price\">"
        html_string += "<p>"+object['Price']+"</p>"
        html_string += "</div></div>"
    
        });
        //onStorage.setItem('art', );
        //set the HTML string on the client
        $("#featured").html(html_string);

    });
}

function ViewItemPage(ArtID)
{
    sessionStorage.setItem('art', "");
    
    //window.location.href("./ProductPage.html");
    //console.log(ArtID);
    $.get("server.php?action=productInfo&ArtID=" + ArtID, function(data)  {
        var html_string = "";
        html_string += "<div class=\"row\">"
        //html_string += "<a onclick=\"ViewItemPage(" + data['ArtID'] + "); return false;\">"
        html_string += "<img src = \"im.jpeg\" alt = \"\"></a>"
        html_string += "<div class=\"product-text\">"
        html_string += "<h5>"+data[0]['Title']+"</h5>"
        html_string += "</div>"
        html_string += "<div class=\"likes\">"
        html_string += "<i class='bx bxs-heart'></i>"
        html_string += "</div>"
        html_string += "<div class=\"price\">"
        html_string += "<p>"+data[0]['Name']+"</p>"
        html_string += "</div></div>"

        console.log(html_string);
       /// $("#featured1").html(html_string);
        sessionStorage.setItem('art', html_string);
    });
    console.log((sessionStorage.getItem('art')));

    waitForChange();
}

function waitForChange(){
    if((sessionStorage.getItem('art')) === ""){
        setTimeout(waitForChange, 50);
        return;
    }
    window.location.href = "./ProductPage.html";
}

function LoadViewPage()
{
    $("#featured1").html((sessionStorage.getItem('art')));
    //sessionStorage.setItem('art', "");
}