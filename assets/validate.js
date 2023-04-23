const namee = document.getElementById("name");
const company = document.getElementById("company-name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const type = document.getElementById("type");
const emailTest = /^\S+@\S+\.\S+$/;

function validateForm() {
  if (
    namee.value == "" ||
    company.value == "" ||
    email.value == "" ||
    phone.value == "" ||
    type.value == ""
  ) {
    alert("Ве молиме пополнете ги сите полиња.");
    return false;
  } else if (!validateEmail(email.value)) {
    alert("Внесовте невалидна е-пошта. Обидете се повторно.");
    return false;
  } else {
    alert("Вашите податоци беа успешно испратени.");
    return true;
  }
}
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
