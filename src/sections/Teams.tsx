import Team from "../components/Team";
import Button from "../components/ui/Button";
import { capitalizeTitle } from "../utils/capitalize";

import team1 from "/team1.jpg";
import team2 from "/team2.jpg";
import team3 from "/team3.jpg";
import team4 from "/team4.jpg";

interface TeamsProps {
  isPage?: boolean;
}

function Teams({ isPage }: TeamsProps) {
  return (
    <section className={`w-full ${isPage ? "bg-black" : "bg-[#cbd5e1]"} py-16`}>
      <div className="px-6 md:px-12 lg:px-20 flex flex-col gap-12">
        {/* Title */}
        <h2
          className={`uppercase text-3xl ${
            isPage ? "text-white/90" : "text-black/80"
          } tracking-[5px] text-center lg:text-left`}
        >
          Our Teams
        </h2>

        {/* Header and Button */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <h2
            className={`text-4xl md:text-6xl font-semibold ${
              isPage ? "text-white/90" : "text-black/80"
            } capitalize text-center lg:text-left`}
          >
            {capitalizeTitle("meet the passionate")}{" "}
            <span className="text-primary-100">
              {capitalizeTitle("team behind our success")}
            </span>
          </h2>
          <Button title="View All" />
        </div>

        {/* Team Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          <Team image={team1} name="Hellen Keller" position="Founder and CEO" />
          <Team
            image={team2}
            name="James Browslie"
            position="Co-Founder and CTO"
          />
          <Team image={team3} name="Jane Cooper" position="Operation Manager" />
          <Team
            image={team4}
            name="Hellen Doon"
            position="Marketing Specialist"
          />
        </div>
      </div>
    </section>
  );
}

export default Teams;
