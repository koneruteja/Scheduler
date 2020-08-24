$("#currentDay").text(moment().format("dddd, MMMM Do YYYY")); // Display Date at the top

var timeAudit = function (taskEl) {
    var hour = taskEl.attr("id");
    var time = moment(hour, "HH a");

    taskEl.removeClass("past present future");

    if (moment().hour() === time.hour()) {
        taskEl.addClass("present");
    }
    else if (moment().isBefore(time)) {
        taskEl.addClass("future");
    }
    else {
        taskEl.addClass("past");
    }
}
//checking on page load
$(".task-box").each(function () {
    timeAudit($(this));
})

setInterval(function () {
    if (moment().minutes() === 0) { // for every hour
        $(".task-box").each(function () {
            timeAudit($(this));
        })
    }
}, (1000 * 60)) // Checking every minute

// Save on button click
$("i").on("click", function () {
    var taskId = $(this) 
        .closest(".row")
        .find(".task-box")
        .attr("id")
    var taskText = $(this)
        .closest(".row")
        .find(".task-box")
        .val()
    localStorage.setItem(taskId, taskText); 
});
// display on page load
$(".task-box").each(function () {
    var taskId = $(this).attr("id") 
    var savedTask = localStorage.getItem(taskId);
    $(this).val(savedTask)
})