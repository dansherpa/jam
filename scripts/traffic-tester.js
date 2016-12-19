    // Elements that we will need to manipulate
    var adviceDiv = document.getElementById("AdviceDiv");
    var buttonsDiv = document.getElementById("ButtonsDiv");
    var adviceText = document.getElementById("AdviceText");
    var bigDisplay = document.getElementById("BigDisplay");
    var startStopButton = document.getElementById("StartStop");
    var feedbackDiv = document.getElementById("FeedbackDiv");
    var feedbackText = document.getElementById("FeedbackText");
    var introAudio = document.getElementById("IntroAudio");
    var introAudioSrc = document.getElementById("IntroAudioSrc");

    var timesCrawling = 0;
    var speedTotal = 0;
    var speedCount = 0;
    var below45Already = false;
    var escapedFromTraffic = false;
    var repeatedAccelCount = 0;
    var debugText = "";
    var lastSpeed = 0;
    var currentSpeed = 0;
    var startTime = 0;
    var stopTime = 0;
    var trafficStartTime = 0;
    var stayInLanePlayed = false;
    var lastPosition;

    var added = 0;
    var highacc = true;
    var verbalize = true;
    var appendDebug = true;
    var alwaysHighway = true;
    var lastAdvisory = '';
    var lastUpdateTime = 0;
    var debugState = false;
    var started = false;
    var carLengths = 4;
    var accelCount = 0;
    var dotsCount = 0;
    var xhr;
    var isChrome = ((navigator.userAgent.toLowerCase().indexOf('chrome') > -1) &&(navigator.vendor.toLowerCase().indexOf("google") > -1));

    // Variable to track position watch ID
    var watchPositionId = 0;

    // Function to determine if browser supports geolocation
    function checkGeolocationSupport() {
        debugMessage('checking geo support')
        feedbackDiv.style.display = 'none';
        if (navigator.geolocation) {
            buttonsDiv.style.display = 'block';
            startStopButton.enabled = true;
            adviceText.innerHTML = '<em>Please verify your phone audio is turned on to the proper volume and listen to the brief introduction.<\/em>';
        } else {
            // Browser does not support geolocation
            startStopButton.enabled = false;
            buttonsDiv.style.display = 'none';
            adviceText.innerHTML = '<em>We cannot show your location because your browser does not support HTML 5 geolocation.<\/em>';
        }
        debugMessage('checked geo support');
        //setTimeout(playAudio('Intro.mp3'), 5000);
//        if (isChrome) {
//            say("Introduction.");
//        } else {
//            introAudio.play();
//        }
//        debugMessage('intro audio queued');
    }

    function isMobileBrowser() {
      var check = false;
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
      return check;
    };

    function startTracking() {
        if (isChrome) {
          debugMessage('Browser IS chrome');
        } else {
          debugMessage('Browser is NOT chrome');
        }

        if (started) {
          debugMessage("Stop pressed.");
          sendAudioTriggers(2);
          stopTime = new Date();
          started = false;
          StartStop.innerHTML = "Enter</br>Highway";
          //StartStop.value = "Enter Highway";
          //feedbackText.value = debugText;
          feedbackDiv.style.display = 'block';
          buttonsDiv.style.display = 'none';
          adviceText.innerHTML = getTripSummary();
        } else {
          stayInLanePlayed = false;
          introAudio.volume=0.0;
          introAudio.play();
          debugMessage("Start pressed.");
          sendAudioTriggers(1);
          if (isMobileBrowser()) {
            debugMessage("mobile browser");
          } else {
            debugMessage("desktop browser");
          }
          startTime = new Date();
          feedbackDiv.style.display = 'none';
          started = true;
          timesCrawling = 0;
          speedTotal = 0;
          speedCount = 0;
          below45Already = false;
          escapedFromTraffic = false;
          lastSpeed = 0;
          repeatedAccelCount = 0;
          currentSpeed = 0;
          buttonsDiv.style.display = 'block';
          adviceText.innerHTML = "Playing advice via audio. Make sure audio is on."
          StartStop.innerHTML = "Exit<br/>Highway";
          //StartStop.value = "Exit Highway";

        }

        navigator.geolocation.clearWatch(watchPositionId);

        // Start watching location
        if (started) {
          watchPositionId = navigator.geolocation.watchPosition(currentPositionChanged, showError, {
            enableHighAccuracy: highacc,
            maximumAge: 10000,
            timeout: 30000
          });
        } else {
          watchPositionId = undefined;
        }
    }

    function currentPositionChanged(position) {
        debugMessage("new position");
        sendTracking(position);
        var now = new Date();
/*        if (lastUpdateTime) {
          debugMessage("now.getTime() - lastUpdateTime.getTime(): " + (now.getTime() - lastUpdateTime.getTime()));
        }
        debugMessage("frequency: " + frequency);
        debugMessage("accelCount: " + accelCount);
        if(lastUpdateTime && (now.getTime() - lastUpdateTime.getTime() < (frequency * 1000))){
            debugMessage("Ignoring position update");
            return;
        }
        debugMessage("NOT ignoring position update"); */
        lastUpdateTime = now;

        // Determine current distance to mountain
        //var currentDistance;
        //currentDistance = calculateDistance(position.coords.latitude, position.coords.longitude, mountainData[mountainDataIndex][1], mountainData[mountainDataIndex][2]);
        //var timestampDate = new Date(position.timestamp);

        // Build results
        //position.coords.latitude
        //position.coords.longitude
        //position.coords.accuracy
        //position.coords.altitude
        //position.coords.altitudeAccuracy
        //position.coords.heading
        //position.coords.heading
        //position.coords.speed
        
        if (position.coords.speed) {
            lastSpeed = currentSpeed;
            currentSpeed = (position.coords.speed * 2.2369362920544);
        } else {
            debugMessage("no speed recorded");
            if (!lastPosition) {
                debugMessage("cannot calculate speed on first position report");
                lastPosition = position;
                return;
            }
            if (position.coords && position.timestamp && position.timestamp > 0 && position.coords.latitude && position.coords.longitude) {
                debugMessage("calculating speed from distance/time");
                currentSpeed = calculateSpeed(lastPosition, position);
                debugMessage("spped calculated at: " + currentSpeed + " mph");
                lastSpeed = currentSpeed;
            } else {
                debugMessage("cannot calculate speed - not enough position info");
                return;
            }
        }

        lastPosition = position;

        debugMessage("speed = " + currentSpeed);
        dotsCount = ((dotsCount) % 3) + 1;

        speedTotal = speedTotal + currentSpeed;
        speedCount = speedCount + 1;

        if (currentSpeed < 45) {
            debugMessage('below 45');
            if (!below45Already) {
                debugMessage('first time below 45');
                trafficStartTime = now;
                below45Already = true;
                adviceText.innerHTML = 'Maintain at least 5 car lengths behind the vehicle in front of you.';
 //               if (isChrome) {
 //                   say("Maintain at least 5 car lengths behind the vehicle in front of you.");
 //               } else {
                    sendAudioTriggers(3);
                    playAudio('audio/Carspace.mp3');
 //               }
                //say("Maintain at least 5 car lengths behind the vehicle in front of you.");
            }
            if (!stayInLanePlayed && ((now - trafficStartTime) > (60*1000*5))) { // 5 minutes
                stayInLanePlayed = true;
                adviceText.innerHTML = 'Be sure to stay in your lane.';
//                if (isChrome) {
//                    say("Be sure to stay in your lane.");
//                } else {
                    sendAudioTriggers(4);
                    playAudio('audio/Stayinlane.mp3');
//                }
                //say("Stay in your lane");
            }
            escapedFromTraffic = false;
        }
        adviceText.innerHTML = (adviceText.innerHTML).replace(/\.+$/, "") + ".".repeat(dotsCount);

        if (currentSpeed <= 2) {
            timesCrawling = timesCrawling + 1;
        }

        if (currentSpeed > lastSpeed) {
            if (repeatedAccelCount == 0) {
                if (currentSpeed < 45) {
                    repeatedAccelCount = 1;
                } 
            } else {
                repeatedAccelCount = repeatedAccelCount + 1;
            }
        } else {
            repeatedAccelCount = 0;
        }

        if (!escapedFromTraffic && repeatedAccelCount == 5 && currentSpeed >= 45) {
            // just left traffic, accelerated 5 times in a row and speed >= 45
            adviceText.innerHTML = 'Exiting congestion. Be sure to maintain a speed below the speed limit.';
//            if (isChrome) {
//                say("Exiting congestion. Be sure to maintain a speed below the speed limit.");
//            } else {
                sendAudioTriggers(5);
                playAudio('audio/Speedlimit.mp3');
//            }
            //say("Exiting congestion. Be sure to maintain a speed below the speed limit.");
            below45Already = false;
            trafficStartTime = 0;
        }
    }

    function pad(num, size) {
        var s = num+"";
        while (s.length < size) s = "0" + s;
        return s;
    }

    function debugMessage(m) {
      var d = new Date();
      debugText = debugText + d.toLocaleString('en-US', { hour12: false, timeZone: "UTC"}) + "." + pad((d.getMilliseconds() % 1000), 3) + ": " + m + '\n';
      console.log(m);

      sendDebugMessages(m);
    }

    function getTripSummary() {
        debugMessage("get trip summary");
        var avgSpeed = 0;
        if (speedCount > 0) {
            avgSpeed = speedTotal/speedCount;
        }
        var summary = "";

        summary = '<em>Trip Summary</em><br/><br/>';
        summary = summary + 'Times at 0-2 mph: ' + timesCrawling + '<br/><br/>';
        summary = summary + 'Average Speed: ' + avgSpeed + ' mph<br/><br/>';
        summary = summary + 'Trip Time: ' + getTimeDiff(startTime, stopTime);
        return summary;
    }

    function getTimeDiff(start, finish) {
        var seconds = Math.round((finish - start) / 1000);
        var minutes = Math.floor(seconds / 60);
        seconds = seconds - (minutes * 60);
        return minutes + " minute(s), " + seconds + " second(s)";
    }

    // Function to convert degrees to radians
    function convertToRadian(numericDegree) {
        return numericDegree * Math.PI / 180;
    }

    function calculateSpeed(pos1, pos2) {
        var millis = pos2.timestamp - pos1.timestamp;
        debugMessage("millis: " + millis);
        if (pos1.timestamp > 14000000000000) {
            // microseconds
            debugMessage("adjusting millis");
            millis = Math.floor(millis / 1000);
        }
        var hours = millis / (1000.0 * 60.0 * 60.0);
        debugMessage("hours: " + hours);
        var miles = calculateDistance(pos1.coords.latitude, pos1.coords.longitude, pos2.coords.latitude, pos2.coords.longitude);
        debugMessage("miles: " + miles);
        var speed = miles / hours;
        debugMessage("Calculated millis: " + millis + ", hours: " + hours + ", miles: " + miles + ", speed: " + speed);
        return speed;
    }

    function massageTimestamp(timestamp) {
        if (timestamp > 14000000000000) {
            return Math.floor(timestamp / 1000);
        } else {
            return timestamp;
        }
    }

    function calculateDistance(latitude1, longitude1, latitude2, longitude2) {

        // Calculate distance between mountain peak and current location
        // using the Haversine formula
        var earthRadius = 3961.3; // Radius of the earth in miles
        var dLatitude = convertToRadian(latitude2 - latitude1);
        var dLongitude = convertToRadian(longitude2 - longitude1);
        var a = Math.sin(dLatitude / 2) * Math.sin(dLatitude / 2) + Math.cos(convertToRadian(latitude1)) * Math.cos(convertToRadian(latitude2)) * Math.sin(dLongitude / 2) * Math.sin(dLongitude / 2);
        var greatCircleDistance = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var distance = earthRadius * greatCircleDistance; // distance converted to miles from radians
        return distance;
    }

    function submitFeedback() {
        sendFeedback();
    }

    function testAudio() {
        playAudio('audio/Intro.mp3');
        //say("audio test");
    }

    function say(something) {
        debugMessage("saying: " + something);
        var msg = new SpeechSynthesisUtterance(something);
        window.speechSynthesis.speak(msg);
    }

    var currentAudio;

    function playAudio(file) {
        debugMessage('staging ' + file);
        if (currentAudio) {
            debugMessage('pausing last audio');
            currentAudio.pause();
            debugMessage('paused last audio');
        }
        if (introAudio) {
            debugMessage('pausing intro audio');
            introAudio.pause();
            debugMessage('paused intro audio');
        }
        debugMessage('playing ' + file);
        //var audio = new Audio(file);
        //currentAudio = audio;
        //audio.play();
        IntroAudioSrc.src = file;
        introAudio.volume=1.0;
        introAudio.load();
        introAudio.play();
        debugMessage('played ' + file);
    }

    // Handle all error messages and display appropriate elements
    function showError(error) {
        // Determine appropriate error message
        switch (error.code) {
            case error.PERMISSION_DENIED:
                adviceText.innerHTML = "We tried but we can't calculate your location because you denied the request for Geolocation."
                break;
            case error.POSITION_UNAVAILABLE:
                adviceText.innerHTML = "We tried but we can't calculate your location because the location information is unavailable."
                break;
            case error.TIMEOUT:
                adviceText.innerHTML = "We tried but we can't calculate your location because the request to get your location timed out."
                break;
            case error.UNKNOWN_ERROR:
                adviceText.innerHTML = "We tried but we can't calculate your location because an unknown error occurred."
                break;
        }
    }
