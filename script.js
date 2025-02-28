document.getElementById("generate-btn").addEventListener("click", function () {
    // Hide the Generate Resume button
    this.style.display = "none";

    // Get the selected template
    const selectedTemplate = document.getElementById("template").value;

    // Define the template path
    const templatePath = `/templates/${selectedTemplate}.html`;

    // Fetch the selected template
    fetch(templatePath)
        .then(response => response.text())
        .then(templateHTML => {
            // Populate the template with user data
            const filledTemplate = populateTemplate(templateHTML);

            // Insert the filled template into the generated resume section
            const resumeContainer = document.getElementById("generated-resume");
            resumeContainer.innerHTML = filledTemplate;
            resumeContainer.style.display = "block";

            // Hide the form
            document.querySelector(".input-form").style.display = "none";
        })
        .catch(error => console.error("Error loading template:", error));
});



// Function to populate template with user data
function populateTemplate(templateHTML) {
    // Get input values
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const aboutMe = document.getElementById("about-me").value;
    const skills = document.getElementById("skills").value.split(",");
    const experience = document.getElementById("experience").value;
    const education = document.getElementById("education").value;
    const linkedin = document.getElementById("linkedin").value;
    const github = document.getElementById("github").value;

    // Replace placeholders in the template
    return templateHTML
        .replace(/{{firstName}}/g, firstName)
        .replace(/{{lastName}}/g, lastName)
        .replace(/{{aboutMe}}/g, aboutMe)
        .replace(/{{skills}}/g, skills.map(skill => `<li>${skill.trim()}</li>`).join(""))
        .replace(/{{experience}}/g, experience)
        .replace(/{{education}}/g, education)
        .replace(/{{linkedin}}/g, `<a href="${linkedin}" target="_blank">LinkedIn</a>`)
        .replace(/{{github}}/g, `<a href="${github}" target="_blank">GitHub</a>`);
}
