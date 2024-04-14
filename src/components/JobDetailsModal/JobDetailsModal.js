import React from "react";
import Modal from "react-modal";
import close from "../../assets/icons/close.svg";
import higher from "../../assets/icons/logoteal.svg";
import { Link } from "react-router-dom";
import "./JobDetailsModal.scss";
import BulletPoints from "../BulletPoints/BulletPoints";
import { motion, AnimatePresence } from "framer-motion";

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
  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.75, // Starts slightly smaller
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
  };
  return (
    <AnimatePresence>
      <Modal
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        isOpen={modalIsOpen}
        ariaHideApp={false}
        contentLabel="onRequestClose Example"
        onRequestClose={handleCloseModal}
        className="details"
        overlayClassName="Overlay"
      >
        <motion.div
          className="modal-content"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
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
            <div className="details__wrap">
              <div className="details__wrapper">
                <img
                  src={logo}
                  alt={job_employment}
                  className="details__company"
                />
              </div>
              <div className="details__card">
                <div className="details__info">
                  <h3 className="details__title">{job_title}</h3>
                  <p className="details__country">
                    {job_country}-{job_city}
                  </p>
                </div>
                <div className="details__link">
                  <Link className="details__navigate" to={job_apply}>
                    <button className="details__button">Easy Apply</button>
                  </Link>
                </div>
              </div>
            </div>
            <BulletPoints text={job_description} />

            <div className="details__cancel">
              <button onClick={handleCloseModal} className="details__button">
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      </Modal>
    </AnimatePresence>
  );
}
