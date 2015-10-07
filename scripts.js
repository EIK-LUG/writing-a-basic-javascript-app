/**
 * Created by not-much-io on 3.10.15.
 */

/*This function is run when the page is loaded.
* Variables are being set here, that will house the state of the app.
* */
(function() {

    //Constants
    //These constant are just used to refer to the pomodoro state.
    window.Constants = {
        STOPPED : "The pomodoro is stopped",
        RUNNING : "The pomodoro is running",
        INTERVAL_WORK: "The pomodoro is in work mode",
        INTERVAL_REST: "The pomodoro is in rest mode"
    };

    //State
    //What state is the pomodoro currently in.
    window.pomState = window.Constants.STOPPED;
    //Which interval is the pomodoro currently in.
    window.pomInterval = undefined;
    //Next pomodoro interval
    window.pomNextInterval = undefined;
    //The time currently being counted down from, -1 if pomodoro stopped
    window.currPomTime = -1;

    //DOM and atate sycing
    //This ID will be used to reference the interval running the timer
    window.intervalID = undefined;
    //Let syncing the state and DOM happen in the background. NOTE: 8-16ms is not detectable by the human eye
    window.setInterval(syncStateAndDom, 10);

    //Settings
    //Seconds that the Work phase of the pomodoro lasts
    window.pomWorkTime = 25*60;
    //Seconds that the Rest phase of the pomodoro lasts.
    window.pomRestTime = 5*60;

})();

/*Function to handle setting settings from interface*/
function setSetting(setting, val) {
    if (setting == "workT") {
        window.pomWorkTime = val*60;
    } else if (setting == "restT") {
        window.pomRestTime = val*60;
    } else {
        console.log("Undefined setting");
    }
}

/*Raises notification, currently only sound. Browser notification could be added.*/
function notify() {
    var audio = new Audio("resources/notif.mp3");
    audio.play();
}


// This function is called inside an interval call and will repeatedly run and sync the state values and the DOM.
function syncStateAndDom() {
    var workTimeLbl = document.getElementById("workTimeLbl");
    var restTimeLbl = document.getElementById("restTimeLbl");
    var display = document.getElementById("display");

    workTimeLbl.textContent = "Work Time (" + window.pomWorkTime/60 + " min)";
    restTimeLbl.textContent = "Rest Time (" + window.pomRestTime/60 + " min)";
    display.textContent = pomTimeToLabel(window.currPomTime);
}


// This function will handle converting the current pomodoro running time to the label displayed in the HTML.
function pomTimeToLabel(pomRunTime) {

    if (pomRunTime == -1) {
        return "00:00:00" + " ina.";
    }

    //Pad zeros
    function pad(x) {
        return x < 10 ? "0" + x : x;
    }

    var hours, minutes, seconds;
    hours = minutes = 0;
    seconds = pomRunTime;

    while (seconds >= 60) {
        seconds -= 60;
        minutes++;
    }

    while (minutes >= 60) {
        minutes -= 60;
        hours++;
    }

    return  pad(hours.toString()) + ":" +
        pad(minutes.toString()) + ":" +
        pad(seconds.toString()) +
        (window.pomInterval == window.Constants.INTERVAL_WORK ? " wrk." : " rst.");
}


// This function will handle everything associated with switching state.
function toggleState() {

    //Select the DOM element (HTML tag) with the id display.
    var actionButtonIcon = document.getElementById("actionButtonIcon");

    //Change state variables
    if (window.pomState == window.Constants.STOPPED) {
        window.pomState = window.Constants.RUNNING;
        window.currPomTime = window.pomWorkTime;
        actionButtonIcon.textContent = "stop";
    } else if (window.pomState == window.Constants.RUNNING) {
        window.pomState = window.Constants.STOPPED;
        window.currPomTime = -1;
        actionButtonIcon.textContent = "play_arrow"
    } else {
        console.log("Undefined pomState");
    }

}

// This function will take the pomodoro running time and check if it is time for a state switch.
function isOver(pomodoroRunningTime) {
    return pomodoroRunningTime <= 0;
}

//The timer mechanism itself will just be calling this function every 1000ms. This function will handle updating the timer values.
function updateTimer() {
    if (!isOver(window.currPomTime)) {
        window.currPomTime--;
    } else {
        notify();
        var tmpNextInterval = window.pomNextInterval;
        window.pomNextInterval = window.pomInterval;
        window.pomInterval = tmpNextInterval;
        if (window.pomInterval == window.Constants.INTERVAL_WORK) {
            window.currPomTime = window.pomWorkTime;
        } else if (window.pomInterval == window.Constants.INTERVAL_REST) {
            window.currPomTime = window.pomRestTime;
        } else {
            console.log("Undefined interval");
        }
    }
}

//This function will handle everything associated with starting the pomodoro.
function startPomodoro() {

    //Set up initial Interval states
    window.pomInterval = window.Constants.INTERVAL_WORK;
    window.pomNextInterval = window.Constants.INTERVAL_REST;

    //Switch state
    toggleState();

    //Activate countdown. Every 1000ms, update timer will be called. Also the interval ID is returned.
    window.intervalID = window.setInterval(updateTimer, 1000)

}

//This function will handle everything associated with stopping the pomodoro.
function stopPomodoro() {
    //Switch state
    toggleState();
    //Deactivate countdown
    clearInterval(window.intervalID);
}

//This function will handle what happens if the action button is clicked
function onActionButtonClicked() {
    var state = window.pomState;
    if (state == window.Constants.STOPPED) {
        startPomodoro();
    } else if (state == window.Constants.RUNNING) {
        stopPomodoro();
    } else {
        console.log("Undefined behaviour in onActionButtonClicked");
    }
}