import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
  Divider,
  CircularProgress,
  Button
} from '@mui/material';
import PropTypes from 'prop-types';
import { logout } from './services/logout.service';
import { getAllUsers } from './services/user.service';
import ModalAddPhoto from './components/ModalAddPhoto';

const DRAWER_WIDTH = 240;

const MainLayout = ({ children }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
   const [modalOpen, setModalOpen] = useState(false);
  const getUserFromStorage = () => {
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) return null;
      return JSON.parse(userStr);
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  };
  const user = getUserFromStorage();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await getAllUsers();
        setUsers(data);
      } catch (err) {
        console.error('Error loading users:', err);
        setError('Không thể tải danh sách người dùng');
        if (err.response?.status === 401) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [navigate]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('user');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
 const handleUploadSuccess = (data) => {
    console.log('Ảnh mới:', data);
  };
  const handleUserClick = (selectedUser) => {
    console.log('Selected user:', selectedUser);
    // navigate(`/photo/user/${selectedUser._id}`);
    navigate(`/user/${selectedUser._id}`)
  };
  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar /> 
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                <CircularProgress />
              </Box>
            ) : error ? (
              <Typography color="error" sx={{ p: 2 }}>
                {error}
              </Typography>
            ) : (
              users.map((u) => (
                <ListItem key={u._id} disablePadding>
                  <ListItemButton onClick={() => handleUserClick(u)}>
                    <ListItemAvatar>
                      <Avatar>
                        {u.first_name ? u.first_name[0].toUpperCase() : 'U'}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                      primary={`${u.first_name} ${u.last_name}`}
                      secondary={u.username}
                    />
                  </ListItemButton>
                </ListItem>
              ))
            )}
          </List>
        </Box>
      </Drawer>

      {/* Main content */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Photo Sharing App
            </Typography>
            <Button variant="contained" onClick={() => setModalOpen(true)}>
              Thêm ảnh
            </Button>

            <ModalAddPhoto
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              onUploadSuccess={handleUploadSuccess}
            />
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body1" sx={{ mr: 2 }}>
                {user.firstName} {user.lastName}
              </Typography>
              
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar sx={{ width: 32, height: 32 }}>
                  {user.firstName ? user.firstName[0].toUpperCase() : 'U'}
                </Avatar>
              </IconButton>
              
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>

        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
