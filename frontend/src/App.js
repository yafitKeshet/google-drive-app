import { useRef } from "react";
import "./App.css";

function App() {
  const fileInputRef = useRef(null);
  const handleFileUpload = async () => {
    const files = fileInputRef.current.files;

    if (files.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }

      try {
        const response = await fetch(
          "http://localhost:5000/google-drive/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        console.log("uploaded", data.files);
      } catch (err) {
        console.log("error");
      }
    }
  };
  return (
    <div className="App">
      <h1>upload </h1>
      <input type="file" multiple ref={fileInputRef} />
      <button onClick={handleFileUpload}>up</button>
    </div>
  );
}

export default App;
