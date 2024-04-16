import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { fetchComments, postComments } from "../../utils/axios";
import Comment from "../Comment/Comment";
import CommentsForm from "../CommentsForm/CommentsForm";
import "./Comments.scss";
import { useAuth } from "../../Context/UseAuth";

export default function Comments({ videoId }) {
  const { authToken } = useAuth();

  const [comments, setComments] = useState([]);

  const getComments = useCallback(async () => {
    try {
      const { data } = await fetchComments(videoId);
      setComments(data);
    } catch (error) {
      console.log(error);
    }
  }, [videoId]);

  const PostComments = async (event) => {
    event.preventDefault();
    const newComment = { comment: event.target.text.value };
    try {
      await postComments(authToken, videoId, newComment);
      setComments((prevComments) => [...prevComments, newComment]);
      getComments();
      event.target.reset();
    } catch (error) {
      console.log("error posting comments", error);
    }
  };

  useEffect(() => {
    getComments();
  }, [getComments]);

  return (
    <section className="comments">
      <CommentsForm
        PostComments={PostComments}
        commentsLength={comments.length}
      />
      <div className="comment">
        {comments &&
          comments
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .map((comment) => (
              <Comment
                key={uuidv4()}
                id={comment.id}
                getComments={getComments}
                name={comment.name}
                date={comment.timeStamp}
                comment={comment.comment}
                avatar={`${process.env.REACT_APP_API_BASE_URL}/${comment.avatar}`}
                userId={comment.user_id}
              />
            ))}
      </div>
    </section>
  );
}
