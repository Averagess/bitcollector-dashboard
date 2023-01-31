import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GenericLoadingPage from "../components/GenericLoadingPage";
import StatsCotainer from "../components/StatsContainer";
import InventoryContainer from "../components/InventoryContainer";
import AuthContext from "../contexts/AuthContext";
import { getPlayerById } from "../services/playerService";
import { Player } from "../types";

const PlayerProfile = () => {
  const [player, setPlayer] = useState<Player | null>(null);
  const { token } = useContext(AuthContext);
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const Navigate = useNavigate();

  useEffect(() => {
    if (token.length === 0) return Navigate("/");
    if (!id) return Navigate("/dashboard/all-players");

    const fetchPlayerData = async () => {
      try {
        const player = await getPlayerById(id, token);
        setPlayer(player);
        setLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchPlayerData();
  }, []);

  if (loading || !player) return <GenericLoadingPage />;

  return (
    <div className="dashboard-page">
      <div
        className="dashboard-container"
        style={{
          width: "70vw",
          height: "60vh",
          borderRadius: 25,
          overflowY: "auto",
          overflowX: "hidden"
        }}
      >
        <h1 style={{ margin: 0 }}>{player.discordDisplayName}</h1>
        <h3 style={{ margin: 0 }}>{player.discordId}</h3>

        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
          <div style={{ margin: 15, width: "45%" }}>
            <h1 style={{ textDecoration: "underline" }}>Stats</h1>
            <StatsCotainer player={player} />
          </div>

          <div style={{ margin: 15, width: "45%" }}>
            <h1 style={{ textDecoration: "underline" }}>Inventory</h1>
            <InventoryContainer inventory={player.inventory} />
          </div>
        </div>
        <button className="login-button" onClick={() => Navigate("/dashboard/all-players")}>Back to player list</button>
      </div>
    </div>
  );
};

export default PlayerProfile;
