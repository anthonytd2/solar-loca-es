interface ICardProps {
  title: string;
  description: string;
}

import SunIcon from "../assets/sun.svg";

export default function Card({ title, description }: ICardProps) {
  return (
    <div className="card">
      <span>
        <img src={SunIcon} alt="Ícone de destaque" width={64} height={64} />
      </span>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
        <hr />
      </div>
    </div>
  );
}
