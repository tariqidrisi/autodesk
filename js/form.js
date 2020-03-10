$(document).ready(function() {

    // display password field after validation
    $("button.next-btn").click(function(event) {
        event.preventDefault();

        var flag = $("#checkFlag").val();

        // user login
        validateFields(flag);
    });

    // go back to username
    $("span.go-back").click(function(e) {
        e.preventDefault();
        $(".password-step").hide();
        $(".username-step").show();

        $(".validation-error").hide();
        $("#checkFlag").val("username");
    });

    // hide sigin form and show create user form
    $(".new-user").click(function(e) {
        e.preventDefault();
        $(".signin").hide();
        $(".signup").removeClass("d-none");
        $(".signup").show();


    });

    // hide create new user form and show sign in form
    $(".existing-user").click(function(e) {
        e.preventDefault();
        $(".signup").hide();
        $(".signin").removeClass("d-none");
        $(".signin").show();
    });

    $("#uname").blur(function() {
        $(this).next(".vemail-err").remove();
        if (!isEmail($(this).val())) {
            $(this).after("<div class=' validation-error email vemail-err'>Please enter a valid email address</div>");

        }
    });

    // verif username
    $("#re-uname").blur(function() {

        // verify same username
        var username = $("#uname").val();
        var confirmUsername = $("#re-uname").val();
        var id = $("#re-uname").attr("id");
        var message = "Username does not match.";

        verifyDetails(username, confirmUsername, id, message);
    });

    // verify password
    $("#re-pass").blur(function() {

        // verify same username
        var password = $("#pass").val();
        var confirmPassword = $("#re-pass").val();
        var id = $("#re-pass").attr("id");
        var message = "Password does not match.";

        verifyDetails(password, confirmPassword, id, message);
    });

    // save form data
    $(".save-data").click(function() {

        if (validateSignupForm()) {

            var fname = $("#fname").val();
            var lname = $("#lname").val();
            var uname = $("#uname").val();
            var pass = $("#pass").val();

            $.ajax({
                url: 'signup.php',
                method: 'POST',
                data: {
                    fname: fname,
                    lname: lname,
                    uname: uname,
                    pass: pass,
                },
                success: function(data) {
                    // success message
                    if (data == 'inserted')
                        toastr.info('Account created successfully');
                    else
                        toastr.error('Something went wrong');

                    setTimeout(function() {
                        location.reload();
                    }, 2000);
                    // go to primary page

                }
            });

        } else {
            toastr.error('Please enter required fields');
        }
    });


});

// is valid email
function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

// re verify details
function verifyDetails(param, confirmParam, id, message) {

    if (param != confirmParam && $("#" + id).next(".userror").length == 0) {
        $("#" + id).after("<div class='validation-error email userror'>" + message + "</div>");
        return false;
    } else {
        $("#" + id).next(".userror").remove();
    }
    return true;
}

// validate username and password fields
function validateFields(flag) {
    var value = true;
    var focusSet = false;
    if (!$('#email').val() && flag == "username") {
        if ($("#email").parent().next(".uerror").length == 0) // only add if not added
        {
            $("#email").parent().after("<div class='form-group validation-error email uerror'>Please enter email address</div>");

        }
        if (isEmail($('#email').val())) {
            $("#email").parent().after("<div class='form-group validation-error email uerror'>Please enter a valid email address</div>");

        }
        value = false;
        $('#email').focus();
        focusSet = true;
    } else {

        $("#email").next(".not-registered").remove();
        $("#email").parent().next(".uerror").remove(); // remove it
        $("#email").parent().next(".not-registered-err").remove(); // remove it

        // check if user is registered or not
        var uname = $("#email").val();

        $.ajax({
            url: 'login.php',
            method: 'POST',
            data: {
                username: uname
            },
            success: function(data) {
                // not registered
                if (data == "no") {

                    if ($("#email").parent().next(".not-registered-err").length == 0) // only add if not added
                    {
                        $("#email").parent().after("<div class='form-group validation-error email not-registered-err'>The username is not recognized.</div>");
                        value = false;
                    } else {
                        $("#email").parent().next(".not-registered-err").remove(); // remove it
                    }
                } else {

                    // if user registered than go ahead
                    $(".username-step").hide();
                    $(".password-step").removeClass("d-none");
                    $(".password-step").show();
                    $("#checkFlag").val("password");
                }

                // welcome user name
                var welcomeName = $("#email").val();
                $("h2 span.user-name").text(welcomeName);

                //validate password with db
                if (!$('#password').val() && flag == "password") {
                    if ($("#password").parent().next(".perror").length == 0) // only add if not added
                    {
                        $(".email").remove();
                        $("#password").parent().after("<div class='form-group validation-error password perror'>Please enter password</div>");

                    }
                    value = false;

                    if (!focusSet) {
                        $("#password").focus();
                    }
                } else if (flag == "password") {
                    $("#password").parent().next(".perror").remove(); // remove it

                    var uname = $("#email").val();
                    var pass = $("#password").val();

                    $.ajax({
                        url: 'login.php',
                        method: 'POST',
                        data: {
                            username: uname,
                            password: pass,
                        },
                        success: function(data) {
                            // success message
                            if (data == 'login')
                                toastr.info('You have been logged in successfully.');
                            else
                                toastr.error('Password is incorrect');
                        }
                    });
                }
            }
        });

    }

    return value;
}

//validate create new user form fields
function validateSignupForm() {
    var value = true;
    var focusSet = false;
    if (!$('#fname').val()) {
        if ($("#fname").next(".fname-error").length == 0) // only add if not added
        {
            $("#fname").after("<div class=' validation-error email fname-error'>Please enter first name</div>");
            value = false;
        }
        value = false;

        $('#fname').focus();
        focusSet = true;
    } else {
        $("#fname").next(".fname-error").remove(); // remove it
    }

    if (!$('#lname').val()) {
        if ($("#lname").next(".lname-error").length == 0) // only add if not added
        {
            $("#lname").after("<div class=' validation-error email lname-error'>Please enter last name</div>");
        }
        value = false;

        $('#lname').focus();
        focusSet = true;
    } else {
        $("#lname").next(".lname-error").remove(); // remove it
    }

    if (!$('#uname').val()) {
        if ($("#uname").next(".uname-error").length == 0) // only add if not added
        {
            $("#uname").after("<div class=' validation-error email uname-error'>Please enter email address</div>");
        }
        value = false;


        $('#uname').focus();
        focusSet = true;
    } else {
        $("#uname").next(".uname-error").remove(); // remove it
    }

    if (!$('#re-uname').val()) {
        if ($("#re-uname").next(".re-uname-error").length == 0) // only add if not added
        {
            $("#re-uname").after("<div class=' validation-error email re-uname-error'>Please re-enter username</div>");
        }

        if (isEmail($('#re-uname').val())) {
            $("#re-uname").after("<div class=' validation-error email re-uname-error'>Please enter a valid email/username address</div>");
        }
        value = false;


        $('#re-uname').focus();
        focusSet = true;
    } else {
        $("#re-uname").next(".re-uname-error").remove(); // remove it
    }

    if (!$('#pass').val()) {
        if ($("#pass").next(".pass-error").length == 0) // only add if not added
        {
            $("#pass").after("<div class=' validation-error email pass-error'>Please enter password</div>");
        }
        value = false;

        $('#pass').focus();
        focusSet = true;
    } else {
        $("#pass").next(".pass-error").remove(); // remove it
    }

    if (!$('#re-pass').val()) {
        if ($("#re-pass").next(".re-pass-error").length == 0) // only add if not added
        {
            $("#re-pass").after("<div class=' validation-error email re-pass-error'>Please confirm your password</div>");
        }
        value = false;

        $('#re-pass').focus();
        focusSet = true;
    } else {
        $("#re-pass").next(".re-pass-error").remove(); // remove it
    }
    return value;
}

// toast messages
var funcBtns = {
    // Display a warning toast, with no title
    alertWarning: function() {
        toastr.warning('Benim adim ömer halisdemir');
    },
    alertOK2: function() {
        // Display a success toast, with a title
        toastr.success('Have fun storming the castle!', 'Miracle Max Says')
    },
    alertError: function() {
        // Display an error toast, with a title
        toastr.error('I do not think that word means what you think it means.', 'Inconceivable!');
    },
    alertOK: function() {
        // Override global options
        toastr.success('We do have the Kapua suite available.', 'Turtle Bay Resort', {
            timeOut: 5000
        });
    }
};

$(function() {

    function Toast(type, css, msg) {
        this.type = type;
        this.css = css;
        this.msg = 'This is positioned in the ' + msg + '. You can also style the icon any way you like.';
    }

    var toasts = [
        new Toast('error', 'toast-bottom-full-width', 'This is positioned in the bottom full width. You can also style the icon any way you like.'),
        new Toast('info', 'toast-top-full-width', 'top full width'),
        new Toast('warning', 'toast-top-left', 'This is positioned in the top left. You can also style the icon any way you like.'),
        new Toast('success', 'toast-top-right', 'top right'),
        new Toast('warning', 'toast-bottom-right', 'bottom right'),
        new Toast('error', 'toast-bottom-left', 'bottom left')
    ];

    toastr.options.positionClass = 'toast-top-full-width';
    toastr.options.extendedTimeOut = 0; //1000;
    toastr.options.timeOut = 1000;
    toastr.options.fadeOut = 250;
    toastr.options.fadeIn = 250;

    var i = 0;

    $('#tryMe').click(function() {
        $('#tryMe').prop('disabled', true);
        delayToasts();
    });

    function delayToasts() {
        if (i === toasts.length) {
            return;
        }
        var delay = i === 0 ? 0 : 2100;
        window.setTimeout(function() {
            showToast();
        }, delay);

        // re-enable the button        
        if (i === toasts.length - 1) {
            window.setTimeout(function() {
                $('#tryMe').prop('disabled', false);
                i = 0;
            }, delay + 1000);
        }
    }

    function showToast() {
        var t = toasts[i];
        toastr.options.positionClass = t.css;
        toastr[t.type](t.msg);
        i++;
        delayToasts();
    }
});