import "../CSS/Rules.css";
import RulesBannerDisplay from "./RulesBannerDisplay";
import RulesWarDisplay from "./RulesWarDisplay";
import RulesSpeedDisplay from "./RulesSpeedDisplay";
import RulesMemDisplay from "./RulesMemDisplay";
import RulesPickupDisplay from "./RulesPickupDisplay";
export default function Rules() {
  return (
    <>
      <div id="page-layout" class="container-fluid"  style={{paddingTop:"80px"}}>
            <RulesBannerDisplay />
            <RulesWarDisplay />
            <RulesSpeedDisplay />
            <RulesMemDisplay />
            <RulesPickupDisplay />
      </div>
    </>
  );
}
