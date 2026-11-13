/**
 * The only inline script the site ships.
 *
 * It runs before first paint and applies a previously chosen theme, so a
 * visitor who picked light while their OS is dark does not see a dark flash.
 * System preference itself needs no JavaScript — it is handled by the
 * `prefers-color-scheme` block in globals.css — so this script does nothing at
 * all until someone uses the toggle.
 *
 * Everything is wrapped in try/catch because localStorage throws, rather than
 * returning null, in a private window with site data blocked.
 *
 * Keep it small and keep it dependency-free: it runs before anything else on
 * every page load, and anything slow here is felt as a blank screen.
 */

export const THEME_STORAGE_KEY = 'ti-theme';

// prettier-ignore
export const THEME_SCRIPT = 'try{var t=localStorage.getItem("ti-theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}';
