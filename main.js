/* FORM */

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

let fullName = urlParams.has('fullname') ? urlParams.get('fullname') : null;
let title = urlParams.has('title') ? urlParams.get('title') : null;
let phone = urlParams.has('phone') ? urlParams.get('phone') : null;
let ext = urlParams.has('ext') ? urlParams.get('ext') : null;
let email = urlParams.has('email') ? urlParams.get('email') : null;

const fullNameInput = document.getElementById('form-fullname');
const titleInput = document.getElementById('form-title');
const phoneInput = document.getElementById('form-phone');
const extInput = document.getElementById('form-ext');
const emailInput = document.getElementById('form-email');

$(document).ready(function(){
    $(phoneInput).inputmask({"mask" : "(999) 999-9999", "placeholder" : "(###) ###-####", "clearMaskOnLostFocus": true, "showMaskOnHover" : false});
    $(extInput).inputmask({"mask" : "999", "placeholder" : "###", "clearMaskOnLostFocus": true, "showMaskOnHover" : false});
});

/* SIGNATURE */

const sigFullName = document.getElementById('sig-fullname');
const sigTitle = document.getElementById('sig-title');
const sigPhone = document.getElementById('sig-phone');
const sigEmail = document.getElementById('sig-email');

const sigPhoneLink = document.getElementById('sig-phone-link');
const sigEmailLink = document.getElementById('sig-email-link');


// Modify signature and add values back to form inputs

if (fullName) {
    fullNameInput.setAttribute("value", fullName);
    sigFullName.innerHTML = fullName;
}

if (title) {
    titleInput.setAttribute("value", title);
    sigTitle.innerHTML = `${title},`;
}

if (phone) {
    phoneInput.setAttribute("value", phone);
    sigPhoneLink.setAttribute("href", `tel:${phone}`)
    if (ext) {
        sigPhone.innerHTML = `${phone} EXT ${ext}`
    } else {
        sigPhone.innerHTML = phone;
    }
} else {
    sigPhone.innerHTML = "(855) 786-7655";
    sigPhoneLink.setAttribute("href", "tel:(855) 786-7655")
}

if (ext) {
    extInput.setAttribute("value", ext);
}

if (email) {
    emailInput.setAttribute("value", email);
    sigEmail.innerHTML = email;
    sigEmailLink.setAttribute("href", `mailto:${email}`)
}

/* COPY LOGIC */

function messageTimer(id) {
    setTimeout(function() {
        document.getElementById(id).remove();
    }, 4000)
}

const messagesContainer = document.getElementById("messages");

function copySuccess() {
    let successCount = 0;
    successCount++;
    let successID = `success${successCount}`;

    const successMessage = document.createElement("div");
    const successPara = document.createElement("p");
    const successText = document.createTextNode("Signature Copied to Clipboard");

    successMessage.classList.add('message--success');
    successMessage.classList.add('message');
    successMessage.setAttribute('id', successID);
    successPara.appendChild(successText)
    successMessage.appendChild(successPara);

    messagesContainer.appendChild(successMessage);
    messageTimer(successID);
}

function copyFailure(err) {
    console.log(err);

    let failureCount = 0;
    failureCount++;
    let failureID = `failure${failureCount}`;

    const failureMessage = document.createElement("div");
    const failurePara = document.createElement("p");
    const failureText = document.createTextNode("Unable to Copy Signature");

    failureMessage.classList.add('message--failure');
    failureMessage.classList.add('message');
    failureMessage.setAttribute('id', failureID)
    failurePara.appendChild(failureText)
    failureMessage.appendChild(failurePara);

    messagesContainer.appendChild(failureMessage);
    messageTimer(failureID);
}

function setClipboard() {
    try {
        const signature = document.getElementById('sig').innerHTML;
        let blob = new Blob( [signature], { type: "text/html" } );
        let data = new ClipboardItem({ "text/html" : blob });

        navigator.clipboard.write([data]).then(
            function () {
                copySuccess();
            }, function (err) {
                copyFailure(err);
            }
        );

    } catch(e) {
        console.log(e);
    }
}

function setClipboardHTML() {
    try {
        const signatureHTML = document.getElementById('sig').innerHTML;
        let blob = new Blob( [signatureHTML], { type: "text/plain" } );
        let data = new ClipboardItem({ "text/plain" : blob });

        navigator.clipboard.write([data]).then(
            function () {
                copySuccess();
            }, function (err) {
                copyFailure(err);
            }
        );

    } catch(e) {
        console.log(e);
    }
}

const copyButtonRichHTML = document.getElementById("btn-copy-richhtml");
const copyButtonHTML = document.getElementById("btn-copy-html");

copyButtonRichHTML.addEventListener("click", setClipboard);
copyButtonHTML.addEventListener("click", setClipboardHTML);

/* TOOLTIP LOGIC */

const titleTooltip = document.getElementById("title-tooltip");
titleInput.addEventListener("focusin", function(){titleTooltip.classList.remove("visually-hidden")});
titleInput.addEventListener("focusout", function(){titleTooltip.classList.add("visually-hidden")});



