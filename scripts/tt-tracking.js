    function sendTracking(position) {
        if (document.location.hostname != "" && document.location.hostname != "rawgit.com") {
            var sessionId = document.getElementById("lblSessionId").textContent;
            var params = "sessionId=" + sessionId + "&latitude=" + position.coords.latitude + "&longitude=" + position.coords.longitude + "&accuracy=" + position.coords.accuracy + "&altitude=" + position.coords.altitudeAccuracy + "&speed=" + position.coords.speed + "&bearing=" + position.coords.heading + "&roadname=test";

            $.get(
                {
                    url: '/services/DeviceTracking.svc/postTracking?' + params,
                    type: "GET",
                    success: function (data) {
                        var data = JSON.stringify(data);
                    }
                });
        }
    }

    function sendFeedback() {
        if (document.location.hostname != "" && document.location.hostname != "rawgit.com") {
            var sessionId = document.getElementById("lblSessionId").textContent;
            var txtFeedBack = document.getElementById("FeedbackText").value;

            $.getJSON(
            {
                url: '/services/DeviceTracking.svc/postFeedBack?sessionId=' + sessionId + '&description=' + txtFeedBack,
                type: "GET",
                success: function (data) {
                    alert('Thank-you for providing feedback!');
                },
                error: function (data) {
                    alert(data);
                }
            });
        }
        //alert('Debug: ' + debugText + '\n\n' + FeedbackText.value);
        adviceText.innerHTML = '';
        buttonsDiv.style.display = 'block';
        feedbackDiv.style.display = 'none';
        if (feedbackText.value == 'email') {
            window.open('mailto:dansherpa@gmail.com?subject=' + lastUpdateTime.toLocaleString() + '&body=' + debugText);
        }
        feedbackText.value = '';
        debugText = '';
    }

    function sendAudioTriggers(typeId) {
        if (document.location.hostname != "" && document.location.hostname != "rawgit.com") {
            var sessionId = document.getElementById("lblSessionId").textContent;

            $.getJSON(
            {
                url: '/services/DeviceTracking.svc/postAuditTriggers?sessionId=' + sessionId + '&intTypeId=' + typeId,
                type: "GET",
                success: function (data) {
                    //alert('Thank-you for providing feedback!');
                },
                error: function (data) {
                    alert(data);
                }
            });
        }
    }

    function sendDebugMessages(description) {
        if (document.location.hostname != "" && document.location.hostname != "rawgit.com") {
            var sessionId = document.getElementById("lblSessionId").textContent;

            $.getJSON(
            {
                url: '/services/DeviceTracking.svc/postDebugMessage?sessionId=' + sessionId + '&description=' + description,
                type: "GET",
                success: function (data) {
                    //alert('Thank-you for providing feedback!');
                },
                error: function (data) {
                    alert(data);
                }
            });
        }
    }
