import Player from '@/components/Player.tsx'

const PlayerInjectWrapper = () => {
  const play = () => {
    fetch('http://localhost:8880/v1/audio/speech', {
      headers: {
        accept: '*/*',
        'accept-language': 'en-US,en;q=0.9',
        'content-type': 'application/json',
        'sec-ch-ua': '"Chromium";v="139", "Not;A=Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Linux"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
      },
      referrer: 'http://localhost:8880/web/',
      body: '{"input":"Hello this is a test","voice":"af_alloy","response_format":"mp3","download_format":"mp3","stream":true,"speed":1,"return_download_link":true}',
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
    })
  }

  return (
    <>
      {/*
      <div className="bg-foreground text-background fixed top-0 right-0 left-0 z-20 m-4 h-100 rounded-lg py-4 shadow-lg">
        <Player />
      </div>
*/}
      <Player />
    </>
  )
}

export default PlayerInjectWrapper
