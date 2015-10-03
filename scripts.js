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
    window.pomodoroStateConstants = {
        STOPPED : "The pomodoro is stopped",
        RUNNING : "The pomodoro is running",
        RUNNING_WORK: "The pomodoro is in work mode",
        RUNNING_REST: "The pomodoro is in rest mode"
    };

    //What state is the pomodoro currently in.
    window.pomodoroState = window.pomodoroStateConstants.STOPPED;

    //Which interval is the pomodoro currently in.
    window.pomodorInterval = undefined;

    //Next pomodoro interval
    window.pomodorNextInterval = undefined;

    //The time currently being counted down from, -1 if pomodoro stopped
    window.currentPomodoroTime = -1;

    //Minutes that the Work phase of the pomodoro lasts
    window.pomodoroWorkTimeLength = 25;

    //Minutes that the Rest phase of the pomodoro lasts.
    window.pomodoroRestTImeLength = 5;

    //This ID will be used to reference the interval running the timer
    window.intervalID = undefined;

})();

/*
* This function will handle converting the current pomodoro running time to the label displayed in the HTML
*
* @param {Number} pomodoroRunningTime
* @return {String} label to be displayed on countdown counter.
*
* */
function pomodoroTimeToLabel(pomodoroRunningTime) {
    return pomodoroRunningTime;
}

/*
* This function will handle everything associated with switching state.
*
* */
function toggleState() {

    //Select the DOM element (HTML tag) with the id display.
    var actionButton = document.getElementById("actionButton");

    //Change state variables
    if (window.pomodoroState == window.pomodoroStateConstants.STOPPED) {

        window.pomodoroState = window.pomodoroStateConstants.RUNNING;

        //Change current pomodoro running time
        window.currentPomodoroTime = window.pomodoroWorkTimeLength;

        //Change button label
        actionButton.textContent = "Stop Pomodoro";

    } else if (window.pomodoroState == window.pomodoroStateConstants.RUNNING) {

        window.pomodoroState = window.pomodoroStateConstants.STOPPED;

        //Change current pomodoro running time
        window.currentPomodoroTime = -1;

        //Change button label
        actionButton.textContent = "Start Pomodoro"

    } else {
        alert("Problem is toggleState()");
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

    if (!isOver(window.currentPomodoroTime)) {
        window.currentPomodoroTime--;
    } else {

        var tmpNextInterval = window.pomodorNextInterval;

        window.pomodorNextInterval = window.pomodorInterval;
        window.pomodorInterval = tmpNextInterval;

        console.log(window.pomodorNextInterval);

        if (window.pomodorNextInterval == window.pomodoroStateConstants.RUNNING_WORK) {
            window.currentPomodoroTime = window.pomodoroWorkTimeLength;
        } else if (window.pomodorNextInterval == window.pomodoroStateConstants.RUNNING_REST) {
            window.currentPomodoroTime = window.pomodoroRestTImeLength;
        } else {
            alert("Problem in updateTimer()");
        }
    }

    document.getElementById("display").textContent = pomodoroTimeToLabel(window.currentPomodoroTime);

}

/*
* This function will handle everything associated with starting the pomodoro.
*
* */
function startPomodoro() {

    //Set up initial Interval states
    window.pomodorInterval = window.pomodoroStateConstants.RUNNING_WORK;
    window.pomodorNextInterval = window.pomodoroStateConstants.RUNNING_REST;

    //Switch state
    toggleState();

    //Activate countdown. Every 1000ms, update timer will be called. Also the interval ID is returned.
    window.intervalID = window.setInterval(function() {
        updateTimer();
    }, 1000)

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
    var state = window.pomodoroState;

    if (state == window.pomodoroStateConstants.STOPPED) {
        startPomodoro();
    } else if (state == window.pomodoroStateConstants.RUNNING) {
        stopPomodoro();
    } else {
        alert("Oops, something went wrong..");
    }
}