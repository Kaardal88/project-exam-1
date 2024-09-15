const fname = document.getElementById('name');
const email = document.getElementById('email');
const subject = document.getElementById('subject');
const message = document.getElementById('message');
const form = document.getElementById('form');
const success = document.getElementById('submit-success');

const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const subjectError = document.getElementById('subject-error');
const messageError = document.getElementById('message-error');

const validEmail = email => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

email.addEventListener('input', () => {
    emailError.innerText = '';
    if (email.value !== '' && !validEmail(email.value)) {
        emailError.innerText = 'Invalid email address';
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    success.style.display = 'none';

    nameError.innerText = '';
    emailError.innerText = '';
    subjectError.innerText = '';
    messageError.innerText = '';

    let isValid = true;

    if (fname.value === '' || fname.value == null) {
        nameError.innerText = 'Please enter your name';
        isValid = false;
    } else if (fname.value.length <= 5) {
        nameError.innerText = 'Name must be at least 5 characters long';
        isValid = false;
    }

    if (email.value === '') {
        emailError.innerText = 'Email is required';
        isValid = false;
    } else if (!validEmail(email.value)) {
        emailError.innerText = 'Invalid email address';
        isValid = false;
    }

    if (subject.value.length <= 15) {
        subjectError.innerText = 'Subject must be at least 15 characters long';
        isValid = false;
    } else if (subject.value.length >= 30) {
        subjectError.innerText = 'Subject must be less than 30 characters long';
        isValid = false;
    }

    if (message.value.length <= 25) {
        messageError.innerText = 'Message must be more than 25 characters long';
        isValid = false;
    }



    if (isValid) {
        success.style.display = 'block';

        fname.value = '';
        email.value = '';
        subject.value = '';
        message.value = '';

    }
});
