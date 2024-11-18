function notEmptyCheck(value) {
    return value !== '';
}

// Validate name (letters and spaces only) and length (up to 20 characters)
function nameValid(value) {
    return /^[a-zA-Z\s]+$/.test(value);
}

// Add or remove error/valid classes based on validation
function updateFieldStatus(input, error) {
    if (error) {
      input.classList.remove('valid');
      input.classList.add('error');
    } else {
      input.classList.remove('error');
      input.classList.add('valid');
    }
  }

// Validate the Name field (with a limit of 20 characters)
function validateName(input, title) {
    let error = false;
    if (!notEmptyCheck(input.value)) {
        input.nextElementSibling.innerText = 'Please enter your ' + title;
        error = true;
    } else if (input.value.length >= 20) {
        input.nextElementSibling.innerText = title + ' should be no longer than 20 characters';
        error = true;
    } else if (!nameValid(input.value)) {
        input.nextElementSibling.innerText = 'Please enter a valid ' + title;
        error = true;
    } else {
        input.nextElementSibling.innerText = '';
    }
    updateFieldStatus(input, error);
    return error;
}

// Validate Email (with a limit of 50 characters)
function emailValid(value) {
    const emailPattern = /^[\w.]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(value) ;
}

// Validate the Email field
function validateEmail(input) {
    let error = false;
    if (!notEmptyCheck(input.value)) {
        input.nextElementSibling.innerText = 'Please enter your email';
        error = true;
    } else if (input.value.length > 50) {
        input.nextElementSibling.innerText = 'Email should be no longer than 50 characters';
        error = true;
    } else if (!emailValid(input.value)) {
        input.nextElementSibling.innerText = 'Please enter a valid email';
        error = true;
    } else {
        input.nextElementSibling.innerText = '';
    }
    updateFieldStatus(input, error);
    return error;
}

// Validate phone number (exactly 10 digits)
function phoneValid(value) {
    const phonePattern = /^\d{10}$/; // Only 10 digits allowed
    return phonePattern.test(value);
}

// Validate the Phone field (with exactly 10 digits)
function validatePhone(input) {
    let error = false;
    if (!notEmptyCheck(input.value)) {
        input.nextElementSibling.innerText = 'Please enter your phone number';
        error = true;
    } else if (!phoneValid(input.value)) {
        input.nextElementSibling.innerText = 'Phone number should be exactly 10 digits';
        error = true;
    } else {
        input.nextElementSibling.innerText = '';
    }
    updateFieldStatus(input, error);
    return error;
}

// function validatePhoneOnKeyPress(event) {
//     const keyCode = event.which || event.keyCode; // Get the keycode for the pressed key

//     // Allow only digits (0-9) and control keys like backspace, delete, and arrow keys
//     if (
//         (keyCode >= 48 && keyCode <= 57) || // Digits 0-9
//         keyCode === 8 || // Backspace
//         keyCode === 46 || // Delete
//         keyCode === 37 || // Left Arrow
//         keyCode === 39 // Right Arrow
//     ) {
//         return true;
//     } else {
//         return false; // Prevent any non-digit input
//     }
// }

function validatePhoneOnKeyPress(event) {
    const keyCode = event.which || event.keyCode; // Get the keycode for the pressed key

    // Allow only digits (0-9)
    return (keyCode >= 48 && keyCode <= 57); // Digits 0-9
}


// Validate select field (country selection)
function validateSelect(select) {
    let error = false;
    if (select.value === '') {
        select.nextElementSibling.innerText = 'Please select your country';
        error = true;
    } else {
        select.nextElementSibling.innerText = '';
    }
    return error;
}

function validateRadioGroup() {
    const radioGroup=document.forms['ContactForm']['gender'];
    const errorMessage = radioGroup[0].closest('.form-input').querySelector('.errormessage');
    const checked = Array.from(radioGroup).some(radio => radio.checked);
    if (!checked) {
        errorMessage.textContent = 'Preferred contact method is required.';
        return true; // Indicate there is an error
    } else {
        errorMessage.textContent = '';
        return false; // No error
    }
}

// Validate Checkbox group (at least one interest selected)
function validateCheckboxGroup() {
    const checkboxes = document.forms['ContactForm']['Interests'];
    const errorMessage = checkboxes[0].closest('.form-input').querySelector('.errormessage');
    const checked = Array.from(checkboxes).some(checkbox => checkbox.checked);
    if (!checked) {
        errorMessage.textContent = 'At least one interest must be selected.';
        return true; // Indicate there is an error
    } else {
        errorMessage.textContent = '';
        return false; // No error
    }
}

function validateTextArea(textarea, title) {
    let error = false;
    if (!notEmptyCheck(textarea.value)) {
        textarea.nextElementSibling.innerText = 'Please enter your ' + title;
        error = true;
    } else if (textarea.value.length > 300) {
        textarea.nextElementSibling.innerText = title + ' should not exceed 300 characters';
        error = true;
    } else {
        textarea.nextElementSibling.innerText = '';
    }
    updateFieldStatus(textarea, error);
    return error;
}


function passwordValid(value) {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,16}$/;

    return passwordPattern.test(value);
}

function validatePass(input,title){
    let error=false;
    if(!notEmptyCheck(input.value)){
        input.nextElementSibling.innerText ='Please enter your ' + title;
        error=true;    
    } else if(!passwordValid(input.value)){
        input.nextElementSibling.innerText='Password must be 8-16 characters long, including at least one uppercase letter, one lowercase letter, one digit, and one special character';
        error=true;
    }
    else{
        input.nextElementSibling.innerText='';
    }
    
    updateFieldStatus(input,error);
    return error;
}

// Add event listeners for real-time validation
function addRealTimeValidation(form) {
    const firstName = form['FirstName'];
    const lastName = form['LastName'];
    const email = form['Email'];
    const phone = form['Phone'];
    const country = form['country'];
    const  Gender= form['gender'];
    const interests=form['Interests'];
    const comments = form['Comments'];
    const password = form['Password'];

  
    firstName.addEventListener('input', () => validateName(firstName, 'First Name'));
    lastName.addEventListener('input', () => validateName(lastName, 'Last Name'));
    email.addEventListener('input', () => validateEmail(email));
    phone.addEventListener('input', () => validatePhone(phone));
    country.addEventListener('change', () => validateSelect(country));
    form.addEventListener('change', () => validateRadioGroup(Gender));
    form.addEventListener('change', () => validateCheckboxGroup(interests));
    comments.addEventListener('input', () => validateTextArea(comments, 'Comments'));
    comments.addEventListener('input', () => validatePass(password, 'Password'));
  }


// Main form validation
function validateForm(form) {
    const firstName = form['FirstName'];
    const lastName = form['LastName'];
    const email = form['Email'];
    const phone = form['Phone'];
    const country = form['country'];
    // const  Gender= form['gender'];
    // const interests=form['Interests'];
     const comments = form['Comments'];
     const password = form['Password'];
    
    // Validate fields
    const errorFName = validateName(firstName, 'First Name');
    const errorLName = validateName(lastName, 'Last Name');
    const errorEmail = validateEmail(email);
    const errorPhone = validatePhone(phone);
    const errorCountry = validateSelect(country);
    const errorgender = validateRadioGroup();
    const errorInterest = validateCheckboxGroup();
     const errorComments = validateTextArea(comments, 'Comments');
     const errorPassword = validatePass(password, 'Password');

    // If any validation fails, prevent form submission
    if (errorFName || errorLName || errorEmail || errorPhone || errorCountry || errorgender || errorInterest || errorComments || errorPassword ) {
        return false;
    }

    return true; // If no error, allow form submission
}

// Call addRealTimeValidation on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    const form = document.forms['ContactForm'];
    addRealTimeValidation(form);
});




