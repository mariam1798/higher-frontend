import "./Comment.scss";
import { useAuth } from "../../Context/UseAuth";
import { deleteComments } from "../../utils/axios";
import deleteIcon from "../../assets/icons/delete.svg";
export default function Comment({
  id,
  getComments,
  avatar,
  name,
  comment,
  date,
  userId,
}) {
  const { authToken, user } = useAuth();
  const commentId = id;

  const isLoggedInUser = userId === user?.id;

  const deleteComment = async () => {
    try {
      await deleteComments(authToken, commentId);
      getComments();
    } catch (error) {
      console.log("Error while trying to remove the comment", error);
    }
  };

  return (
    <div className="comment__card">
      <div className="comment__Left">
        <img src={avatar} alt="avatar" className="comment__image" />
      </div>
      <div className="comment__right">
        <div className="comment__top">
          <h2 className="comment__name">{name}</h2>
          <h3 className="comment__date">{date}</h3>
        </div>
        <p className="comment__text"> {comment}</p>
      </div>
      {isLoggedInUser && (
        <div className="comment__delete" onClick={deleteComment}>
          <img src={deleteIcon} alt="delete" className="comment__icon" />
        </div>
      )}
    </div>
  );
}
