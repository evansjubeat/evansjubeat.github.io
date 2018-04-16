var context;
var myAudioBuffer = null;
window.onload=function(){
      // file open button
      var control = document.getElementById("fileChooseInput");
      control.addEventListener("change", fileChanged, false);
      
      // create audio context
      context = new AudioContext();
   }
function fileChanged(e){
      var file = e.target.files[0];
      var fileReader = new FileReader();
      document.getElementById("fileName").value = file.name;
      fileReader.onload = fileLoaded;
      fileReader.readAsArrayBuffer(file);
    }

function fileLoaded(e){
      context.decodeAudioData(e.target.result, function(buffer) {
          myAudioBuffer = buffer;
      });
}

function playSound(buffer) {
      ssource = context.createBufferSource();
      ssource.buffer = buffer;
      ssource.connect(context.destination);
      ssource.start();
}

function stopSound() {
      if (ssource) {
          ssource.stop();
          window.location.reload(true);
      }

}