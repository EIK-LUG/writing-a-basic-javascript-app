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
        RUNNING : "The pomodoro is running"
    };

    //What state is the pomodoro currently in.
    window.pomodoroState = window.pomodoroStateConstants.STOPPED;

    //The time currently being counted down from, -1 if pomodoro stopped
    window.currentPomodoroTime = -1;

    //Minutes that the Work phase of the pomodoro lasts
    window.pomodoroWorkTimeLength = 25;

    //Minutes that the Rest phase of the pomodoro lasts.
    window.pomodoroRestTImeLength = 5;

})();

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