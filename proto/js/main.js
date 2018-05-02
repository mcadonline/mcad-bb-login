function loadLoginPage() {
  if (top != self) {
    top.location.replace(self.location.href);
  }
  if (document.forms.login.user_id != undefined) {
    document.forms.login.user_id.focus();
  }
  setTimeout("triggerScreenreaderAlert()", 500);
}

function triggerScreenreaderAlert() {
  if (document.getElementById("loginErrorMessage")) {
    $("loginErrorMessage").update($("loginErrorMessage").innerHTML);
  }
}

// MCAD Login Specific Stuff Below

// fires fn when document is in ready state
function ready(fn) {
  if (document.readyState != "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

function setPlaceholder(selector, placeholderVal) {
  document.querySelector(selector).setAttribute("placeholder", placeholderVal);
}

function handleAuxLoginToggle() {
  const container = document.querySelector("#mcad-login-page");
  const toggleButton = document.querySelector(".js-toggle-aux-login");
  toggleButton.addEventListener("click", event => {
    event.preventDefault();
    container.classList.toggle("aux-login-is-open");
  });
}

function init() {
  setPlaceholder("#user_id", "Username");
  setPlaceholder("#password", "Password");
  handleAuxLoginToggle();
  console.log("ready");
}

// fire off init when doc is ready
ready(init);
