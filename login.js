function notEmptyCheck(value) {
    return value !== '';
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
    const email = form['Email'];
    const password = form['Password'];

  
  
    email.addEventListener('input', () => validateEmail(email));
    password.addEventListener('input', () => validatePass(password, 'Password'));
  }


// Main form validation
function validateForm(form) {
    const email = form['Email'];
    const password = form['Password'];
    
    // Validate fields
   
    const errorEmail = validateEmail(email);
     const errorPassword = validatePass(password, 'Password');

    // If any validation fails, prevent form submission
    if (errorEmail ||  errorPassword ) {
        return false;
    }

    return true; // If no error, allow form submission
}

// Call addRealTimeValidation on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    const form = document.forms['loginform'];
    addRealTimeValidation(form);
});