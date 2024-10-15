import { BeastGrid, BeastGridConfig, ColumnDef } from "beast-grid";
import "beast-grid/style.css";
import usePokemon from "../../hooks/use-pokemon/usePokemon";
import "./grid.css";
const Grid = () => {
  const { data, increaseLimit } = usePokemon();

  const columnDefs: ColumnDef[] = [
    { headerName: "ID", field: "id", width: 100 },
    { headerName: "Nombre", field: "name", width: 100 },
    { headerName: "Altura", field: "height", width: 100 },
    { headerName: "Peso", field: "weight", width: 100 },
  ];

  const config: BeastGridConfig<any> = {
    columnDefs,
    data,
    style: {
      border: true,
    },
    sort: {
      enabled: true,
      multiple: true,
    },
    loadingState: {
      rows: 10,
      skeleton: <div className="skeleton"></div>,
    },
  };

  return (
    <div style={{ height: 600, width: 600 }}>
      <button onClick={increaseLimit}>Increase Limit</button>
      <BeastGrid config={config} />
    </div>
  );
};

export default Grid;
