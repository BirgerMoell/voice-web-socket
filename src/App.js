import logo from './logo.svg';
import './App.css';

function App() {

  const socket = new WebSocket('ws://localhost:8080');
  let mediaRecorder
  var preview = document.createElement('audio');
  preview.controls = true;

    // Listen for messages
  socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
    const blob = event.data
    playAudio(blob)
  });

  const playAudio = async (blob) => {
    var url = URL.createObjectURL(blob);
    console.log("url", url)
    preview.src = url;
    document.body.appendChild(preview);
    preview.play()
  }

  const startRecording = async () => {
    // web rct media stream
    const audioStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    mediaRecorder = new MediaRecorder(audioStream);
    mediaRecorder.start(50)
    mediaRecorder.ondataavailable = function (e) {
      console.log("the mediarecorder data is ", e.data)
      var data = e.data
      socket.send(data);
    }
  }

  const stopRecording = async () => {
    mediaRecorder.stop()
  }

  const startPlaying = async () => {
    socket.send({
      "playback": true
    })
  }



  

  return (
    <div className="App">
      <header className="App-header">

      {/* <button onClick={startPlaying}>Start play</button> */}

        {/* <audio></audio> */}

        <button onClick={startRecording}>Record</button>
        <br></br>
        <button onClick={stopRecording}>Stop</button>
        

      </header>
    </div>
  );
}


export default App;