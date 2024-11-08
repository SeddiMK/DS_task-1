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

// import React, { useState } from "react";
// import "./Form.css"; // Подключение CSS для стилизации

// export const Form = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//   });

//   const [touched, setTouched] = useState({
//     name: false,
//     email: false,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleBlur = (e) => {
//     const { name } = e.target;
//     setTouched({
//       ...touched,
//       [name]: true,
//     });
//   };

//   const isNameValid = formData.name.trim().length > 2;
//   const isEmailValid = /\S+@\S+\.\S+/.test(formData.email);

//   return (
//     <form>
//       <div className="form-field">
//         <label>Name:</label>
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           onBlur={handleBlur}
//           className={touched.name ? (isNameValid ? "valid" : "invalid") : ""}
//         />
//       </div>
//       <div className="form-field">
//         <label>Email:</label>
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           onBlur={handleBlur}
//           className={touched.email ? (isEmailValid ? "valid" : "invalid") : ""}
//         />
//       </div>
//       <button type="submit">Submit</button>
//     </form>
//   );
// };
