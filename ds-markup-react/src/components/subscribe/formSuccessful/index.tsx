import StickerSuccess from "@public/assets/images/subscribe-block/subscr-success/sticker/sticker-success.png";

export const FormSuccessful = () => {
  return (
    <div className="form-block__subscr-successful subscr-successful">
      <div className="subscr-successful__block">
        <p className="subscr-successful__text">
          Fantástico! Espera la primera carta
        </p>
      </div>
      <div className="subscr-successful__img-wrp img-wrp subscr-successful-img-wrp">
        <img
          className="subscr-successful__img img img-subscr-successful"
          src={StickerSuccess}
          alt="etiqueta y sobre de suscripción exitosa"
        />
      </div>
    </div>
  );
};
