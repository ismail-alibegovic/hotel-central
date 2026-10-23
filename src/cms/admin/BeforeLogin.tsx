/** Short welcome above the sign-in form. Plain language only: no mention of the underlying technology. */
export function BeforeLogin() {
  return (
    <div className="hc-login-intro">
      <h1>Welcome</h1>
      <p>Sign in to edit the Hotel Central website: rooms, texts, photos and offers.</p>
    </div>
  );
}

/** Help under the sign-in form. */
export function AfterLogin() {
  return (
    <p className="hc-login-help">
      Trouble signing in or forgot your password? Ask the website administrator. An account is locked for a few minutes after several wrong attempts.
    </p>
  );
}
