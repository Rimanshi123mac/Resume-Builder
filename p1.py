from flask import Flask, render_template, request
import os

app = Flask(__name__, template_folder='template')

# Ensure the directory exists for storing photos
if not os.path.exists('static/photos'):
    os.makedirs('static/photos')

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # Retrieve form data
        first_name = request.form.get('first-name')
        last_name = request.form.get('last-name')
        email = request.form.get('email')
        phone = request.form.get('contact-number')
        about_me = request.form.get('about-me')
        skills = request.form.get('skills').split(',')
        soft_skills = request.form.get('soft-skills').split(',')
        experience = request.form.get('experience')
        education = request.form.get('education')
        #myproj = request.form.get('myproj')
        linkedin = request.form.get('linkedin')
        github = request.form.get('github')
        photo = request.files.get('photo')
        template = request.form.get('template')

        # Save photo if uploaded
        photo_filename = None
        if photo:
            photo_filename = f"static/photos/{photo.filename}"
            photo.save(photo_filename)

        # Return the selected template with the collected data
        return render_template(
            f'{template}.html',  # Use the selected template
            first_name=first_name,
            last_name=last_name,
            email=email,
            phone=phone,
            about_me=about_me,
            skills=skills,
            soft_skills=soft_skills,
            experience=experience,
            #project=project
            education=education,
            linkedin=linkedin,
            github=github,
            photo_filename=photo_filename
        )
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)