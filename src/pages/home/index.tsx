import { Button, Text, Collage } from "../../components";
import { Us, BeerProduction, GoogleMaps } from "../../assets/img";
import { Link } from "react-router-dom";
import { Beer } from "../../types/Beer";
import useFetch from "../../hooks/useFetch";
import BeerVideo from "../../assets/videos/beer.mp4";

import "./home.css";

const SECTIONS = [
  {
    img: Us,
    text: "Nacida en San Miguel, Buenos Aires, nuestra cervecería fue fundada por una pareja apasionada por la buena cerveza. Inspirados en recetas tradicionales y con el sueño de crear algo único, comenzaron en un pequeño garaje. Hoy, seguimos elaborando cerveza artesanal con la misma dedicación y amor por el oficio.",
    title: "Nuestra historia",
    url: "sobre-nosotros",
  },
  {
    img: BeerProduction,
    text: "Nuestra cerveza se elabora con ingredientes seleccionados y un proceso artesanal que combina tradición e innovación. Desde la maceración hasta la fermentación, cada paso es cuidadosamente controlado para garantizar sabor y calidad. Usamos agua pura, maltas especiales y lúpulos frescos para lograr un producto equilibrado y lleno de carácter.",
    title: "Como lo hacemos?",
    url: "produccion",
  },
  {
    img: GoogleMaps,
    text: "Nos encontramos en el corazón de San Miguel, Buenos Aires, un lugar donde la tradición cervecera cobra vida. Nuestro espacio invita a disfrutar de una experiencia única, con ambiente cálido, música y, por supuesto, la mejor cerveza artesanal. Vení a conocernos y descubrí el verdadero sabor de la pasión cervecera.",
    title: "Donde estamos?",
    url: "contacto",
  },
];

const Home = () => {
  // WIP: IN FUTURE THE IDEA IS USE THE MOST SOLD BEERS. ALWAYS TOP 6. FOR NOW I AM GOING TO SLICE THEM IN COLLAGE COMPONENT
  // IMPORTANT NOTE: I MODIFIED THE /BEERS ENDPOINT TO RECEIVE THE DESCRIPTION FIELD BUT WHEN I WILL HAVE THE TOP 6 ENDPOINT
  // ROLLBACK THIS AND NOT RETURN DESCRIPTION IN /BEERS ENDPOINT

  const { data, loading, error } = useFetch<Beer[]>(
    "https://mature-halibut-neatly.ngrok-free.app/beers"
  );

  return (
    <div className="home">
      <video id="myVideo" src={BeerVideo} width="100%" muted autoPlay loop />
      <div className="sections">
        {SECTIONS.map(({ img, text, title, url }) => (
          <section key={title}>
            <img src={img} alt="Img" />
            <div className="info">
              <Text tag="h1">{title}</Text>
              <Text>{text}</Text>
              <Link to={url}>
                <Button>Ver mas</Button>
              </Link>
            </div>
          </section>
        ))}
      </div>
      <Text tag="h1">Mas vendidas</Text>
      <Collage beers={data} loading={loading} error={error} />
    </div>
  );
};

export default Home;
