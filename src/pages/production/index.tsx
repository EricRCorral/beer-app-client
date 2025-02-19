import { Text } from "../../components";
import {
  Acondicionamiento,
  Carbonatacion,
  Embotellado,
  EnfriadorMosto,
  Fermentacion,
  Lautering,
  LavadoGranos,
  Lupulizacion,
  Macerado,
  MolerGranos,
  Whirlpool,
} from "../../assets/img";

import "./production.css";

const Production = () => (
  <div className="production">
    <div className="step">
      <img src={MolerGranos} />
      <Text tag="h2">Molienda del Grano</Text>
      <Text>
        Este proceso consiste en triturar la malta para que el agua pueda
        extraer los azúcares y otros compuestos necesarios durante la
        maceración. El objetivo es romper la cáscara sin pulverizar el grano,
        asegurando una correcta conversión de los almidones en azúcares
        fermentables.
      </Text>
    </div>
    <div className="step">
      <img src={Macerado} />
      <Text tag="h2">Maceración</Text>
      <Text>
        La malta molida se mezcla con agua caliente en un recipiente llamado
        macerador. Durante este proceso, las enzimas presentes en la malta
        convierten los almidones en azúcares fermentables. La temperatura y el
        tiempo de maceración afectan el perfil final de la cerveza, influyendo
        en el cuerpo y la dulzura del producto.
      </Text>
    </div>
    <div className="step">
      <img src={Lautering} />
      <Text tag="h2">Lautering y Recirculación</Text>
      <Text>
        Después de la maceración, el mosto (líquido rico en azúcares) se separa
        de los sólidos a través de un proceso de filtrado conocido como
        lautering. Se realiza una recirculación del líquido para clarificarlo,
        devolviendo el mosto al macerador varias veces antes de extraerlo por
        completo.
      </Text>
    </div>
    <div className="step">
      <img src={LavadoGranos} />
      <Text tag="h2">Lavado del Grano</Text>
      <Text>
        Para aprovechar la mayor cantidad de azúcares posibles, se enjuagan los
        granos con agua caliente en un proceso llamado sparging. Esto permite
        recuperar los azúcares que aún quedan en los granos y aumentar la
        eficiencia del proceso.
      </Text>
    </div>
    <div className="step">
      <img src={Lupulizacion} />
      <Text tag="h2">Ebullición y Adición de Lúpulo</Text>
      <Text>
        El mosto recolectado se lleva a ebullición durante un tiempo
        determinado. Durante esta fase, se agregan los lúpulos en diferentes
        momentos para aportar amargor, sabor y aroma. La ebullición también
        ayuda a esterilizar el mosto y a eliminar compuestos no deseados.
      </Text>
    </div>
    <div className="step">
      <img src={Whirlpool} />
      <Text tag="h2">Whirlpool y Sedimentación</Text>
      <Text>
        Al finalizar la ebullición, se realiza un remolino (whirlpool) para
        concentrar los sólidos y restos de lúpulo en el centro del hervidor.
        Esto facilita la eliminación de impurezas antes del enfriamiento.
      </Text>
    </div>
    <div className="step">
      <img src={EnfriadorMosto} />
      <Text tag="h2">Enfriamiento del Mosto</Text>
      <Text>
        El mosto caliente se enfría rápidamente a la temperatura adecuada para
        la fermentación utilizando intercambiadores de calor. Esto evita la
        proliferación de bacterias no deseadas y ayuda a mantener la estabilidad
        del producto.
      </Text>
    </div>
    <div className="step">
      <img src={Fermentacion} />
      <Text tag="h2">Fermentación</Text>
      <Text>
        Se transfiere el mosto enfriado a un fermentador y se inocula la
        levadura, que convertirá los azúcares en alcohol y CO2. Este proceso
        puede durar desde unos días hasta varias semanas, dependiendo del tipo
        de cerveza y levadura utilizada.
      </Text>
    </div>
    <div className="step">
      <img src={Carbonatacion} />
      <Text tag="h2">Maduración y Carbonatación</Text>
      <Text>
        Después de la fermentación primaria, la cerveza se deja madurar para que
        los sabores se integren y se refinen. En esta fase también puede
        producirse la carbonatación natural o añadirse CO2 para obtener el nivel
        de gas adecuado.
      </Text>
    </div>
    <div className="step">
      <img src={Embotellado} />
      <Text tag="h2">Filtrado y Embotellado</Text>
      <Text>
        Una vez madura, la cerveza puede ser filtrada para eliminar sedimentos y
        mejorar su claridad. Luego, se envasa en botellas, barriles o latas, y
        se sella para su conservación.
      </Text>
    </div>
    <div className="step">
      <img src={Acondicionamiento} />
      <Text tag="h2">Acondicionamiento y Degustación</Text>
      <Text>
        Antes de su consumo, la cerveza embotellada suele reposar un tiempo para
        terminar de desarrollar su perfil de sabor y gasificación. Finalmente,
        está lista para ser degustada.
      </Text>
    </div>
  </div>
);

export default Production;
