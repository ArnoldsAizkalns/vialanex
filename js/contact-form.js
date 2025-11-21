// Contact form
var popup = document.getElementById("successModal");
var span = document.getElementsByClassName("close")[0];

document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();

    if (!validateForm()) {
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "contact-form.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            popup.style.display = "block";
            document.getElementById("contactForm").reset();
        }
    };
    var formData = new FormData(document.getElementById("contactForm"));
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

function validateForm() {
    var nameInput = document.getElementById("name");
    var emailInput = document.getElementById("email");
    var messageInput = document.getElementById("message");
    var phoneInput = document.getElementById("phone");
    var servicesInput = document.getElementById("services");
    var isValid = true;

    nameInput.classList.remove("invalid-input");
    emailInput.classList.remove("invalid-input");
    messageInput.classList.remove("invalid-input");
    phoneInput.classList.remove("invalid-input");
    servicesInput.classList.remove("invalid-input");

    document.getElementById("nameError").innerHTML = "";
    document.getElementById("emailError").innerHTML = "";
    document.getElementById("messageError").innerHTML = "";
    document.getElementById("phoneError").innerHTML = "";
    document.getElementById("selectError").innerHTML = "";

    if (nameInput.value.trim() === "") {
        nameInput.classList.add("invalid-input");
        document.getElementById("nameError").innerHTML = "Name is required";
        isValid = false;
    }

      if (phoneInput.value.trim() === "") {
        phoneInput.classList.add("invalid-input");
        document.getElementById("phoneError").innerHTML = "Phone is required";
        isValid = false;
    }

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
        emailInput.classList.add("invalid-input");
        emailInput.value = ""; // Clear invalid email
        document.getElementById("emailError").innerHTML = "Invalid Email";
        isValid = false;
    }

    if (messageInput.value.trim() === "") {
        messageInput.classList.add("invalid-input");
        document.getElementById("messageError").innerHTML = "Message is required";
        isValid = false;
    }

    if (messageInput.value.trim() === "") {
      messageInput.classList.add("invalid-input");
      document.getElementById("selectError").innerHTML = "Services is required";
      isValid = false;
  }

    return isValid;
}