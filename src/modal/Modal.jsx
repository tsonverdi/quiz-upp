
import { useGlobalContext } from "../Context/Context";

const Modal = () => {
    const {showModal, closeModal, correct, questions} = useGlobalContext();
    return (
        <div className={`${showModal ? "modal-container isOpen" : "modal-container"}`}>
            <div className="modal-content">
                <div>
                <p>
                    You answered {((correct/questions.length)*100).toFixed(0)}% questions correctly!
                </p> </div>
                <button className="close-btn" onClick={closeModal}>Play Again</button>
            </div>
        </div>
    )
};
export default Modal;