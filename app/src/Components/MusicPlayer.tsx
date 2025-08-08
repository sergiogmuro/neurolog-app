const MusicPlayer = () => {
  return (
      <div>
        <p>🎵 Reproduciendo música Crocker para relajarte...</p>
        <audio controls autoPlay>
          <source src="/public/heavy-drag-mid-tempo-nu-metal-instrumental-379674.mp3" type="audio/mpeg" />
          Tu navegador no soporta audio.
        </audio>
      </div>
  )
}

export default MusicPlayer
