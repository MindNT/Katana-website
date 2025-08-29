import React, { useState, useRef } from 'react';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  className = "",
  autoplay = false,
  loop = false,
  muted = false
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        setIsLoading(true);
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleLoadStart = () => {
    setIsLoading(true);
  };

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  return (
    <div className={`relative group ${className}`}>
      {/* Contenedor del video con bordes decorativos */}
      <div className="relative w-80 h-80 rounded-2xl overflow-hidden bg-black border border-red-500/30 shadow-2xl">
        {/* Video */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          poster={poster}
          autoPlay={autoplay}
          loop={loop}
          muted={muted}
          onLoadStart={handleLoadStart}
          onCanPlay={handleCanPlay}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          <source src={src} type="video/mp4" />
          Tu navegador no soporta la reproducción de videos.
        </video>

        {/* Overlay de controles */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={togglePlay}
            className="w-16 h-16 bg-red-500/80 hover:bg-red-500 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : isPlaying ? (
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
              </svg>
            ) : (
              <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>
        </div>

        {/* Indicador de estado */}
        {!isPlaying && !isLoading && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-white text-sm font-medium">Toca para reproducir</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Decoraciones japonesas */}
      <div className="absolute -top-3 -right-3 w-6 h-6 bg-red-500/20 rounded-full border border-red-500/40"></div>
      <div className="absolute -bottom-3 -left-3 w-8 h-8 bg-red-400/15 rounded-full border border-red-400/30"></div>
      
      {/* Patrón decorativo sutil */}
      <div className="absolute -top-1 -right-1 w-20 h-20 opacity-10 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full text-red-500">
          <path
            d="M20,50 Q50,20 80,50 Q50,80 20,50"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="5,5"
          />
        </svg>
      </div>
    </div>
  );
};

export default VideoPlayer;
