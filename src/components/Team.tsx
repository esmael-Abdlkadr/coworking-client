interface TeamProps {
  image: string;
  name: string;
  position: string;
}

function Team({ image, name, position }: TeamProps) {
  return (
    <div className="w-[280px] h-[400px] relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
      {/* Image */}
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover rounded-2xl group-hover:scale-110 transition-transform duration-500"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

      {/* Info Card */}
      <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg flex flex-col items-center gap-2 transition-transform duration-500 group-hover:translate-y-0 translate-y-8 opacity-0 group-hover:opacity-100">
        <h2 className="text-white text-xl font-semibold">{name}</h2>
        <p className="text-white/80 text-lg">{position}</p>
      </div>
    </div>
  );
}

export default Team;
