// import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

// const AudioContext = createContext();

// export function AudioProvider({ children }) {
//   const [audioUrl, setAudioUrl] = useState('');
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTrack, setCurrentTrack] = useState(null);
//   const [currTitle, setCurrTitle] = useState('');
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const audioRef = useRef(null);

//   // Initialize audio element
//   useEffect(() => {
//     audioRef.current = new Audio();
//     return () => {
//       if (audioRef.current) {
//         audioRef.current.pause();
//         audioRef.current = null;
//       }
//     };
//   }, []);

//   // Setup audio event listeners
//   useEffect(() => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     const handleTimeUpdate = () => {
//       setCurrentTime(audio.currentTime);
//     };

//     const handleLoadedMetadata = () => {
//       setDuration(audio.duration);
//     };

//     const handleEnded = () => {
//       setIsPlaying(false);
//     };

//     const handlePlay = () => {
//       setIsPlaying(true);
//     };

//     const handlePause = () => {
//       setIsPlaying(false);
//     };

//     audio.addEventListener('timeupdate', handleTimeUpdate);
//     audio.addEventListener('loadedmetadata', handleLoadedMetadata);
//     audio.addEventListener('ended', handleEnded);
//     audio.addEventListener('play', handlePlay);
//     audio.addEventListener('pause', handlePause);

//     return () => {
//       audio.removeEventListener('timeupdate', handleTimeUpdate);
//       audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
//       audio.removeEventListener('ended', handleEnded);
//       audio.removeEventListener('play', handlePlay);
//       audio.removeEventListener('pause', handlePause);
//     };
//   }, []);

//   // Update audio src when audioUrl changes
//   useEffect(() => {
//     const audio = audioRef.current;
//     if (!audio || !audioUrl) return;

//     audio.pause();
//     audio.currentTime = 0;
//     audio.src = audioUrl;
//     audio.load();
    
//     audio.play().catch(err => {
//       console.error('Error playing audio:', err);
//     });
//   }, [audioUrl]);

//   const playTrack = (url, title = '', trackInfo = null) => {
//     setAudioUrl(url);
//     setCurrTitle(title);
//     setCurrentTrack(trackInfo);
//   };

//   const stopAudio = () => {
//     if (audioRef.current) {
//       audioRef.current.pause();
//       audioRef.current.currentTime = 0;
//       setIsPlaying(false);
//     }
//   };

//   const clearAudio = () => {
//     if (audioRef.current) {
//       audioRef.current.pause();
//       audioRef.current.src = '';
//     }
//     setAudioUrl('');
//     setCurrTitle('');
//     setCurrentTrack(null);
//     setIsPlaying(false);
//     setCurrentTime(0);
//     setDuration(0);
//   };

//   const pause = () => {
//     if (audioRef.current) {
//       audioRef.current.pause();
//     }
//   };

//   const togglePlay = () => {
//     if (!audioRef.current) return;
    
//     if (isPlaying) {
//       audioRef.current.pause();
//     } else {
//       audioRef.current.play().catch(err => {
//         console.error('Error playing audio:', err);
//       });
//     }
//   };

//   const seekTo = (time) => {
//     if (audioRef.current) {
//       audioRef.current.currentTime = time;
//     }
//   };

//   const value = {
//     audioUrl,
//     setAudioUrl,
//     isPlaying,
//     currentTrack,
//     setCurrentTrack,
//     currTitle,
//     setCurrTitle,
//     currentTime,
//     duration,
//     playTrack,
//     pause,
//     togglePlay,
//     seekTo,
//     stopAudio,
//     clearAudio,
//     audioRef,
//   };

//   return (
//     <AudioContext.Provider value={value}>
//       {children}
//     </AudioContext.Provider>
//   );
// }

// // export function useAudio() {
// //   const context = useContext(AudioContext);
// //   // if (!context) {
// //   //   throw new Error('useAudio must be used within an AudioProvider');
// //   // }
// //   return context;
// // }