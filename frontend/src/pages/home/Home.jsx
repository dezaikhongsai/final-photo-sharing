import { Typography, Box } from '@mui/material';
import MainLayout from '../../layouts/MainLayout';

const Home = () => {
  return (
    <MainLayout>
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          Trang chủ
        </Typography>
        <Typography variant="body1">
          Chào mừng đến với Photo Sharing App
        </Typography>
      </Box>
    </MainLayout>
  );
};

export default Home;
