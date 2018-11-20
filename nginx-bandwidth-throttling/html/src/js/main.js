$(document).ready(function() {

    var stringLog = "";
    var validator;
    var confirmButton;

    stringLog += "! Progressive Download URL: http://35.240.112.27/limit_pdl/ <=> http://test.vodos.oscdn.skycdn.it\n";
    stringLog += "! Rec URL: http://35.240.112.27/limit_rec/ <=> http://live.hip.oscdn.skycdn.it/\n";
    stringLog += "\n\n";

    $("textarea").text(stringLog);

    validator = $("#form").bootstrapValidator({
        feedbackIcons: {
            valid: "glyphicon glyphicon-ok",
            invalid: "glyphicon glyphicon-remove",
            validating: "glyphicon glyphicon-refresh"
        },
        fields: {
            ipaddr: {
                validators: {
                    notEmpty: {
                        message: "Please, supply the IP address you want to throttle."
                    }
                }
            },
            bps: {
                validators: {
                    notEmpty: {
                        message: "Please, supply the throttling value."
                    }
                }
            }
        }
    });

    confirmButton = $("button").click(function() {
        $("#form").bootstrapValidator("validate");

        if(!!$("#ipaddr").val() 
                && !!$("#bps").val()) {

		    stringLog += " Waiting for server response...\n";
                    $("textarea").text(stringLog);

                    $("#container").css({
                        opacity: 0.3
                    });

                    $("#loader").css({
                        display: "block"
                    });
        
            $.ajax({
                type: "POST",
                url: "http://35.240.112.27/limit/config",
                data: "ipaddr=" + $("#ipaddr").val() + "&bps=" + $("#bps").val() + "&user_id" + $("#userid").val(),
                success: function(data) {
		    stringLog += " " + data + "\n";

                    $("textarea").text(stringLog);

                    $("#container").css({
                        opacity: 1
                    });

                    $("#loader").css({
                        display: "none"
                    });
                },
                error: function(xhr, textStatus, errorThrown) {

		    stringLog += " " + xhr.responseText + "\n";
                    $("textarea").text(stringLog);

                    $("#container").css({
                        opacity: 1
                    });

                    $("#loader").css({
                        display: "none"
                    });
                }
            });
        }

    });
});
