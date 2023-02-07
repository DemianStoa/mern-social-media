
  import {
    Box,
    Divider,
    InputBase,
    useTheme,
    Button,
    useMediaQuery,
  } from "@mui/material";
  import FlexBetween from "../../components/FlexBetween";
  import UserImage from "../../components/UserImage";
  import WidgetWrapper from "../../components/WidgetWrapper";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setPost } from "../../state";

  

const CommentWidget = ({postId}) => {
    const dispatch = useDispatch();
    const [comment, setComment] = useState("");
    const { palette } = useTheme();
    const { picturePath } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;
  
    const patchComment = async () => {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL_BASE}/posts/${postId}/comment`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comment }),
        });
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
        setComment("")
      };

  return (
    <WidgetWrapper>
    <FlexBetween gap="1.5rem">
      <UserImage image={picturePath} size="50px" />
      <InputBase
        placeholder="What's on your mind..."
        onChange={(e) => setComment(e.target.value)}
        value={comment}
        sx={{
          flexGrow: "4",
          width: "100%",
          backgroundColor: palette.neutral.light,
          borderRadius: "1rem",
          padding: ".5rem .5rem",
        }}
      />
        <Button
          disabled={!comment}
          onClick={patchComment}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          Reply
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  )
}

export default CommentWidget