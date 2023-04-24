import { useCallback, useRef } from "react";
import "./App.css";

const chunkSize = 1024 * 1024; // 1MB

function App() {
  const fileInputRef = useRef(null);

  const handleUpload = useCallback(async () => {
    const fileInput = fileInputRef.current;
    const file = fileInput.files[0];
    let offset = 0;
    const filename = file.name; // get the filename from the uploaded file
    console.log(file);
    while (offset < file.size) {
      const chunk = file.slice(offset, offset + chunkSize);
      const formData = new FormData();
      formData.append("file", chunk, `${filename}.${offset / chunkSize}`);
      await fetch(
        "http://localhost:9001/api/v1/file/chunks/8be6699b-3f7c-4965-af48-d6f5caa16704",
        {
          method: "POST",
          body: formData,
        }
      );
      offset += chunkSize;
    }
  }, []);
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input type="file" ref={fileInputRef} />
        <button onClick={handleUpload}>Upload</button>
      </form>
    </div>
  );
}

export default App;
