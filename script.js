document.getElementById("parse-button").addEventListener("click", function () {
    const resumeUpload = document.getElementById("resume-upload");
    const parsedInfo = document.getElementById("parsed-info");
    const nameInfo = document.getElementById("name");
    const emailInfo = document.getElementById("email");
    const phoneInfo = document.getElementById("phone");

    const file = resumeUpload.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const resumeText = event.target.result;

            // Parse the resume text
            const parsedData = parseResume(resumeText);

            // Update the HTML elements with parsed data
            nameInfo.textContent = `Name: ${parsedData.name}`;
            emailInfo.textContent = `Email: ${parsedData.email}`;
            phoneInfo.textContent = `Phone: ${parsedData.phone}`;
            parsedInfo.style.display = "block";
        };
        reader.readAsText(file);
    }
});

function parseResume(text) {
    const parsedData = {
        name: extractName(text),
        email: extractEmail(text),
        phone: extractPhone(text)
    };
    return parsedData;
}

function extractName(text) {
    // Use NLP library like spaCy for more accurate name extraction
    // For simplicity, we'll use a basic pattern matching approach
    const namePattern = /([A-Z][a-z]+)\s+([A-Z][a-z]+)/;
    const match = text.match(namePattern);
    return match ? match[0] : "Name not found";
}

function extractEmail(text) {
    // Use regular expressions for email extraction
    const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b/;
    const match = text.match(emailPattern);
    return match ? match[0] : "Email not found";
}

function extractPhone(text) {
    // Use regular expressions for phone number extraction
    const phonePattern = /\+?\d{0,2}[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
    const match = text.match(phonePattern);
    return match ? match[0] : "Phone number not found";
}
