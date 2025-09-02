import React from 'react'
import constantes from "expo-constants"
export default function GetImage(path) {
  const host=constantes.expoConfig.extra.host
  if (typeof path === "string" && (path.startsWith("http"))) {
    return path;
  }
  if(!path) return null
  return `http://${host}:4000/${path}`
}
