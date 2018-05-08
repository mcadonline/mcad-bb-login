<%@ include file="/webapis/ui/doctype.jspf" %>

<%@ taglib uri="/bbNG" prefix="bbNG" %>
<%@ taglib uri="/bbUI" prefix="bbUI" %>
<%@ taglib uri="/loginUI" prefix="loginUI" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<c:set var="productName" value="${ loginUI:getProductName() }" />

<%--
This is a standard wrapper for all AS pages.  It is recommended that you keep this tag.
--%>
<bbNG:genericPage authentication="N" wrapper="false" onLoad="loadLoginPage()" bodyClass="login-page" globalNavigation="false">

  <%@ include file="/webapis/ui/cookie-disclosure-login.jspf"%>

    <bbNG:jsBlock>
      <script type="text/javascript">
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
      if (document.getElementById('loginErrorMessage')) {
        $('loginErrorMessage').update($('loginErrorMessage').innerHTML);
      }
    }

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


      </script>
    </bbNG:jsBlock>

    <%--
If you need to customize styles defined in login.css, you can place your changes
within the following <style> block.  The JSP comment markers surrounding the <bbNG:cssBlock> element
must be removed before the changes will take effect.
--%>

      <bbNG:cssBlock>
        <style type="text/css">
html {
  box-sizing: border-box;
  height: 100%;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

:root {
  --inactive-color: #888;
  --placeholder-color: #444;
  --focus-border-color: #fff;
  --login-button-color: #fff;
  --sans-font-family: "Helvetica Neue", sans-serif;
  --frame-color: #fff;
  --max-width: 32em;
}

body {
  min-height: 100%;
  background: linear-gradient(-180deg, #ff5656 2%, #df9870 47%, #51def0 100%)
    no-repeat fixed;
}

body.login-page {
  min-height: 100%;
}

#mcad-login-page {
  min-height: 100%;
  font-size: 16px;
  line-height: 1.4;
  font-family: var(--sans-font-family);
  font-weight: 200;
  /* using raw git rather than relative urls */
  background: url("https://cdn.rawgit.com/mcadonline/mcad-bb-login/develop/proto/img/circle-polygon-bg.svg")
      no-repeat 90% 90%,
    /* lines left svg */
      url("https://cdn.rawgit.com/mcadonline/mcad-bb-login/develop/proto/img/lines-left-bg.svg")
      no-repeat left 100%,
    url("https://cdn.rawgit.com/mcadonline/mcad-bb-login/develop/proto/img/lines-right-bg.svg")
      no-repeat right top,
    url("https://cdn.rawgit.com/mcadonline/mcad-bb-login/develop/proto/img/tri-bg.svg")
      no-repeat 20% 40%;
  color: #fff;
}

#mcad-login-page a {
  color: #fff;
}

#mcad-login-page h1 {
  padding-top: 5rem;
  font-weight: 200;
  margin: 0.25em;
}

#mcad-login-page ul {
  list-style-type: none;
}

/* .brand-frame */

#mcad-login-page .brand-frame {
  font-family: var(--sans-font-family);
  line-height: 1;
  width: 90%;
  margin: 0 5%;
  border-bottom: 1px solid var(--frame-color);
  padding: 1em;
  text-align: center;
  text-transform: uppercase;
  font-weight: 400;
  color: var(--frame-color);
}

#mcad-login-page .brand-frame svg {
  margin: 0 0.33em;
}

#mcad-login-page .brand-frame svg g {
  fill: var(--frame-color);
}

#mcad-login-page .page-heading,
#mcad-login-page .page-subheading {
  text-align: center;
  font-weight: 100;
  line-height: 1;
  margin: 1rem;
}

#mcad-login-page .page-heading {
  font-size: 5.1em;
}

#mcad-login-page .page-subheading {
  font-size: 1.5em;
  margin-bottom: 2em;
}

#mcad-login-page .mcad-login-form {
  padding: 1rem;
  max-width: 25rem;
  margin: auto;
}

#mcad-login-page #loginFormList {
  padding: 0;
}

#loginFormTitle,
#loginFormText {
  /* visually hidden */
  position: absolute !important;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
  clip: rect(1px, 1px, 1px, 1px);
}

#mcad-login-page input {
  display: block;
  width: 100%;
  color: white;
  font-weight: 100;
  font-size: 1.5rem;
  max-width: 25rem;
  padding: 0.5rem 0;
  border: none;
  border-bottom: 0.125rem solid var(--inactive-color);
  margin: 1em 0;
  background: transparent;
  border-radius: 0;
}

#mcad-login-page input:focus {
  outline: none;
  border-color: var(--focus-border-color);
}

#mcad-login-page [type="submit"],
#mcad-login-page .button,
/* SSO Login Button */
#mcad-login-page #loginRedirectProviderList > li > a {
  background-color: transparent;
  font-weight: 300;
  color: var(--login-button-color);
  font-size: 1.5rem;
  letter-spacing: 0.25rem;
  border: 0.125rem solid var(--login-button-color);
  margin: 1rem 0;
  padding: 1rem;
  display: block;
  width: 100%;
  text-align: center;
  text-transform: uppercase;
  border-radius: 0;
  text-decoration: none;
}

#mcad-login-page [type="submit"] {
  margin-top: 3rem;
}

#mcad-login-page [type="submit"]:hover,
#mcad-login-page .button:hover {
  background-color: var(--login-button-color);
  color: #555;
}

#mcad-login-page [type="submit"]:active,
#mcad-login-page .button:active {
  background-color: #fff;
}

/* new window text */
#mcad-login-page .hideoff {
  display: none;
}

/* placeholders */

::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  color: var(--placeholder-color);
}

::-moz-placeholder {
  /* Firefox 19+ */
  color: var(--placeholder-color);
}

:-ms-input-placeholder {
  /* IE 10+ */
  color: var(--placeholder-color);
}

:-moz-placeholder {
  /* Firefox 18- */
  color: var(--placeholder-color);
}

/* forgot-password link */

#mcad-login-page .forgot {
  display: block;
  font-size: 0.8em;
  text-align: right;
}

#mcad-login-page .forgot a {
  display: inline-block;
  color: var(--inactive-color);
  text-decoration: none;
  border-bottom: 0.125rem solid var(--inactive-color);
}

#mcad-login-page .forgot a:hover,
#mcad-login-page .forgot a:active {
  color: #fff;
}

/* Errors */

#loginErrorMessage {
  background: transparent;
  border: 0;
  max-width: 23em;
  margin: auto;
  font-weight: 300;
  color: #fff;
  font-style: italic;
}

/* Login Page Announcements */

#loginAnnouncements {
  padding: 4rem 0;
  width: 90%;
  max-width: 40rem;
  margin: auto;
}

#loginAnnouncements h3 {
  display: none;
}

#loginAnnouncements li {
  background: #fff;
  color: #333;
  border-left: 0.25rem solid #51def0;
  text-align: left;
  font-size: 1rem;
  padding: 1rem;
}

/* Bb Announcement Heading ... crazy, right? */
#loginAnnouncements ul li > strong:first-child {
  font-weight: 300;
  font-size: 1.5rem;
  line-height: 1.2;
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
}

#loginAnnouncements .announcementDate {
  color: #666;
  font-size: 0.9rem;
}

#loginAnnouncements a {
  border-bottom: none;
}

#loginAnnouncements ul {
  width: auto;
  padding: 0;
}

#loginAnnouncements ul li .vtbegenerated strong:first-child {
  color: #333;
}

#loginAnnouncements .vtbegenerated {
  margin: 0 !important;
}

#loginAnnouncements .announcementDate {
  display: none;
}

.is-hidden {
  display: none;
}

#loginFormList label {
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
}

/* SSO */
#mcad-login-page #redirectProvidersDropdownButton {
  display: none;
}
#mcad-login-page #loginRedirectProviders {
  margin: auto;
  width: auto;
}

#mcad-login-page #loginRedirectProviderList {
  display: block;
  background: none;
  border: none;
  box-shadow: none;
  border-radius: 0;
  padding: 0;
  position: static;
}

#mcad-login-page #loginRedirectProviderList .defaultProviderIcon {
  display: none;
}

/* Toggle Login form (and SSO button off) */
#mcad-login-page .js-toggle-aux-login {
  text-decoration: none;
  font-size: 2rem;
  color: #fff;
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 1000;
  display: inline-block;
  padding: 1rem;
  transition: transform 0.3s ease;
}

/* by default, do not display
   the login form, only the SSO button */
#mcad-login-page .mcad-login-form form {
  display: none;
}

#mcad-login-page.aux-login-is-open .js-toggle-aux-login {
  transform: rotate(45deg);
  color: #fff;
}

#mcad-login-page.aux-login-is-open {
  background: #171717;
}

#mcad-login-page.aux-login-is-open .mcad-login-form form {
  display: block;
}

#mcad-login-page.aux-login-is-open #loginRedirectProviderList {
  display: none;
}

@media (max-width: 33em) {
  #mcad-login-page {
    background: url("https://cdn.rawgit.com/mcadonline/mcad-bb-login/develop/proto/img/lines-left-bg.svg")
        no-repeat left 100%,
      url("https://cdn.rawgit.com/mcadonline/mcad-bb-login/develop/proto/img/lines-right-bg.svg")
        no-repeat right top;
  }
  #mcad-login-page .page-heading {
    font-size: 4.5em;
    margin: 0;
  }
  #mcad-login-page .page-subheading {
    font-size: 1.33em;
    margin-top: 0.5rem;
  }
  #mcad-login-page .button {
    max-width: 20rem;
    margin: auto;
  }
  #loginErrorMessage {
    max-width: 20em;
  }
  #mcad-login-page [type="submit"],
  #mcad-login-page .button,
  /* SSO Login Button */
  #mcad-login-page #loginRedirectProviderList > li > a {
    font-size: 1.25rem;
  }
}

@media (max-width: 20em) {
  #mcad-login-page .page-heading {
    font-size: 3.45em;
    padding-top: 2rem;
    margin-bottom: 0;
  }
  #mcad-login-page .page-subheading {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
  #mcad-login-page.aux-login-is-open .page-subheading {
    /* hide text and replace with below */
    text-indent: -999em;
  }
  #mcad-login-page.aux-login-is-open .page-subheading:after {
    text-indent: 0;
    content: "Administrative Login";
    display: block;
    color: yellow;
  }

  #loginAnnouncements {
    padding: 1rem 0;
  }
}

/* Override 14px font-size in body */
@media only screen and (max-width: 1024px) and (min-width: 737px) {
  body {
    font-size: 16px;
  }
}
  </style>
</bbNG:cssBlock>

      <div id="mcad-login-page">
        <div class="brand-frame">
          MCAD
          <svg width="12px" height="12px" viewBox="0 0 230 230" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <!-- THE MCAD X -->
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="Artboard" fill="#FFF">
                <path d="M155.910363,135.2942 L230,209.383836 L209.7058,230 L135.616164,155.910363 L155.910363,135.2942 L155.910363,135.2942 Z M209.7058,8.52651283e-14 L230,20.2941999 L155.910363,94.3838364 L135.616164,74.0896365 L209.7058,8.52651283e-14 L209.7058,8.52651283e-14 Z M20.6161636,8.52651283e-14 L135.616164,115 L20.6161636,229.67827 L0.322196769,209.383836 L94.3838364,115 L0,20.2941999 L20.6161636,8.52651283e-14 L20.6161636,8.52651283e-14 Z"
                  id="MCAD_X_Logo"></path>
              </g>
            </g>
          </svg>
          Online Learning
        </div>
        <!-- .mcad-brand-frame -->

    <!-- Page Heading -->
    <h1 class="page-heading">Blackboard</h1>
    <h2 class="page-subheading">Minneapolis College of Art and Design</h2>
    <div class="mcad-login-container">
      <a href="#!" class="js-toggle-aux-login">+</a>

      <loginUI:errorMessage />
      <div class="mcad-login-form">
        <loginUI:loginForm />
      </div>
    </div><!-- .mcad-login-container -->

    <div class="mcad-system-announcements">
      <loginUI:systemAnnouncements maxItems="5" />
    </div>
  </div><!-- #mcad-login-page -->
</bbNG:genericPage>