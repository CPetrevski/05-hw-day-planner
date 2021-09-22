var currentDay = moment().format('dddd, MMMM Do');
var tasks = ["", "", "", "", "", "", "", "", ""];
var task = [ 
    {
        hour: "9AM",
        time: 9
    },
    {
        hour: "10AM",
        time: 10
    },
    {
        hour: "11AM",
        time: 11
    },
    {
        hour: "12PM",
        time: 12
    },
    {
        hour: "1PM",
        time: 13
    },
    {
        hour: "2PM",
        time: 14
    },
    {
        hour: "3PM",
        time: 15
    },
    {
        hour: "4PM",
        time: 16
    },
    {
        hour: "5PM",
        time: 17
    },
];


// Create the time blocks
function createTimeBlocks() {
  $(".container").empty();

  for (var i = 0; i < task.length; i++) {
    var taskContent = tasks[i];
    var hourName = task[i].hour;
    var presentHour = parseInt(moment().format("HH"));
    var thisHour = task[i].time;
    var inputElStyle = "";

    // assign css style's to rows based off current time.
    if (thisHour < presentHour) {
      inputElStyle = "past";
    } else {
      inputElStyle = "future";
    }
    if (thisHour === presentHour) {
      inputElStyle = "present";
    }
    // Add the elements to the container
    var timeBlockEl = $("<form>").attr("class", "input-group row");
    var hourContainer = $("<div>").attr("class", "col-1");
    var hourEl = $("<div>").attr("class", "hour").text(hourName).css("text-align", "right");
    var inputEl = $("<textarea>").attr("class", `form-control textarea ${inputElStyle}`).attr("type", "text").attr("id", "input" + i).val(taskContent);
    var buttonEl = $("<div>").attr("class", "input-group-append");
    var button = $("<button>").attr("class", "saveBtn").attr("data-index", i);
    var lockIcon = $("<i>").attr("class", "fas fa-save");

    // Add time block to the container.
    $(".container").append(timeBlockEl);
    button.append(lockIcon);
    buttonEl.append(button);
    hourContainer.append(hourEl);
    timeBlockEl.append(hourContainer).append(inputEl).append(buttonEl);
  }
}

// Save tasks in local storage
function storeTasks() {
    // Change the string to an array
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function store() {
    // Get tasks from local storage 
    var storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks !== null) {
    tasks = storedTasks;
    }
    createTimeBlocks();
}

$(document).ready(function() {

    store();
    // Todays date is set in the header.
    $("#currentDay").append(currentDay);
    $(".saveBtn").on("click", function(event) {
    event.preventDefault();
    var dataIndex = $(this).attr("data-index");
    var textInput = $(`#input${dataIndex}`).val();    
    // Add task to array
    tasks.splice(dataIndex, 1, textInput);
    storeTasks();
  });
})