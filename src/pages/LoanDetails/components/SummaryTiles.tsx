import StatCard from "../../../components/cards/StatCard";

export type TileItem = {
  label: string;
  value: string;
  green?: boolean;
};

type Props = {
  tiles: TileItem[];
};

const SummaryTiles = ({ tiles }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
      {tiles.map((tile) => (
        <StatCard
          key={tile.label}
          title={tile.label}
          value={tile.value}
          green={tile.green}
          className="min-w-0"
        />
      ))}
    </div>
  );
};

export default SummaryTiles;
