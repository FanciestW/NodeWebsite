$(document).ready(function() {

    $('#emailBtn, #btnEmailMe').on('click', openSendEmailModal);
    $('#btnMessageClose, #sendEmailClose').on('click', closeSendEmailModal);

    // Send message via sendMeMail API.
    $('#btnMessageSend').on('click', function(){
        
        if (!validateSendEmailForm()) {
            return false;
        }

        const emailMessage = $('#emailFormMessage').val();
        const senderName = $('#emailFormSenderName').val();
        const senderEmail = $('#emailFormSenderEmail').val();

        body = JSON.stringify({
            message: emailMessage,
            email: senderEmail,
            name: senderName,
        });
        $.post('https://608y0baaza.execute-api.us-east-1.amazonaws.com/dev/email', body).done(function(data) {
            console.log(data);
        });
        $('#sendEmailForm').css('display', 'none');
    });

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == document.getElementById('sendEmailForm')) {
            closeSendEmailModal();
        }
    }
});

function openSendEmailModal() {
    $('#sendEmailForm').css('display', 'block');
}

function closeSendEmailModal() {
    $('#sendEmailForm').css('display', 'none');
}

function validateSendEmailForm() {
    let isValid = true;

    const message = $('#emailFormMessage').val();
    const senderName = $('#emailFormSenderName').val();
    const senderEmail = $('#emailFormSenderEmail').val();

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!emailRegex.test(senderEmail)) {
        $('#senderEmailError').text('* Invalid Email.');
        $('#senderEmailError').css('display', 'block');
        isValid &= false;
    } else {
        $('#senderEmailError').text('');
        $('#senderEmailError').css('display', 'none');
    }
    if (!message) {
        $('#messageError').text('* Please write something.');
        $('#messageError').css('display', 'block');
        isValid &= false;
    } else {
        $('#messageError').text('');
        $('#messageError').css('display', 'none');
    }
    if (!senderName) {
        $('#senderNameError').text('* Please provide your name.');
        $('#senderNameError').css('display', 'block');
        isValid &= false;
    } else {
        $('#senderNameError').text('');
        $('#senderNameError').css('display', 'none');
    }
    return isValid;
}
