$(document).ready(() => {
    let form = $("#submit-form");
    $(form).validate({
        rules: {
            name: {
                required: true,
                minlength: 4,
            },
            email: {
                required: true,
                email: true,
            },
            subject: {
                required: true,
                minlength: 4,
            },
            message: {
                required: true,
            },
        }
    });
    $("#submit-form").submit((e) => {
        e.preventDefault();
        $('.loading').slideDown();
        $('.error-message').slideUp();
        $('.sent-message').slideUp();
        setTimeout(() => {
            if (form.valid()) {
                $.ajax({
                    url: "https://script.google.com/macros/s/AKfycbzruhVEBm9x6jwRHwiOLovKoYguOyl6r5Q5Zcnu/exec",
                    data: $("#submit-form").serialize(),
                    method: "POST",
                    success: function (response) {
                        $('.loading').slideUp();
                        $('.sent-message').slideDown();
                        $(form).each(function () {
                            this.reset();
                        });
                    },
                    error: function (err) {
                        $('.loading').slideUp();
                        $('.error-message').slideDown().html("Form submission failed, Can't connect to the server!");
                    }
                });
            } else {
                $('.loading').slideUp();
                $('.error-message').slideDown().html("Form submission failed!");
            }
        }, 1000);
    });
});