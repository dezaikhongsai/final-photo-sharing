import { Box, Typography, CircularProgress, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById } from "./services/user.service";

const UserDetail = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();
  const navigate = useNavigate();
  const fetchUserById = async () => {
    try {
      const res = await getUserById(userId);
      setUser(res);
      console.log("user ------------", res);
    } catch (err) {
      console.error("Lỗi khi lấy user:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserById();
  }, [userId]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography color="error">Không tìm thấy người dùng</Typography>
      </Box>
    );
  }

  const handleViewPhoto = () => {
    navigate(`/photo/user/${userId}`);
  };

  return (
    <Box
      sx={{
        flexDirection: "column",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Thông tin người dùng
      </Typography>
      <Typography variant="body1">
        <strong>Họ tên:</strong> {user.first_name} {user.last_name}
      </Typography>
      <Typography variant="body1">
        <strong> Địa điểm:</strong> {user.location}
      </Typography>
      <Typography variant="body1">
        <strong>Mô tả:</strong> {user.description}
      </Typography>
      <Typography variant="body1">
        <strong>Nghề nghiệp:</strong> {user.occupation}
      </Typography>
      <Button variant="contained" onClick={handleViewPhoto}>
        Xem ảnh
      </Button>
    </Box>
  );
};

export default UserDetail;
