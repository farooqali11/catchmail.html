 var myBookedEmail = localStorage.getItem("booked_email");
    if (myBookedEmail) {
      document.getElementById("booked_email_address").innerText =
        myBookedEmail;
    }

    document
      .getElementById("custom_domain_form")
      .addEventListener("submit", (e) => {
        e.preventDefault();

        let customDomain = document.getElementById("custom_domain").value;
        customDomain += "@catchmail.io";

        let api = `https://api.codetabs.com/v1/proxy?quest=https://api.catchmail.io/api/v1/mailbox?address=${customDomain}`;

        fetch(api)
          .then((res) => res.json())
          .then((resp) => {
            document.getElementById("booked_email_address").innerText =
              customDomain;
            localStorage.setItem("booked_email", customDomain);
            myBookedEmail = customDomain;

            let allEmails = resp.messages || [];
            let rows = "";

            allEmails.forEach((mail) => {
              rows += `
                <li>
                  <span>${mail.id} | ${mail.from} | ${mail.subject}</span>
                  <button onclick="openMyEmail('${mail.id}')">View</button>
                </li>
              `;
            });

            document.getElementById("list").innerHTML = rows;
          });
      });

    function openMyEmail(eid) {
      let api = `https://api.codetabs.com/v1/proxy?quest=https://api.catchmail.io/api/v1/message/${eid}?mailbox=${myBookedEmail}`;
      fetch(api)
        .then((res) => res.json())
        .then((resp) => {
          document.getElementById("currentEmail").innerHTML =
            resp.body.html || "No content available.";
        });
    }