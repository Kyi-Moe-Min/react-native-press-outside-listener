import { Component } from "react";
import { findNodeHandle } from "react-native";

/**
 *
 * @param {Component} elementToCheck
 * @param {Component} parentElement
 */
export function isElementIncludedInParent(elementToCheck, parentElement) {
  if (findNodeHandle(elementToCheck) === findNodeHandle(parentElement))
    return true;
  if (!parentElement?._children) return false;
  for (const child of parentElement._children) {
    if (isElementIncludedInParent(elementToCheck, child)) return true;
  }
  return false;
}
