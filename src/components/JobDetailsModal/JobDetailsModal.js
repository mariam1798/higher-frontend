import React from "react";
import Modal from "react-modal";
import close from "../../assets/icons/close-24px.svg";
import higher from "../../assets/icons/higherwhite.svg";
import { Link } from "react-router-dom";
import "./JobDetailsModal.scss";
export default function JobDetailsModal({
  modalIsOpen,
  handleCloseModal,
  logo,
  job_title,
  job_description,
  job_employment,
  job_city,
  job_country,
  job_apply,
}) {
  return (
    <Modal
      isOpen={modalIsOpen}
      ariaHideApp={false}
      contentLabel="onRequestClose Example"
      onRequestClose={handleCloseModal}
      className="details"
      overlayClassName="Overlay"
    >
      <div className="details__icon">
        <img
          onClick={handleCloseModal}
          src={close}
          alt="close icon"
          className="details__close"
        />
      </div>
      <div className="details__container">
        <img className="details__logo" src={higher} alt="higher" />

        <div className="details__wrap">
          <img src={logo} alt={job_employment} className="details__company" />
          <h3 className="details__title">{job_title}</h3>
          <div className="details__link">
            <p className="details__country">
              {job_country}-{job_city}
            </p>
            <Link className="details__navigate" to={job_apply}>
              <button className="details__button">Easy Apply</button>
            </Link>
          </div>
        </div>
        <div className="details__description">
          <p className="details__text">{job_description}</p>
        </div>
        <div className="details__cancel">
          <button onClick={handleCloseModal} className="details__button">
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}
