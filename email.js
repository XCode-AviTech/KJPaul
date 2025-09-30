 // Form submission
    document.getElementById('myForm').addEventListener('submit', function (event) {
      event.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value || "No Subject";
      const message = document.getElementById('message').value;

      if (localStorage.getItem('formSubmitted') === 'true') {
        showNotification("⚠️ Message has already been sent.", "error");
        return;
      }

      emailjs.send("service_jqcehol", "template_2wjlx0a", {
        name: name,
        email: email,
        subject: subject,
        message: message,
        time: new Date().toLocaleString()
      }).then(function (response) {
        localStorage.setItem('formSubmitted', 'true');
        document.getElementById('myForm').reset();

        showNotification("✅ Message sent successfully!", "success");
        console.log('Success:', response);

      }, function (error) {
        showNotification("❌ Failed to send message. Try again later.", "error");
        console.log('Error:', error);
      });
    });

    // Reset localStorage on page reload
    window.addEventListener('beforeunload', function () {
      localStorage.removeItem('formSubmitted');
    });