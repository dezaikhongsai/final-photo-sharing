import { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Paper,
  TextField,
  Button,
  Stack,
  Alert
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { login, register } from './services/login.service';
import RegisterModal from './components/Register';  

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const [openRegister, setOpenRegister] = useState(false);
  const handleOpenRegister = () => setOpenRegister(true);
  const handleCloseRegister = () => setOpenRegister(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await login(formData.username, formData.password);
      if (!response || !response.token || !response.user) {
        throw new Error('Invalid response from server');
      }
      localStorage.setItem('token', response.token);
      if (!response.user.username) {
        throw new Error('Username is missing in the response');
      }
      localStorage.setItem('user', JSON.stringify(response.user));
      const from = location.state?.from?.pathname || '/home';
      navigate(from, { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        'Đăng nhập thất bại. Vui lòng thử lại.'
      );
    }
  };
  const handleRegister = async (data) => {
    await register(data);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Photo Sharing App
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h5" component="h1" align="center" gutterBottom>
            Đăng nhập
          </Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Tên đăng nhập"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                label="Mật khẩu"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <Stack direction="row" spacing={2} justifyContent="space-between">
                <Button variant="contained" color="primary" type="submit" sx={{ flex: 1 }}>
                  Đăng nhập
                </Button>
                <Button variant="outlined" color="secondary" sx={{ flex: 1 }} onClick={handleOpenRegister}>
                  Đăng ký
                </Button>
              </Stack>
            </Stack>
          </form>
        </Paper>
      </Container>

      <RegisterModal
        open={openRegister}
        onClose={handleCloseRegister}
        onRegister={handleRegister}
      />
    </Box>
  );
};

export default Login;
