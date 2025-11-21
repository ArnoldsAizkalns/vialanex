// Contact form
var popup = document.getElementById("successModal");
var span = document.getElementsByClassName("close")[0];

document.getElementById("firstForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "first-form.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            popup.style.display = "block";
            document.getElementById("firstForm").reset();
        }
    };
    var formData = new FormData(document.getElementById("firstForm"));
    xhr.send(new URLSearchParams(formData).toString());
});

span.onclick = function() {
    popup.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == popup) {
        popup.style.display = "none";
    }
}
