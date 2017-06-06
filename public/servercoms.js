var xhr = new XMLHttpRequest();
xhr.open("POST", "/server", true); 

//Send the proper header information along with the request
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

xhr.onreadystatechange = function() {//Call a function when the state changes.
    if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
        document.getElementById("response").innerHTML = this.responseText;
    }
}
