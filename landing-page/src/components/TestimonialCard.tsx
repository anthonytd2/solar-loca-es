interface ITestimonialCardProps {
  testimony: string;
  rating: number;
  name: string;
  role: string;
}

export default function TestimonialCard({
  testimony,
  rating,
  name,
  role,
}: ITestimonialCardProps) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<span key={i} style={{ color: "#F2C94C", fontSize: "1.2rem" }}>★</span>);
    } else {
      stars.push(<span key={i} style={{ color: "#E4E4E4", fontSize: "1.2rem" }}>★</span>);
    }
  }

  return (
    <div className="carousel-card">
      {/* Aqui entra a lógica que extrai a primeira letra do nome */}
      <div className="avatar-initial">
        {name.charAt(0)}
      </div>
      
      <span className="testimony">
        <p>"{testimony}"</p>
      </span>
      <span className="rating">{stars}</span>
      <span className="names">
        <p>{name}</p>
        <p>{role}</p>
      </span>
    </div>
  );
}