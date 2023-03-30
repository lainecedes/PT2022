
// Form validation, client side Javascript

const validateForm = () => {
  const name = document.getElementById("name").value; 
  const nameRegex = /^[a-zA-Z ]+$/; // regex

  if (!nameRegex.test(name)) {
    document.getElementById("form-error").innerHTML = "Your name should only contain letters and spaces!";
    return false;

  } else if (name.trim() === "") {
    document.getElementById("form-error").innerHTML = "You have to fill in your name!";
    return false;

  } else { 
    return true;
  }
};
  

document.getElementById("form").addEventListener("submit", function(event) {
  if (!validateForm()) {
    event.preventDefault(); // prevent form submission if validation fails
  }
});



