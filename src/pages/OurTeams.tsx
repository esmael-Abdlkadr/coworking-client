import PageDisplayer from "../components/PageDisplayer";
import Team from "../components/Team";
import Button from "../components/ui/Button";
import { capitalizeTitle } from "../utils/capitalize";
import team1 from "/team1.jpg";
import team2 from "/team2.jpg";
import team3 from "/team3.jpg";
import team4 from "/team4.jpg";

function OurTeams() {
  return (
    <div>
      <PageDisplayer />

      <div className="flex  flex-col items-center justify-center gap-4  my-14">
        <h2 className="title">our team</h2>
        <div className="flex items-center justify-between">
          <h2 className="main-title">
            {capitalizeTitle("meet the  passionate")}
            <span className="span-title">
              {capitalizeTitle("team behind our sucess")}
            </span>{" "}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 my-10">
          <Team image={team1} name="Hellen Keller" position="Founder and CEO" />
          <Team
            image={team2}
            name="James Browslie"
            position="Co-Founder and CTO"
          />
          <Team image={team3} name="Jane Cooper" position="OPeration Manager" />
          <Team
            image={team4}
            name="Hellen Doon"
            position="Marketing Specalist"
          />
          <Team image={team1} name="Hellen Keller" position="Founder and CEO" />
          <Team
            image={team2}
            name="James Browslie"
            position="Co-Founder and CTO"
          />
          <Team image={team3} name="Jane Cooper" position="OPeration Manager" />
          <Team
            image={team4}
            name="Hellen Doon"
            position="Marketing Specalist"
          />
        </div>
        <Button title="Load More" />
      </div>
    </div>
  );
}

export default OurTeams;
