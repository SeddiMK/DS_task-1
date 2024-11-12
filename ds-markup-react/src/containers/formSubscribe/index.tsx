import { useState } from "react";
import { FormProps } from "@/types/db";
import { validateEmail } from "@/containers/utils/validateEmail";
import { FormSuccessful } from "@/components/subscribe/formSuccessful";
import { insertLinks } from "@/containers/utils/insertLinks";
import "./style.css";

export const FormSubscribe: React.FC<FormProps> = ({
  agreementT,
  submitT,
  emailT,
}) => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isEmailValid, setIsEmailValid] = useState<boolean>();
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    if (!email || !isTermsAccepted) {
      setErrorMessage(
        "No ha introducido el correo electrónico o no ha aceptado los términos.",
      );
      return;
    }

    if (email && !validateEmail(email)) {
      setIsEmailValid(false);
      setErrorMessage("Formato de email inválido, verifique a ortografía.");
      return;
    }

    setIsEmailValid(true);
    setErrorMessage("");

    // Имитация отправки формы
    if (email) {
      let formData = new FormData(e.target as HTMLFormElement);

      // console.table([...formData.entries()]);

      fetch("/upload", {
        method: "POST",
        body: formData,
      })
        .then(() => console.log("Файлы загружены (Имитация)"))
        .catch((reason) => console.error(reason));
    }

    setTimeout(() => {
      setIsSubscribed(true);
    }, 1000);
  };

  return (
    <>
      {!isSubscribed && (
        <form
          id="form-subscribe"
          className="section-subscribe__form form-subscribe"
          action="/registration"
          method="POST"
          onSubmit={handleFormSubmit}
        >
          <div className="form-subscribe__send">
            <div
              id="inp-email-subscribe-wrp"
              className={`form-subscribe__input-wrp`}
            >
              <input
                required
                id="chb-subscribe"
                type="checkbox"
                className="form-subscribe__inp-chb"
                onChange={() => setIsTermsAccepted(!isTermsAccepted)}
              />

              <label
                className="form-subscribe__lbl lbl lbl-subscribe"
                htmlFor="chb-subscribe"
              >
                {insertLinks(agreementT, [
                  "términos y condiciones",
                  "aviso de privacidad",
                ])}
              </label>
              <input
                required
                value={email}
                id="inp-email-subscribe"
                type="email"
                name="form-subscribe[email]"
                data-error="Error"
                placeholder={emailT}
                className={`form-subscribe__input input form-subscribe-input_focus form-subscribe-input_disabled ${email && (isEmailValid ? "correct-inp-wrp" : "error-inp-wrp")}`}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="icon-email"></span>
              <button
                type="submit"
                className="form-subscribe__btn btn subscribe-btn subscribe_bgc_active subscribe_bgc_hover subscribe_bgc_focus subscribe_bgc_disabled"
              >
                {submitT}
              </button>
              {errorMessage && (
                <div className="form-subscribe__success-message">
                  {errorMessage}
                </div>
              )}
            </div>
          </div>
        </form>
      )}
      {isSubscribed && <FormSuccessful />}
    </>
  );
};
