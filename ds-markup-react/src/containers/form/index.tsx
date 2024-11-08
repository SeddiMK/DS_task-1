import { FormProps } from "@/types/db";
import "./style.css";

export const Form: React.FC<FormProps> = ({ agreementT, submitT, emailT }) => {
  return (
    <form
      id="form-subscribe"
      className="section-subscribe__form form-subscribe"
      action="/registration"
      method="POST"
    >
      <div className="form-subscribe__send">
        <div id="inp-email-subscribe-wrp" className="form-subscribe__input-wrp">
          <input
            id="inp-email-subscribe"
            type="email"
            name="form-subscribe[email]"
            data-error="Error"
            placeholder={emailT}
            className="form-subscribe__input input form-subscribe-input_focus form-subscribe-input_disabled  "
          />
        </div>

        <button
          type="button"
          className="form-subscribe__btn btn subscribe-btn subscribe_bgc_active subscribe_bgc_hover subscribe_bgc_focus subscribe_bgc_disabled"
        >
          {submitT}
        </button>
      </div>

      <div className="form-subscribe__success-message">
        !!! No ha introducido el correo electrónico o no ha aceptado los
        términos.
      </div>

      <div className="form-subscribe__chb">
        <input
          className="form-subscribe__inp-chb"
          id="chb-subscribe"
          type="checkbox"
        />
        <label
          className="form-subscribe__lbl lbl lbl-subscribe"
          htmlFor="chb-subscribe"
        >
          {agreementT}
        </label>
      </div>
    </form>
  );
};

