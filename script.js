
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
        html_string += "<a onclick=\"ViewItemPage(" + object['ArtID'] +","+ object['MediumID'] + "); return false;\">"
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
        $("#featured").html(html_string);

    });
}

function ViewItemPage(ArtID, MediumID)
{
    sessionStorage.setItem('art', "");
    sessionStorage.setItem('medium', "");
    
    //window.location.href("./ProductPage.html");
    console.log(ArtID);
    //console.log(MediumID);
    $.get("server.php?action=productInfo&ArtID=" + ArtID, function(data)  {
        var html_string = "";
        html_string += "<div class=\"row\">"
        html_string += "<a onclick=\"ViewItemPage(" + data['ArtID'] + "); return false;\">"
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

    $.get("server.php?action=productMedium&MediumID=" + MediumID, function(data) {
        var html_string = "";
        //html_string += "<div class=\"row\">"
        html_string += "<div class=\"mediumText\">"
        html_string += "<h5>"+data[0]['Size']+" and made on "+data[0]['Material']+"</h5>"
        //html_string += "<p>"+data[0]['Material']+"</p>"
        html_string += "</div>"
        console.log(html_string);
        sessionStorage.setItem('medium', html_string)
    });
    //console.log((sessionStorage.getItem('art')));
    //console.log((sessionStorage.getItem('medium')));

    waitForChange();
}

function waitForChange(){
    if((sessionStorage.getItem('art') === "") || (sessionStorage.getItem('medium') === ""))
    {
        setTimeout(waitForChange, 50);
        return;
    }
    window.location.href = "./ProductPage.html";
}

function LoadViewPage()
{
    $("#featured1").html((sessionStorage.getItem('art')));
    $("#featured2").html((sessionStorage.getItem('medium')));
    //sessionStorage.setItem('art', "");
}

function CreateUser()
{
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var name = document.getElementById('name').value;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'server.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('email=' + encodeURIComponent(email) + '&password=' + encodeURIComponent(password) + '&name=' + encodeURIComponent(name));
}

function GetArtByArtist($artist)
{
    $.get("server.php?action=getartbyartist&artist=" + $artist, function(data)  
    {
        var html_string = "";
            
        $(data).each(function(key, object) {

        html_string += "<div class=\"row\">"
        html_string += "<a onclick=\"ViewItemPage(" + object['ArtID'] +","+ object['MediumID'] + "); return false;\">"
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
        $("#artistArt").html(html_string);

    });
}