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

    //Which interval is the pomodoro currently in. Stopped if not running.
    window.pomodorInterval = window.pomodoroStateConstants.STOPPED;

    //The time currently being counted down from, -1 if pomodoro stopped
    window.currentPomodoroTime = -1;

    //Minutes that the Work phase of the pomodoro lasts
    window.pomodoroWorkTimeLength = 25;

    //Minutes that the Rest phase of the pomodoro lasts.
    window.pomodoroRestTImeLength = 5;

})();

/*
* This function will handle converting the current pomodoro running time to the label displayed in the HTML
*
* @param {Number} pomodoroRunningTime
* @return {String} label to be displayed on countdown counter.
*
* */
function pomodoroTimeToLabel(pomodoroRunningTime) {

}

/*
* This function will handle everything associated with switching state.
*
* */
function toggleState() {

    //Change state variable

    //Change button label

    //Change current pomodoro running time

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

    window.currentPomodoroTime--;

}

/*
* This function will handle everything associated with starting the pomodoro.
*
* */
function startPomodoro() {

    //Switch state

    //Activate countdown

}

/*
* This function will handle everything associated with stopping the pomodoro.
* */
function stopPomodoro() {

    //Switch state

    //Deactivate countdown

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