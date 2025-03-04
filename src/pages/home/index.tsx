import BeerVideo from "../../assets/videos/beer.mp4";
import { Button, Text, Collage } from "../../components";
import {
  CervezaIpa,
  CervezaIpa2,
  CervezaNegra,
  CervezaRoja,
  CervezaRubia,
  CervezaRubia2,
  Us,
  BeerProduction,
  GoogleMaps,
} from "../../assets/img";
import { Link } from "react-router-dom";

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

const BEST_SELLERS = [
  {
    id: 1,
    image: CervezaRubia,
    title: "Rubia",
    description: "Refrescante y ligera, con matices maltosos y suaves.",
  },
  {
    id: 2,
    image: CervezaRubia2,
    title: "Dorada",
    description: "Dorada y afrutada, con final ligeramente dulce.",
  },
  {
    id: 3,
    image: CervezaNegra,
    title: "Stout",
    description: "Profunda y cremosa, con notas de café y chocolate.",
  },
  {
    id: 4,
    image: CervezaRoja,
    title: "Scottish",
    description: "Caramelo y tostado, con amargor moderado y cuerpo medio.",
  },
  {
    id: 5,
    image: CervezaIpa2,
    title: "Amber Ale",
    description:
      "Intensa y lupulada, con notas cítricas y amargas bien marcadas.",
  },
  {
    id: 6,
    image: CervezaIpa,
    title: "IPA",
    description: "Versión más aromática y resinosa, con cuerpo equilibrado.",
  },
];

// WIP: CREATE THIS FUNCTION
const addToCart = (id: string | number) => {
  console.log(id);
};

const Home = () => (
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
    <Collage items={BEST_SELLERS} addToCart={addToCart} />
  </div>
);

export default Home;
