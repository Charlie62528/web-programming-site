const form=document.querySelector("form");
const reviewPanel=document.querySelector("#reviewPanel");
const reviewContent=document.querySelector("#reviewContent");
form.addEventListener("submit",function(event){
    event.preventDefault();
       
if(!form.checkValidity()){
    form.reportValidity();
    return;
}

const id = document.getElementById("student_id").value;
const fullname = document.getElementById("fullname").value;
const email = document.getElementById("email").value;
const mobile = document.getElementById("phone").value;
const dateofbirth = document.getElementById("birthdate").value;
const github = document.getElementById("portfolio").value;
const render = document.getElementById("gin446").value;

const major = document.getElementById("major").value;
const gpa = document.getElementById("gpa").value;
const credits = document.getElementById("credits").value;
const graduation = document.querySelector('input[name="graduation"]:checked').value;
const graduationMonth = document.getElementById("graduation_month").value;
const internship = document.querySelector('input[name="internship_completed"]:checked').value;

const skills = [...document.querySelectorAll('input[name="skills"]:checked')]
    .map(cb => cb.value);

const language = document.getElementById("language").value;

const software = [...document.getElementById("software").selectedOptions]
    .map(opt => opt.value);

const projectTitle = document.getElementById("project_title").value;
const projectArea = document.getElementById("project_area").value;
const description = document.getElementById("description").value;
const teamSize = document.getElementById("team_size").value;
const projectColor = document.getElementById("project_color").value;
const meetingDate = document.getElementById("meeting_date").value;
const meetingTime = document.getElementById("meeting_time").value;

const confirmation = document.getElementById("confirmation").checked;

reviewContent.textContent =
    "PERSONAL INFORMATION\n" +
    "Student ID: " + id + "\n" +
    "Full Name: " + fullname + "\n" +
    "Email: " + email + "\n" +
    "Mobile Number: " + mobile + "\n" +
    "Date of Birth: " + (dateofbirth || "Not provided") + "\n" +
    "GitHub: " + (github || "Not provided") + "\n" +
    "GIN446 Website: " + (render || "Not provided") + "\n\n" +

    "ACADEMIC INFORMATION\n" +
    "Engineering Major: " + major + "\n" +
    "GPA: " + gpa + "\n" +
    "Credits Completed: " + credits + "\n" +
    "Expected Graduation: " + graduation + "\n" +
    "Graduation Month: " + graduationMonth + "\n" +
    "Internship Completed: " + internship + "\n\n" +

    "TECHNICAL BACKGROUND\n" +
    "Skills: " + (skills.join(", ") || "None selected") + "\n" +
    "Primary Programming Language: " + language + "\n" +
    "Engineering Software: " + (software.join(", ") || "None selected") + "\n\n" +

    "FINAL YEAR PROJECT\n" +
    "Project Title: " + projectTitle + "\n" +
    "Project Area: " + projectArea + "\n" +
    "Description: " + description + "\n" +
    "Team Size: " + teamSize + "\n" +
    "Project Color: " + projectColor + "\n" +
    "Meeting Date: " + meetingDate + "\n" +
    "Meeting Time: " + meetingTime + "\n\n" +

    "CONFIRMATION\n" +
    "Information Confirmed: " + (confirmation ? "Yes" : "No");




form.hidden=true;
reviewPanel.classList.add("open");
});

const editButton=document.querySelector("#editButton");
editButton.addEventListener("click",function(){
    form.hidden=false;
    reviewPanel.classList.remove("open");
});

const submitButton=document.querySelector("#confirmButton");

submitButton.addEventListener("click",function(){
    form.submit();
}); 
