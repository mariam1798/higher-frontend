import "./Comment.scss";

export default function Comment({ name, comment, date }) {
  return (
    <div className="comment__card">
      <div className="comment__Left">
        <div className="comment__image"></div>
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
