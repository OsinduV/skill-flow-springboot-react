import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useState } from 'react';

function UploadComponent() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 3) {
      alert('You can only upload up to 3 files.');
      return;
    }
    validateFiles(selectedFiles);
  };

  const validateFiles = (files) => {
    const videoFiles = files.filter((file) => file.type.startsWith('video/'));
    if (videoFiles.length > 0) {
      const video = document.createElement('video');
      video.src = URL.createObjectURL(videoFiles[0]);
      video.onloadedmetadata = () => {
        if (video.duration > 30) {
          alert('Video must be less than 30 seconds.');
        } else {
          setFiles(files);
        }
      };
    } else {
      setFiles(files);
    }
  };

  const handleUpload = async () => {
    setUploading(true);
    const urls = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const storageRef = ref(storage, `uploads/${file.name}_${Date.now()}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      urls.push(downloadURL);
    }
    setUploadedUrls(urls);
    setUploading(false);
    alert('Uploaded Successfully!');
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*,video/*"
        multiple
        onChange={handleFileChange}
      />
      {files.length > 0 && (
        <button onClick={handleUpload} disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      )}
      <div>
        {uploadedUrls.map((url, idx) => (
          <div key={idx}>
            <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UploadComponent;
