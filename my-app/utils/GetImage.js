import React from 'react'
import constantes from "expo-constants"
import getHost from '../hooks/getHost';
export default function GetImage(path) {
  const host=getHost()
  if (typeof path === "string" && (path.startsWith("http"))) {
    return path;
  }
  if(!path) return null
  return `http://${host}:4000/${path}`
}
