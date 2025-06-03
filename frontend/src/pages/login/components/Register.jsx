import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
  Modal,
  Fade,
  Backdrop
} from '@mui/material';

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 1,
};

const RegisterModal = ({ open, onClose, onRegister }) => {
  const [registerData, setRegisterData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
    location: '',
    description: '',
    occupation: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (registerData.password !== registerData.confirmPassword) {
      setError('Mật khẩu nhập lại không trùng khớp');
      return;
    }
    const { confirmPassword, ...dataToSend } = registerData;

    try {
      await onRegister(dataToSend);
      setSuccess('Đăng ký thành công. Bạn có thể đăng nhập ngay.');
      setTimeout(() => {
        onClose();
        setRegisterData({
          username: '',
          password: '',
          confirmPassword: '',
          first_name: '',
          last_name: '',
          location: '',
          description: '',
          occupation: ''
        });
        setError('');
        setSuccess('');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Đăng ký thất bại. Vui lòng thử lại.');
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={open}>
        <Box sx={styleModal}>
          <Typography variant="h6" component="h2" gutterBottom>
            Đăng ký
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Tên đăng nhập"
                name="username"
                value={registerData.username}
                onChange={handleChange}
                required
              />
              <TextField
                label="Mật khẩu"
                name="password"
                type="password"
                value={registerData.password}
                onChange={handleChange}
                required
              />
              <TextField
                label="Nhập lại mật khẩu"
                name="confirmPassword"
                type="password"
                value={registerData.confirmPassword}
                onChange={handleChange}
                required
              />
              <TextField
                label="Họ"
                name="last_name"
                value={registerData.last_name}
                onChange={handleChange}
                required
              />
              <TextField
                label="Tên"
                name="first_name"
                value={registerData.first_name}
                onChange={handleChange}
                required
              />
              <TextField
                label="Địa điểm"
                name="location"
                value={registerData.location}
                onChange={handleChange}
              />
              <TextField
                label="Mô tả"
                name="description"
                value={registerData.description}
                onChange={handleChange}
              />
              <TextField
                label="Nghề nghiệp"
                name="occupation"
                value={registerData.occupation}
                onChange={handleChange}
              />
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button onClick={onClose} color="inherit">
                  Hủy
                </Button>
                <Button variant="contained" type="submit" color="primary">
                  Đăng ký
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default RegisterModal;
