/** The CMS is opt-in: with CMS_ENABLED unset the site renders exactly the static content and never touches Payload. */
export const cmsEnabled = () => process.env.CMS_ENABLED === "true";
