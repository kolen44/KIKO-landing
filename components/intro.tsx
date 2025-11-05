import React, { useState, useEffect, useRef } from 'react';

interface IntroScreenProps {
  onComplete: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    console.log('IntroScreen - Component mounted');
    sessionStorage.setItem('introShown', 'true');

    // Check if it's a mobile device
    const userAgent = navigator.userAgent;
    const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    setIsMobile(mobile);

    const video = videoRef.current;
    if (video) {
      console.log('IntroScreen - Starting video');
      video.play().catch(err => {
        console.log('Video autoplay failed:', err);
        setTimeout(() => handleComplete(), 2000);
      });
    }
  }, []);

  const handleComplete = () => {
    setIsVisible(false);
    setTimeout(() => {
      onComplete();
    }, 500); // Wait for fade out animation
  };

  const handleVideoEnd = () => {
    handleComplete();
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed top-0 left-0 w-full h-screen bg-white flex items-center justify-center z-[9999] animate-in fade-in duration-300 ${
        !isVisible ? 'animate-out fade-out duration-500' : ''
      }`}
    >
      <div className="relative flex items-center justify-center w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          onEnded={handleVideoEnd}
          playsInline
          muted
          preload="auto"
          className="w-[90%] h-[60vh] object-contain md:object-cover md:w-full md:h-full transition-transform duration-500"
        >
          <source src={isMobile ? "/intro_mobile.mp4" : "/intro.mp4"} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default IntroScreen;