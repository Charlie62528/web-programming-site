import re
from datetime import date


# ---- patterns (compiled once) ------------------------------------

STUDENT_ID = re.compile(r"^[0-9]{9}$")

FULLNAME = re.compile(r"^[A-Za-z][A-Za-z .'\-]{1,79}$")

EMAIL = re.compile(
    r"^[A-Za-z0-9_%+\-]+(?:\.[A-Za-z0-9_%+\-]+)*@net\.usek\.edu\.lb$",
    re.IGNORECASE
)

PHONE = re.compile(r"^\+961 [0-9]{2} [0-9]{6}$")

GITHUB = re.compile(
    r"^https://github\.com/"
    r"[A-Za-z0-9](?:[A-Za-z0-9]|-(?=[A-Za-z0-9])){0,38}/?$"
)

HTTPS_URL = re.compile(r"^https://[^\s/?#]+(?:[/?#][^\s]*)?$")

MONTH = re.compile(r"^[0-9]{4}-(?:0[1-9]|1[0-2])$")

TIME = re.compile(r"^(?:[01][0-9]|2[0-3]):[0-5][0-9]$")

HEXCOLOR = re.compile(r"^#[0-9A-Fa-f]{6}$")



# ---- allow-lists ------------------------------
MAJORS   = {
    "computer",
    "electrical",
    "telecommunications",
    "chemical",
    "mechanical",
    "civil",
    "industrial",
    "biomedical",
}
GRADUATION = {"spring", "summer", "fall"}
YESNO   = {"yes", "no"}
# Do the same for other fields: skills, software, project areas ...
SKILLS   = {
    "programming",
    "embedded systems",
    "electronics",
    "computer networks",
    "telecommunications",
    "biomedical instrumentation",
    "artificial intelligence / machine learning",
    "signal processing",
}
SOFTWARE = {
    "matlab",
    "simulink",
    "labview",
    "ltspice",
    "vivado",
    "solidworks",
    "gns3",
    "wireshark",
    "mplab",
    "picsimlab",
    "cisco packet tracer",
}

PROJECT_AREAS = {
    "artificial intelligence",
    "web application",
    "cybersecurity",
    "internet of things",
    "power systems",
    "renewable energy",
    "control systems",
    "medical imaging",
    "biosensors",
    "medical devices",
    "wireless communication",
    "5g / 6g network",
}


# Set of required fields (same names as in the HTML form)
REQUIRED = {
    "student_id",
    "fullname",
    "email",
    "major",
    "graduation",
    
   
}


def validate_profile(form):
 errors = {}   # field name -> error message
 cleaned = {}   # field name -> trusted value
  # ---1. Required fields: must be present and not blank -----------
 for field in REQUIRED:
    if form.get(field, "").strip() == "":
        errors[field] = "This field is required."

    # ---2. Student ID: exactly 9 digits
 student_id = form.get("student_id", "").strip()
 if student_id != "" and not STUDENT_ID.match(student_id):
    errors["student_id"] = "Student ID must be exactly 9 digits."
 cleaned["student_id"] = student_id


  # ---3. Full name: letters, spaces, hyphens, apostrophes,2 to 80 chars
 fullname = form.get("fullname", "").strip()
 if fullname != "" and not FULLNAME.match(fullname):
    errors["fullname"] = "Use letters, spaces, hyphens or apostrophes (2-80 chars)."
 cleaned["fullname"] = fullname

  # ---4. USEK email (we also lower-case it so it is stored consistently)
 email = form.get("email", "").strip().lower()
 if email != "" and not EMAIL.match(email):
    errors["email"] = "Use your USEK email (...@net.usek.edu.lb)."
 cleaned["email"] = email

  # ---5. Lebanese phone number
 phone = form.get("phone", "").strip()
 if phone != "" and not PHONE.match(phone):
    errors["phone"] = "Enter a valid Lebanese number, e.g. +961 70 123456."
 cleaned["phone"] = phone

  # ---6. Date of birth: a real date, not in the future, with a believable age
 birthdate = form.get("birthdate", "").strip()
 if birthdate != "":
    day = parse_date(birthdate)
    if day is None:
      errors["birthdate"] = "Not a valid date."
    elif day > date.today():
      errors["birthdate"] = "Date of birth cannot be in the future."
    else:
      age = (date.today() - day).days // 365
      if age < 15 or age > 100:
          errors["birthdate"] = "Age looks out of range."
 cleaned["birthdate"] = birthdate
  # ---7. GitHub link
 portfolio = form.get("portfolio", "").strip()
 if portfolio != "" and not GITHUB.match(portfolio):
    errors["portfolio"] = "Use a GitHub URL;  example: https://github.com/username"
 cleaned["portfolio"] = portfolio

  # ---8. GIN446 site link (any https:// link)
 gin446 = form.get("gin446", "").strip()
 if gin446 != "" and not HTTPS_URL.match(gin446):
    errors["gin446"] = "Enter a valid https:// link."
 cleaned["gin446"] = gin446


  # ---9. Major: must be one of the allowed majors
 major = form.get("major", "").strip().lower()
 if major != "" and major not in MAJORS:
    errors["major"] = "Choose a valid major."
 cleaned["major"] = major
  # ---10. GPA: a number between 40 and 100
 gpa = form.get("gpa", "").strip()
 if gpa != "":
    number = to_number(gpa)
    if number is None or number < 40 or number > 100:
      errors["gpa"] = "GPA must be a number between 40 and 100."
 cleaned["gpa"] = gpa

  # ---11. Credits: a whole number between 0 and 148 
 credits = form.get("credits", "").strip()
 if credits != "":
        number = to_number(credits)
        if (
            number is None
            or not 0 <= number <= 148
            or number != int(number)
        ):
            errors["credits"] = (
                "Credits must be a whole number between 0 and 148."
            )
 cleaned["credits"] = credits

  # ---12. Expected graduation: spring / summer / fall
 graduation = form.get("graduation", "").strip().lower()
 if graduation != "" and graduation not in GRADUATION:
    errors["graduation"] = "Choose spring, summer or fall."
 cleaned["graduation"] = graduation


  # ---13. Graduation month: shape YYYY-MM
 graduation_month = form.get("graduation_month", "").strip()
 if graduation_month != "" and not MONTH.match(graduation_month):
    errors["graduation_month"] = "Use the month picker (YYYY-MM)."
 cleaned["graduation_month"] = graduation_month

  #---14. Internship completed: yes / no
 internship_completed = form.get("internship_completed", "").strip().lower()
 if internship_completed != "" and internship_completed not in YESNO:
    errors["internship_completed"] = "Choose yes or no."
 cleaned["internship_completed"] = internship_completed
 
 #---15. Primary language: free text, but keep it shor
 language=form.get("language", "").strip()
 if language != "" and len(language) > 40:
    errors["language"] = "Keep it under 40 characters."
 cleaned["language"] = language   

  
 #---16. Skills: checkboxes -> a list. Keep only values we recognise.
 skills = form.getlist("skills")
 good_skills = []
 bad_skills = []
 for skill in skills:
    skill = skill.strip().lower()
    if skill in SKILLS:
      good_skills.append(skill)
    else:
      bad_skills.append(skill)
 if bad_skills:
    errors["skills"] = "Unknown skill(s): " + ", ".join(bad_skills)
 cleaned["skills"] = good_skills

  #---17. Software: multi-select -> a list. Same idea as skills.
 softwares = form.getlist("software")
 good_softwares = []
 bad_softwares = []
 for software in softwares:
    software = software.strip().lower()
    if software in SOFTWARE:
      good_softwares.append(software)
    else:
      bad_softwares.append(software)
 if bad_softwares:
    errors["software"] = "Unknown software(s): " + ", ".join(bad_softwares)
 cleaned["software"] = good_softwares


  #---18. Project title: at most 120 characters

 project_title=form.get("project_title", "").strip()
 if project_title != "" and len(project_title) > 120:
    errors["project_title"] = "Title must be 120 characters or fewer."
 cleaned["project_title"] = project_title
 

  #---19. Project area: must be one of the allowed areas
 project_area=form.get("project_area", "").strip().lower()
 if project_area != "" and project_area not in PROJECT_AREAS:
    errors["project_area"] = "Choose a valid project area."
 cleaned["project_area"] = project_area

  #---20. Description: at most 1000 characters
 description=form.get("description", "").strip()
 if description != "" and len(description) > 1000:
    errors["description"] = "Description must be 1000 characters or fewer."
 cleaned["description"] = description


 #---21. Team size: a whole number from 1 to 4
 team_size = form.get("team_size", "").strip()
 if team_size != "":
    number = to_int(team_size)
    if number is None or number < 1 or number > 4:
      errors["team_size"] = "Team size must be a whole number from 1 to 4."
 cleaned["team_size"] = team_size

  #---22. Dashboard color: a hex colour like #336699 (default if left empty)
 project_color = form.get("project_color", "").strip()
 if project_color != "" and not HEXCOLOR.match(project_color):
    errors["project_color"] = "Use a colour like #336699."
 if project_color == "":
    project_color = "#336699"
 cleaned["project_color"] = project_color

  #---23. Meeting date: a real date

 meeting_date = form.get("meeting_date", "").strip()
 if meeting_date != "": 
   day = parse_date(meeting_date)
   if day is None:
     errors["meeting_date"] = "Not a valid date."
   cleaned["meeting_date"] = meeting_date


    # ---24. Meeting time: HH:MM, between 08:00 and 18:00
 meeting_time = form.get("meeting_time", "").strip()

 if meeting_time != "":
        if not TIME.fullmatch(meeting_time):
            errors["meeting_time"] = "Use HH:MM."
        elif meeting_time < "08:00" or meeting_time > "18:00":
            errors["meeting_time"] = (
                "Pick a time between 08:00 and 18:00."
            )

 cleaned["meeting_time"] = meeting_time


  # Done: hand back the problems and the trusted values.
    # ---25. Confirmation
 confirmation = form.get("confirmation", "")

 if confirmation != "on":
        errors["confirmation"] = (
           
            "You must confirm the information is accurate. "
        )

 cleaned["confirmation"] = confirmation == "on"

 return errors, cleaned


def to_number(text):
    try:
       return float(text)
    except ValueError:
       return None


def parse_date(text):
 try:
  return date.fromisoformat(text)
    # ISO YYY-MM-DD  
 except ValueError:
  return None


 
def to_int(text):
    try:
        return int(text)
    except ValueError:
        return None
