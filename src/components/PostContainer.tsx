import Button from "@mui/material/Button";
import React, { useState } from "react";
import { IPost } from "../models/IPost";
import { postAPI } from "../services/PostService";
import PostItem from "./PostItem";
import "../style/post.css";
import { green } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

const PostContainer: React.FC = () => {
  const [task, setTask] = useState<string>("");
  const [limit, setLimit] = useState(100);
  const {
    data: posts,
    error,
    isLoading,
  } = postAPI.useFetchAllPostsQuery(limit);
  const [createPost, {}] = postAPI.useCreatePostMutation({});
  const [updatePost, {}] = postAPI.useUpdatePostMutation();
  const [deletePost, {}] = postAPI.useDeletePostMutation();

  const handleCreate = async () => {
    if (task.length > 0) {
      let title = JSON.stringify(task);
      title = title.replace(/[""]/g, "");
      await createPost({ title, body: title } as any);
      setTask("");
    } else {
      console.log("input empty");
    }
  };

  const handleRemove = (post: IPost) => {
    deletePost(post);
  };

  const handleUpdate = (post: IPost) => {
    updatePost(post);
  };
  ///////////////

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTask(event.target.value);
  };

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[800],
    "&:hover": {
      backgroundColor: green[900],
    },
  }));

  ///////////////
  return (
    <div>
      <div className="post__list">
        <div className="post__add">
          <input
            type="text"
            value={task}
            onChange={handleChange}
            name="task"
            className="post__inp"
            placeholder={task.length < 1 ? "type" : ""}
          />
          <ColorButton
            sx={{
              color: "white",
            }}
            variant="outlined"
            onClick={handleCreate}
          >
            add post
          </ColorButton>
        </div>
        {isLoading && <h1>loading in proccess</h1>}
        {error && <h1>error</h1>}
        {posts &&
          posts.map((post) => (
            <PostItem
              remove={handleRemove}
              update={handleUpdate}
              key={post.id}
              post={post}
            />
          ))}
      </div>
    </div>
  );
};

export default PostContainer;
