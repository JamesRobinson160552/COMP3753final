
function Data() {
    console.log("hello2");
    //$.get("server.php?action=getcustomers", function(data)
    console.log(sessionStorage.getItem('loggedInUser'));
    $.get("server.php?action=getUser&UserID=" + sessionStorage.getItem('loggedInUser'), function(data){
        var html_string = "";
            
        $(data).each(function(key, object) {
     
            html_string += "<h5>"+object['Name']+"</h5>"
        
        });
        $("#featured3").html(html_string);
        console.log(html_string);
    });

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
        html_string += "<a onclick=\"ViewItemPage(" + object['ArtID'] +","+ object['MediumID']+","+ object['LocationID']+ "); return false;\">"
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

function ViewItemPage(ArtID, MediumID, LocationID)
{
    sessionStorage.setItem('art', "");
    sessionStorage.setItem('medium', "");
    sessionStorage.setItem('location', "");
    
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

    $.get("server.php?action=productLocation&LocationID=" + LocationID, function(data) {
        var html_string = "";
        //html_string += "<div class=\"row\">"
        html_string += "<div class=\"mediumText\">"
        html_string += "<h5> This piece is stored in "+data[0]['City']+"</h5>"
        //html_string += "<p>"+data[0]['Material']+"</p>"
        html_string += "</div>"
        console.log(html_string);
        sessionStorage.setItem('location', html_string)
    });
    //console.log((sessionStorage.getItem('art')));
    //console.log((sessionStorage.getItem('medium')));

    waitForChange();
}

function waitForChange(){
    if((sessionStorage.getItem('art') === "") || (sessionStorage.getItem('medium') === "") || (sessionStorage.getItem('location') === ""))
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
    $("#featured3").html((sessionStorage.getItem('location')));
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

    if(email !== "" && password !== "" && name !== "")
    {
        console.log("looks good");
        location.replace("./Sparrow.html");
    }

    else
    {
        console.log("looks not good");
        alert("Oops! Make sure you fill in all the fields");
    }
}

function Login()
{
    sessionStorage.setItem('loggedInUser', "")
    var loginEmail = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'server.php?action=none', true);
    xhr.responseType = 'text';
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('loginEmail=' + encodeURIComponent(loginEmail) + '&password=' + encodeURIComponent(password));
    console.log('loginEmail=' + encodeURIComponent(loginEmail) + '&password=' + encodeURIComponent(password))

    xhr.addEventListener('load', function() {
        if (xhr.status === 200) {
            // Handle the response from the server
            var responseText = JSON.parse(xhr.responseText);

            sessionStorage.setItem('loggedInUser', responseText[0].UserID)
            //console.log(sessionStorage.getItem('loggedInUser').UserID);
            console.log(responseText); // log the response to the console
            console.log(sessionStorage.getItem('loggedInUser')); //this is the value of the userID who is logged in
        } else {
            console.log('Error: ' + xhr.status); // log any errors to the console
        }
    });

    goToSparrow();
}

function goToSparrow()
{
    if(sessionStorage.getItem('loggedInUser') == "")
    {
        setTimeout(goToSparrow, 50);
        return;
    }
    window.location.href = "./Sparrow.html";
}

function BecomeArtist()
{
    var placeholder = sessionStorage.getItem('loggedInUser')
    sessionStorage.setItem('loggedInUser', "")
    var city = document.getElementById('city').value;
    var postal = document.getElementById('postal').value;
    var street = document.getElementById('street').value;
    var responseText

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'server.php?action=none', true);
    xhr.responseType = 'text';
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('city=' + encodeURIComponent(city) + '&postal=' + encodeURIComponent(postal) + '&street=' + encodeURIComponent(street) + '&userID=' + encodeURIComponent(placeholder));
    //console.log('loginEmail=' + encodeURIComponent(loginEmail) + '&password=' + encodeURIComponent(password))

    xhr.addEventListener('load', function() {
        if (xhr.status === 200) {
            // Handle the response from the server
            responseText = xhr.responseText;
            console.log(responseText);
            sessionStorage.setItem('loggedInUser', placeholder)
        } else {
            console.log('Error: ' + xhr.status); // log any errors to the console
        }
    });

    goToSparrow();
}

function UploadArt()
{
    var placeholder = sessionStorage.getItem('loggedInUser')
    sessionStorage.setItem('loggedInUser', "")
    var title = document.getElementById('title').value;
    var desc = document.getElementById('desc').value;
    var date = document.getElementById('date').value;
    var price = document.getElementById('price').value;
    var material = document.getElementById('material').value;
    var height = document.getElementById('height').value;
    var length = document.getElementById('length').value;
    var responseText

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'server.php?action=none', true);
    xhr.responseType = 'text';
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('title=' + encodeURIComponent(title) + '&desc=' + encodeURIComponent(desc) + '&date=' + encodeURIComponent(date) + '&price=' + encodeURIComponent(price) + '&userID=' + encodeURIComponent(placeholder) + '&material=' + encodeURIComponent(material) + '&length=' + encodeURIComponent(length) + '&height=' + encodeURIComponent(height));
    console.log('title=' + encodeURIComponent(title) + '&desc=' + encodeURIComponent(desc) + '&date=' + encodeURIComponent(date) + '&price=' + encodeURIComponent(price) + '&userID=' + encodeURIComponent(placeholder) + '&material=' + encodeURIComponent(material) + '&length=' + encodeURIComponent(length) + '&height=' + encodeURIComponent(height));

    xhr.addEventListener('load', function() {
        if (xhr.status === 200) {
            // Handle the response from the server
            responseText = xhr.responseText;
            console.log(responseText);
            sessionStorage.setItem('loggedInUser', placeholder)
        } else {
            console.log('Error: ' + xhr.status); // log any errors to the console
        }
    });

    goToSparrow();
}


//We can reuse this for search by artist or delete later if we want
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

function GetArtByCurrentUser()
{
    $.get("server.php?action=getartbyartist&artist=" + sessionStorage.getItem('loggedInUser'), function(data)  
    {
        var html_string = "";
        
        if (!data)
        {
            html_string = "<h3>You have no art posted<h3>"
        }
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
        html_string += "<button onclick=\"DeleteArt(" + object['ArtID'] + ")\">DELETE</button>"
        html_string += "</div></div>"
    
        });
        $("#uploadedArt").html(html_string);
    });
}

function DeleteArt(artID)
{
    console.log("Called Delete")
    $.ajax({
        url: "server.php?action=deleteart&artid=" + artID,
        type: 'DELETE',
        success: console.log("Success!")
    });
    window.location.reload();
}

function GetSearch()
{
    query = document.getElementById("searchval").value;
    sessionStorage.setItem('query', query);
}

function GetArtByFilter() 
{
    input = sessionStorage.getItem('query');
    $.get("server.php?action=getsearch&filter=" + input, function(data)  
    {
        var html_string = "<p>Test</p>";
        
        $(data).each(function(key, object) {
            html_string += "<div class=\"row\">"
            html_string += "<a onclick=\"ViewItemPage(" + object['ArtID'] +","+ object['MediumID']+","+ object['LocationID']+ "); return false;\">"
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
        $("#searchResults").html(html_string);
    });
}
