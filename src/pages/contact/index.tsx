import { useContext, useState } from "react";
import { Button, Input, Text } from "../../components";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { SnackBarContext } from "../../context";

import "./contact.css";
import "leaflet/dist/leaflet.css";

type Form = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const INITIAL_FORM_VALUE = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

const Contact = () => {
  const { setSnackBar } = useContext(SnackBarContext);

  const [{ email, message, name, phone }, setForm] =
    useState(INITIAL_FORM_VALUE);

  const handleFormValue = (key: keyof Form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setForm(INITIAL_FORM_VALUE);

    setSnackBar({ message: "Mensaje enviado correctamente", color: "success" });
  };

  return (
    <div className="contact">
      <Text tag="h3">
        Envianos un mensaje y en la brevedad nos pondremos en contacto contigo
      </Text>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <Text tag="label">Nombre</Text>
            <Input
              required
              value={name}
              onChange={({ target }) => handleFormValue("name", target.value)}
            />
          </div>
          <div>
            <Text tag="label">Email</Text>
            <Input
              required
              type="email"
              value={email}
              onChange={({ target }) => handleFormValue("email", target.value)}
            />
          </div>
          <div>
            <Text tag="label">Teléfono</Text>
            <Input
              required
              type="number"
              value={phone}
              onChange={({ target }) => handleFormValue("phone", target.value)}
            />
          </div>
        </div>
        <Text tag="h2">Mensaje</Text>
        <textarea
          required
          minLength={50}
          value={message}
          onChange={({ target }) => handleFormValue("message", target.value)}
        />
        <Button>Enviar</Button>
      </form>
      <Text tag="h3">Puedes encontrarnos en San Miguel</Text>
      <MapContainer
        center={[-34.542653, -58.711942]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[-34.542653, -58.711942]} />
      </MapContainer>
    </div>
  );
};

export default Contact;
