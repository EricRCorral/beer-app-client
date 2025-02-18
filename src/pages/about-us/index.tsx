import { Text } from "../../components";

import "./about-us.css";

const AboutUs = () => (
  <div className="about-us">
    <div className="parallax couple">
      <Text>
        Todo comenzó en un pequeño garaje de San Miguel, Buenos Aires, donde una
        pareja de apasionados cerveceros decidió experimentar con recetas
        propias. Inspirados por los sabores auténticos y las técnicas
        tradicionales, pasaron meses perfeccionando su primera cerveza,
        compartiéndola con amigos y vecinos que pronto se convirtieron en sus
        primeros clientes.
      </Text>
      <Text tag="h1">Inicios</Text>
      <Text>
        Con el tiempo, el boca a boca hizo su magia, y la demanda creció más de
        lo que podían imaginar. Decidieron formalizar su pasión y fundaron la
        cervecería con un claro objetivo: ofrecer una cerveza artesanal de
        calidad, hecha con ingredientes seleccionados y procesos cuidadosos,
        manteniendo siempre ese toque casero y cercano que la hacía especial.
      </Text>
    </div>

    <div className="separator" />

    <div className="parallax group">
      <Text>
        Lo que comenzó como un sueño de dos personas pronto se convirtió en un
        proyecto mucho más grande. Con la llegada de un equipo comprometido y
        talentoso, la cervecería amplió su producción, incorporando nuevos
        estilos y mejorando su equipamiento sin perder la esencia artesanal que
        la definía. Cada nuevo miembro aportó ideas y técnicas que llevaron la
        cerveza a un nivel superior.
      </Text>
      <Text tag="h1">Hoy</Text>
      <Text>
        Hoy, la cervecería cuenta con un equipo sólido que trabaja con la misma
        pasión del primer día. Han participado en festivales cerveceros, ganado
        reconocimientos y logrado distribuir su producto en bares y locales de
        toda la ciudad. Pero más allá del crecimiento, lo más importante sigue
        siendo la comunidad que han construido en torno a su cerveza: un punto
        de encuentro para quienes disfrutan de un buen brindis con historia.
      </Text>
    </div>
  </div>
);

export default AboutUs;
