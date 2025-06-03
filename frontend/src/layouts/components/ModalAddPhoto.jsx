import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Input,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

const ModalAddPhoto = ({ open, onClose, onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files?.[0] || null);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('photo', selectedFile);

    try {
      setUploading(true);
      const res = await axios.post('http://localhost:5000/api/photo/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true, 
      });

      console.log('Upload thành công:', res.data);
      onUploadSuccess?.(res.data); 
      onClose(); 
    } catch (err) {
      console.error('Upload lỗi:', err);
    } finally {
      setUploading(false);
      setSelectedFile(null);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Thêm ảnh mới</DialogTitle>
      <DialogContent>
        <Input type="file" onChange={handleFileChange} />
        {selectedFile && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            File đã chọn: {selectedFile.name}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={uploading}>Hủy</Button>
        <Button
          onClick={handleUpload}
          variant="contained"
          disabled={!selectedFile || uploading}
        >
          {uploading ? 'Đang tải...' : 'Tải lên'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalAddPhoto;
