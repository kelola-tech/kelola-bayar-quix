import validateScript from "./validateScript";

export default function getClientKey(els: HTMLCollectionOf<HTMLScriptElement>) {
  for (var res: HTMLScriptElement, el = 0; el < els.length; el++) {
    validateScript(els[el].src) && (res = els[el]);
  }
  return (res && res.getAttribute("data-client-key")) || null;
}