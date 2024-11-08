import { FormProps } from "@/types/db";
import { useEffect, useState } from "react";
import { validateEmail } from "../../validateEmail";
import { FormSuccessful } from "../../../components/subscribe/formSuccessful";
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
    // Отправка файлов на backend
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
      console.log(email);
      setIsSubscribed(true);
    }, 1000);
  };

  useEffect(() => {}, [isSubscribed]);

  console.log(isEmailValid, "isEmailValid");
  console.log(isSubscribed, "isSubscribed");
  console.log(isTermsAccepted, "isTermsAccepted");
  console.log(Boolean(email), "Boolean(email)");

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
              className={`form-subscribe__input-wrp ${email && (isEmailValid ? "correct-inp-wrp" : "error-inp-wrp")}`}
            >
              <input
                value={email}
                id="inp-email-subscribe"
                type="email"
                name="form-subscribe[email]"
                data-error="Error"
                placeholder={emailT}
                className="form-subscribe__input input form-subscribe-input_focus form-subscribe-input_disabled"
                // style={{
                //   borderColor: isEmailValid ? "var(--grass)" : "var(--tangerine)",
                //   borderWidth: "2px",
                // }}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="form-subscribe__btn btn subscribe-btn subscribe_bgc_active subscribe_bgc_hover subscribe_bgc_focus subscribe_bgc_disabled"
            >
              {submitT}
            </button>
          </div>

          {errorMessage && (
            <div className="form-subscribe__success-message">
              {errorMessage}
            </div>
          )}

          <div className="form-subscribe__chb">
            <input
              id="chb-subscribe"
              type="checkbox"
              className="form-subscribe__inp-chb"
              onChange={() => setIsTermsAccepted(!isTermsAccepted)}
            />
            <label
              className="form-subscribe__lbl lbl lbl-subscribe"
              htmlFor="chb-subscribe"
            >
              {agreementT}
            </label>
          </div>
        </form>
      )}
      {isSubscribed && <FormSuccessful />}
    </>
  );
};
