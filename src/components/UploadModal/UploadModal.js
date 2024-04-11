import Modal from "react-modal";
import close from "../../assets/icons/close.svg";
import "./UploadModal.scss";
import { Link } from "react-router-dom";
import higher from "../../assets/icons/higherwhite.svg";

export default function UploadModal({
  modalIsOpen,
  handleCloseModal,
  handleChange,
  handleSubmit,
  message,
}) {
  return (
    <Modal
      isOpen={modalIsOpen}
      ariaHideApp={false}
      contentLabel="onRequestClose Example"
      onRequestClose={handleCloseModal}
      className="modal"
      overlayClassName="Overlay"
    >
      <div className="modal__icon">
        <img
          onClick={handleCloseModal}
          src={close}
          alt="close icon"
          className="modal__close"
        />
      </div>
      <div className="modal__container">
        <h2 className="modal__title">Upload to</h2>
        <div className="modal__wrap">
          <img className="modal__logo" src={higher} alt="higher" />
        </div>
        <form className="modal__form" onSubmit={handleSubmit}>
          <div className="modal__group">
            <label className="modal__label" htmlFor="title">
              Title
            </label>
            <input
              className="modal__input"
              type="text"
              name="title"
              id="title"
              onChange={handleChange}
            />
          </div>
          <div className="modal__group">
            <label className="modal__label" htmlFor="description">
              Description
            </label>
            <input
              className="modal__input"
              type="text"
              name="description"
              id="description"
              onChange={handleChange}
            />
          </div>
          <input
            type="file"
            onChange={handleChange}
            name="file"
            style={{ display: "none" }}
            id="fileInput"
          />
          <label htmlFor="fileInput" className="modal__upload">
            Upload
          </label>
          <button className="modal__button">Submit</button>
          {message && <p>{message}</p>}
        </form>
        <div className="modal__cancel">
          <button onClick={handleCloseModal} className="modal__exit">
            Cancel
          </button>
          <Link
            onClick={handleCloseModal}
            className="modal__navigate"
            to="/user"
          >
            My profile
          </Link>
        </div>
      </div>
    </Modal>
  );
}
