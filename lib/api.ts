// API
export const getVoices = async (server: string): Promise<string[]> => {
  const res = await fetch(`${server}/v1/audio/voices`)
  const json = await res.json()
  return json.voices
}

export const testServer = async (server: string): Promise<boolean> => {
  try {
    const res = await fetch(`${server}/v1/test`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const json = await res.json()
    return json.status === 'ok'
  } catch {
    return false
  }
}

// Misc
export const cleanServerUrl = (url: string): string => {
  const urlObj = new URL(url)
  return urlObj.origin.trim()
}
