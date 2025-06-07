import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getPhotosByUserId,
  addComment,
  updateComment,
  deleteComment,
  deletePhoto,
} from "./services/photo.service";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemText,
  Avatar,
  CircularProgress,
  Button,
} from "@mui/material";

const Photo = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentInputs, setCommentInputs] = useState({});
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const fetchPhotoData = async () => {
    try {
      setLoading(true);
      const res = await getPhotosByUserId(userId);
      console.log("API Response:", res.data);
      console.log("userId:", userId);
      setPhotos(res.data?.photos || []);
    } catch (err) {
      console.error("Error fetching photos:", err);
      setError("Không thể tải ảnh");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchPhotoData();
    } else {
      setError("Không tìm thấy userId");
      setLoading(false);
    }
  }, [userId]);

  // Format date to a readable string
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleAddComment = async (photoId) => {
    const comment = commentInputs[photoId];
    const userStr = localStorage.getItem("user");
    const user = JSON.parse(userStr);
    const uId = user.id;
    console.log("uid", uId);
    console.log("photoId ", photoId);

    if (!comment?.trim()) return;

    try {
      await addComment({
        comment,
        userId: uId,
        photoId,
      });

      setCommentInputs((prev) => ({ ...prev, [photoId]: "" }));
      await fetchPhotoData();
    } catch (error) {
      console.error("Lỗi khi thêm bình luận:", error);
    }
  };

  const handleViewPhoto = (record) => {
    console.log("userId ádasdads-----------", record);
    navigate(`/user/${record}`);
  };

  const handleDeletePhoto = async (id) => {
    console.log("photoId ---------", id);
    try {
      const res = await deletePhoto(id);
      console.log("Xóa ảnh - phản hồi:", res);
      alert("Xóa thành công");
      await fetchPhotoData(); // Cập nhật lại danh sách
    } catch (err) {
      console.error("Lỗi khi xóa:", err);
      const errorMessage =
        err?.response?.data?.message || err.message || "Đã xảy ra lỗi";
      await fetchPhotoData();
    }
  };
  const handleDeleteComment = async (cId) => {
    try {
      await deleteComment(cId);
      await fetchPhotoData();
    } catch (error) {
      console.error("Lỗi khi xóa bình luận:", error);
      alert("Xóa thất bại");
    }
  };
  const handleEditComment = (comment) => {
    setEditingCommentId(comment._id);
    setEditingText(comment.comment);
  };

  const handleSaveEditComment = async (cId) => {
    try {
      await updateComment(cId, { comment: editingText });
      setEditingCommentId(null);
      setEditingText("");
      await fetchPhotoData();
    } catch (error) {
      console.error("Lỗi khi cập nhật bình luận:", error);
      alert("Cập nhật thất bại");
    }
  };

  const BASE_IMAGE_URL = "https://z9zddm-5000.csb.app/uploads/";

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Ảnh của người dùng
      </Typography>
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Typography color="error" sx={{ p: 2 }}>
          {error}
        </Typography>
      )}
      {!loading && !error && photos.length === 0 && (
        <Typography sx={{ p: 2 }}>Không có ảnh nào.</Typography>
      )}
      {!loading && !error && photos.length > 0 && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {photos.map((photo) => (
            <Card key={photo._id} sx={{ mb: 2 }}>
              <CardMedia
                component="img"
                height="auto"
                image={`${BASE_IMAGE_URL}${photo.file_name}`}
                alt="Photo"
                sx={{ objectFit: "contain", maxHeight: 500 }}
              />
              <Button
                onClick={() => {
                  handleDeletePhoto(photo._id);
                }}
              >
                Xóa bài viết
              </Button>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Đăng ngày: {formatDate(photo.day)}
                </Typography>
                {photo.comments && photo.comments.length > 0 ? (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="h6">Bình luận</Typography>
                    <List>
                      {photo.comments.map((comment) => (
                        <ListItem key={comment._id} alignItems="flex-start">
                          <Avatar sx={{ mr: 2 }}>
                            {comment.userId?.first_name?.[0] || "U"}
                          </Avatar>
                          <ListItemText
                            primary={
                              <Typography
                                variant="subtitle2"
                                sx={{
                                  cursor: "pointer",
                                  "&:hover": {
                                    textDecoration: "underline",
                                    color: "primary.main",
                                  },
                                }}
                                onClick={() =>
                                  handleViewPhoto(comment.userId._id)
                                }
                              >
                                {`${comment.userId?.first_name || "User"} ${
                                  comment.userId?.last_name || ""
                                }`}
                              </Typography>
                            }
                            secondary={
                              editingCommentId === comment._id ? (
                                <>
                                  <input
                                    type="text"
                                    value={editingText}
                                    onChange={(e) =>
                                      setEditingText(e.target.value)
                                    }
                                    style={{
                                      width: "100%",
                                      padding: "6px",
                                      marginTop: "6px",
                                      marginBottom: "4px",
                                      border: "1px solid #ccc",
                                      borderRadius: "4px",
                                    }}
                                  />
                                  <Box sx={{ display: "flex", gap: 1 }}>
                                    <Button
                                      size="small"
                                      onClick={() =>
                                        handleSaveEditComment(comment._id)
                                      }
                                    >
                                      Lưu
                                    </Button>
                                    <Button
                                      size="small"
                                      color="inherit"
                                      onClick={() => {
                                        setEditingCommentId(null);
                                        setEditingText("");
                                      }}
                                    >
                                      Hủy
                                    </Button>
                                  </Box>
                                </>
                              ) : (
                                <>
                                  <Typography variant="body2">
                                    {comment.comment}
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                  >
                                    {formatDate(comment.day)}
                                  </Typography>
                                  <Box sx={{ display: "flex", gap: 1 }}>
                                    <Button
                                      size="small"
                                      onClick={() => handleEditComment(comment)}
                                    >
                                      Sửa
                                    </Button>
                                    <Button
                                      size="small"
                                      color="error"
                                      onClick={() =>
                                        handleDeleteComment(comment._id)
                                      }
                                    >
                                      Xóa
                                    </Button>
                                  </Box>
                                </>
                              )
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                ) : (
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    Chưa có bình luận.
                  </Typography>
                )}
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Thêm bình luận
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <input
                      type="text"
                      placeholder="Nhập bình luận..."
                      value={commentInputs[photo._id] || ""}
                      onChange={(e) =>
                        setCommentInputs((prev) => ({
                          ...prev,
                          [photo._id]: e.target.value,
                        }))
                      }
                      style={{
                        flex: 1,
                        padding: "8px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                      }}
                    />
                    <button
                      onClick={() => handleAddComment(photo._id)}
                      style={{
                        padding: "8px 12px",
                        backgroundColor: "#1976d2",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Gửi
                    </button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Photo;
