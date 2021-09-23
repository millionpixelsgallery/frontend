export function getLocalCache<T>(name: string, defaultValue: T): T {
  const value = localStorage.getItem(name)
  if (!value) return defaultValue
  try {
    return JSON.parse(value)
  } catch (e) {
    return defaultValue
  }
}

export function setLocalCache(name: string, value: any) {
  localStorage.setItem(name, JSON.stringify(value))
}
