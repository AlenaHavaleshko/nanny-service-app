import css from "./NanniesList.module.css";
import NannyCard from "../NannyCard/NannyCard";
import type { Nanny } from "../../types/types";

interface NanniesListProps {
  nannies: Nanny[];
}
export default function NanniesList({ nannies }: NanniesListProps) {
  return (
    <div className={css.nannies_list}>
      {nannies.map((nanny) => (
        <NannyCard key={nanny.name} nanny={nanny} />
      ))}
    </div>
  );
}
