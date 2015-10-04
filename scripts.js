/**
 * Created by not-much-io on 3.10.15.
 */

/*
* This function is run when the page is loaded.
*
* Variables are being set here, that will house the state of the app.
*
* */
(function() {

    //These constant are just used to refer to the pomodoro state.
    window.Constants = {
        STOPPED : "The pomodoro is stopped",
        RUNNING : "The pomodoro is running",
        INTERVAL_WORK: "The pomodoro is in work mode",
        INTERVAL_REST: "The pomodoro is in rest mode"
    };

    //What state is the pomodoro currently in.
    window.pomState = window.Constants.STOPPED;

    //Which interval is the pomodoro currently in.
    window.pomInterval = undefined;

    //Next pomodoro interval
    window.pomNextInterval = undefined;

    //The time currently being counted down from, -1 if pomodoro stopped
    window.currPomTime = -1;

    //Minutes (seconds in testing) that the Work phase of the pomodoro lasts
    window.pomWorkTime = 25;

    //Minutes (seconds in testing) that the Rest phase of the pomodoro lasts.
    window.pomRestTime = 5;

    //This ID will be used to reference the interval running the timer
    window.intervalID = undefined;

    //Let syncing the state and DOM happen in the background. NOTE: 8-16ms is not detectable by the human eye
    window.setInterval(syncStateAndDom, 10);

})();

/*Function to handle setting settings*/
function setSetting(setting, val) {
    if (setting == "workT") {
        window.pomWorkTime = val;
    } else if (setting == "restT") {
        window.pomRestTime = val;
    } else {
        console.log("Problem in setSetting()");
    }
}

/*
* This function is called inside an interval call and will repeatedly run and sync the state values and the DOM.
* */
function syncStateAndDom() {

    var workTimeLbl = document.getElementById("workTimeLbl");
    var restTimeLbl = document.getElementById("restTimeLbl");
    var display = document.getElementById("display");

    workTimeLbl.textContent = "Work Time (" + window.pomWorkTime + " min)";
    restTimeLbl.textContent = "Rest Time (" + window.pomRestTime + " min)";
    display.textContent = pomTimeToLabel(window.currPomTime);
}

/*
* This function will handle converting the current pomodoro running time to the label displayed in the HTML
*
* @param {Number} pomodoroRunningTime
* @return {String} label to be displayed on countdown counter.
*
* */
function pomTimeToLabel(pomRunTime) {

    if (pomRunTime == -1) {
        return "00:00:00";
    }

    function pad(x) {
        return x < 10 ? "0" + x : x;
    }

    var hours, minutes, seconds;
    hours = minutes = 0;
    seconds = pomRunTime;

    while (seconds > 60) {
        seconds -= 60;
        minutes++;
        if (minutes > 60) {
            minutes -= 60;
            hours++;
        }
    }

    return pad(hours.toString()) + ":" + pad(minutes.toString()) + ":" + pad(seconds.toString());
}

/*
* This function will handle everything associated with switching state.
*
* */
function toggleState() {

    //Select the DOM element (HTML tag) with the id display.
    var actionButtonIcon = document.getElementById("actionButtonIcon");

    //Change state variables
    if (window.pomState == window.Constants.STOPPED) {

        window.pomState = window.Constants.RUNNING;

        //Change current pomodoro running time
        window.currPomTime = window.pomWorkTime;

        //Change button label
        actionButtonIcon.textContent = "stop";

    } else if (window.pomState == window.Constants.RUNNING) {

        window.pomState = window.Constants.STOPPED;

        //Change current pomodoro running time
        window.currPomTime = -1;

        //Change button label
        actionButtonIcon.textContent = "play_arrow"

    } else {
        console.log("Problem in toggleState()");
    }

}

/*
* This function will take the pomodoro running time and check if it is time for a state switch.
* */
function isOver(pomodoroRunningTime) {

    return pomodoroRunningTime <= 0;

}

/*
* The timer mechanism itself will just be calling this function every 1000ms.
*
* This function will handle updating the timer values.
*
* */
function updateTimer() {

    if (!isOver(window.currPomTime)) {
        window.currPomTime--;
    } else {

        var tmpNextInterval = window.pomNextInterval;

        window.pomNextInterval = window.pomInterval;
        window.pomInterval = tmpNextInterval;

        if (window.pomInterval == window.Constants.INTERVAL_WORK) {
            window.currPomTime = window.pomWorkTime;
        } else if (window.pomInterval == window.Constants.INTERVAL_REST) {
            window.currPomTime = window.pomRestTime;
        } else {
            console.log("Problem in updateTimer()");
        }
    }

}

/*
* This function will handle everything associated with starting the pomodoro.
*
* */
function startPomodoro() {

    //Set up initial Interval states
    window.pomInterval = window.Constants.INTERVAL_WORK;
    window.pomNextInterval = window.Constants.INTERVAL_REST;

    //Switch state
    toggleState();

    //Activate countdown. Every 1000ms, update timer will be called. Also the interval ID is returned.
    window.intervalID = window.setInterval(updateTimer, 1000)

}

/*
* This function will handle everything associated with stopping the pomodoro.
* */
function stopPomodoro() {

    //Switch state
    toggleState();

    //Deactivate countdown
    clearInterval(window.intervalID);

}

/*
* This function will handle what happens if the action button is clicked
* */
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