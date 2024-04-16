import "./Comment.scss";
import { useAuth } from "../../Context/UseAuth";
import { deleteComments } from "../../utils/axios";
export default function Comment({
  id,
  getComments,
  avatar,
  name,
  comment,
  date,
}) {
  const commentId = id;
  console.log(commentId);

  const { authToken } = useAuth();

  const deleteComment = async () => {
    try {
      await deleteComments(authToken, commentId);
      getComments();
    } catch (error) {
      console.log("Error while trying to remove the inventory", error);
    }
  };

  return (
    <div className="comment__card">
      <div className="comment__Left">
        <img
          onClick={() => deleteComment(commentId)}
          src={avatar}
          alt=""
          className="comment__image"
        />
      </div>
      <div className="comment__right">
        <div className="comment__top">
          <h2 className="comment__name">{name}</h2>
          <h3 className="comment__date">{date}</h3>
        </div>
        <p className="comment__text"> {comment}</p>
      </div>
    </div>
  );
}
