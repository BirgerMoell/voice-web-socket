import logo from './logo.svg';
import './App.css';

function App() {

  const socket = new WebSocket('ws://localhost:8080');
  const startRecording = async () => {
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    let mediaRecorder = new MediaRecorder(audio);
    mediaRecorder.start(50)
    mediaRecorder.ondataavailable = function(e) {
      console.log("the mediarecorder data is ", e.data)
      var data = e.data
      socket.send(data);
  }
}

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={startRecording}>Record</button>
       
      </header>
    </div>
  );
}


export default App;