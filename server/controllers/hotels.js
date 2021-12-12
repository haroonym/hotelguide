/* eslint-disable operator-linebreak */
// eslint-disable-next-line spaced-comment
/*eslint max-len: ["error", { "code": 250 }] */

const asyncHandler = require('express-async-handler');
const model = require('../model/hotels');

const getHotels = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (req.query.id) {
    const rows = await model.getHotelByID(req.query);
    if (rows.length === 0) {
      res.status(404).send(`Das Hotel mit der ID ${id} wurde in unserem System nicht gefunden`);
    } else res.status(200).json(rows);
  } else {
    res.status(200).json(await model.getHotels());
  }
});

const getHotelDistrict = asyncHandler(async (req, res) => {
  const { bzrkName } = req.params;
  const rows = await model.getHotelDistrict(req.params.bzrkName);
  if (rows.length === 0) {
    res
      .status(404)
      .send(
        `Für den Bezirk ${bzrkName} haben wir leider kein Hotel gespeichert. Bitte suchen Sie nach einem anderen Bezirk oder überprüfen Sie nochmal Ihre Eingabe`,
      );
  } else res.status(200).json(rows);
});

const getHotelAusstattungen = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const rows = await model.getHotelAusstattungen(id);
  if (rows.length === 0) {
    res
      .status(404)
      .send(
        `Für das Hotel mit der ID ${id} haben wir leider kein Ausstattungen gespeichert. Bitte suchen Sie nach einem anderen Hotel oder überprüfen Sie nochmal Ihre Eingabe`,
      );
  } else res.status(200).json(rows);
});

const postHotel = asyncHandler(async (req, res) => {
  const { name, preisProNacht, bewertung, unterkunftsart, postleitzahl, beschreibung } = req.body;
  if (
    name == null ||
    preisProNacht == null ||
    bewertung == null ||
    unterkunftsart == null ||
    postleitzahl == null ||
    beschreibung == null
  ) {
    res
      .status(404)
      .send('One or more properties missing: name, preisProNacht, bewertung, unterkunftsart, postleitzahl, beschreibung');
  } else {
    try {
      await model.postHotel(req.body);
      res.status(200).send('Erfolgreich');
    } catch (error) {
      res.status(404).send('Fehlgeschlagen');
    }
  }
});

const deleteHotel = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const rows = await model.getHotel({ id });
  if (rows.length > 0) {
    model.deleteHotel(id);
    res.status(200).send(`Das Hotel mit der ID ${id} wurde erfolgreich gelöscht`);
  } else {
    res.status(404).send(`Das folgende Hotel mit der ID ${id} wurde nicht gefunden`);
  }
});

const changeHotelProps = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const rows = await model.getHotel({ id });
  if (rows.length > 0) {
    try {
      await model.changeHotelProps(id, req.body);
    } catch (error) {
      res.status(200).send('Fehlgeschlagen');
    }
    res.status(200).send('Erfolgreich geupdated');
  } else {
    res.status(404).send(`Das Hotel mit der ID ${id} wurde nicht gefunden`);
  }
});

module.exports = {
  getHotels,
  postHotel,
  getHotelDistrict,
  deleteHotel,
  changeHotelProps,
  getHotelAusstattungen,
};
