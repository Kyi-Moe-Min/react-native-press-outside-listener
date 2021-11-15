/**
 *
 * @param {Element&{_nativeTag:any,_children:any}} elementToCheck
 * @param {Element&{_nativeTag:any,_children:any}} parentElement
 */
export function isElementIncludedInParent(elementToCheck, parentElement) {
  if (elementToCheck._nativeTag === parentElement?._nativeTag) return true;
  if (!parentElement?._children) return false;
  for (const child of parentElement._children) {
    if (child?._nativeTag === elementToCheck._nativeTag) return true;
    if (isElementIncludedInParent(elementToCheck, child)) return true;
  }
  return false;
}
