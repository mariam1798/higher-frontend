import "./CommentsForm.scss";

export default function CommentsForm({ commentsLength, PostComments }) {
  return (
    <section className="forms">
      <h3 className="forms__comments">{commentsLength} Comments</h3>
      <div className="forms__container">
        <form className="form" onSubmit={PostComments}>
          <h2 className="form__title">COMMENT TO HIGHER!</h2>
          <div className="form__group">
            <textarea
              className="form__input"
              name="text"
              id="text"
              rows="5"
              placeholder="Add a new comment"
            ></textarea>
            <button className="form__button" type="submit">
              COMMENT
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
