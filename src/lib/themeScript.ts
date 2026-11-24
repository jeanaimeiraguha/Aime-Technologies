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
export const ANNOUNCE_STORAGE_KEY = 'ti-announce-dismissed';

/**
 * The script also applies the announcement strip's dismissed state.
 *
 * The strip sits in the flow above the header, so whether it is there changes
 * where the page starts. Deciding that in React meant the server rendered
 * nothing and hydration then pushed the whole page down by the height of the
 * strip. Rendering it on the server and removing it here — before paint —
 * costs no layout shift either way.
 */
// prettier-ignore
export const THEME_SCRIPT = 'try{var d=document.documentElement,t=localStorage.getItem("ti-theme");if(t==="light"||t==="dark")d.setAttribute("data-theme",t);if(localStorage.getItem("ti-announce-dismissed")==="1")d.setAttribute("data-announce","off")}catch(e){}';
