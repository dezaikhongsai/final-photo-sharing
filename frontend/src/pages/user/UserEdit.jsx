import {
  Box,
  Typography,
  CircularProgress,
  Button,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById, updateUserById } from "./services/user.service";

const UserEdit = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    location: "",
    description: "",
    occupation: "",
  });

  const [originalUser, setOriginalUser] = useState(null); // lưu toàn bộ user ban đầu
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();
  const navigate = useNavigate();

  const fetchUserById = async () => {
    try {
      const res = await getUserById(userId);
      setOriginalUser(res); // lưu toàn bộ dữ liệu user
      setFormData({
        first_name: res.first_name || "",
        last_name: res.last_name || "",
        location: res.location || "",
        description: res.description || "",
        occupation: res.occupation || "",
      });
    } catch (err) {
      console.error("Lỗi khi lấy user:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserById();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!originalUser) return;
      const updatedPayload = {
        ...originalUser,
        ...formData,
      };

      await updateUserById(userId, updatedPayload);
      alert("Cập nhật thành công!");
      navigate(`/user/${userId}`);
    } catch (err) {
      console.error("Lỗi khi cập nhật user:", err);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!originalUser) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography color="error">Không tìm thấy người dùng</Typography>
      </Box>
    );
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        flexDirection: "column",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
        maxWidth: 600,
        mx: "auto",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Chỉnh sửa thông tin cá nhân
      </Typography>

      <TextField
        fullWidth
        label="Họ"
        name="first_name"
        value={formData.first_name}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Tên"
        name="last_name"
        value={formData.last_name}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Địa điểm"
        name="location"
        value={formData.location}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Mô tả"
        name="description"
        value={formData.description}
        onChange={handleChange}
        margin="normal"
        multiline
        rows={3}
      />
      <TextField
        fullWidth
        label="Nghề nghiệp"
        name="occupation"
        value={formData.occupation}
        onChange={handleChange}
        margin="normal"
      />

      <Button type="submit" variant="contained" sx={{ mt: 3 }}>
        Lưu thay đổi
      </Button>
    </Box>
  );
};

export default UserEdit;
