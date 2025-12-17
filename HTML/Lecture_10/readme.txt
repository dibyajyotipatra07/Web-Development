vdeo tag
-src: for source
-controls: for enable controls in video(play, pause, volume)
-height: for change height with same aspect ratio for width
-width: for change width with height changes with the same same aspect ratio
-autoplay: for automatically play the video when browser starts
-loop: loop the video
-muted: for muted play of video
-poster: add a poster to the video like thumbnail

audio tag
-src: for source
-controls: control enabled
-autoplay: for automatically play the audio when browser starts
-loop: loop the audio
-muted: for muted play of audio
-preload: how the audio loaded when the browser starts
*none: dont preload anything, when user click playback it start downlaoding
*metadata: only load the metadata like audio duration like this
*auto: total load the audio in background so that when user start it it is ready to play

svg(Scalable Vector Graphics)
-use in img tag directly
-when redirecting in a svg file should use 
-+use in case of using image tag:
*<svg xmlns="http://www.w3.org/2000/svg" height="100" width="100">
    <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
</svg>

***xmlns="http://www.w3.org/2000/svg"


<iframe>
-embedd other website in your web page