import React from "react";
import "./EmailModal.css";

const EmailModal = ({ open, onClose, onSend }) => {
  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const emailData = {
      to: form.to.value,
      subject: form.subject.value,
      message: form.message.value
    };

    onSend(emailData);
    onClose();
  };

  return (
    <div className="email-modal-backdrop">
      <div className="email-modal">
        <h2>Novo E-mail</h2>

        <form onSubmit={handleSubmit}>
          <label>
            Para:
            <input type="email" name="to" required placeholder="destinatário..." />
          </label>

          <label>
            Assunto:
            <input type="text" name="subject" required placeholder="assunto..." />
          </label>

          <label>
            Mensagem:
            <textarea name="message" rows="6" required placeholder="escreva sua mensagem..." />
          </label>

          <div className="btn-area">
            <button type="submit" className="btn-send">Enviar</button>
            <button type="button" className="btn-cancel" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailModal;
