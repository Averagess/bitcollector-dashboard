import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AuthContext from "../contexts/AuthContext";
import { getPlayerById } from "../services/playerService";
import { Player } from "../types";

import {
  PageContainer,
  MainContent,
  GenericButton,
  InventoryContainer,
  StatsContainer,
  GenericLoadingPage,
} from "../components";

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
    <PageContainer>
      <MainContent classes="overflow-x-hidden overflow-y-auto my-auto">
        <h1 className="text-4xl font-bold">{player.discordDisplayName}</h1>
        <h3 className="text-2xl font-bold">{player.discordId}</h3>

        <div className="flex justify-between flex-wrap">
          <div className="m-4 w-1/2">
            <h1 style={{ textDecoration: "underline" }}>Stats</h1>
            <StatsContainer player={player} />
          </div>

          <div className="m-4 w-1/2">
            <h1 className="underline">Inventory</h1>
            <InventoryContainer inventory={player.inventory} />
          </div>
        </div>
        <GenericButton onClick={() => Navigate("/dashboard/all-players")}>
          Back to player list
        </GenericButton>
      </MainContent>
    </PageContainer>
  );
};

export default PlayerProfile;
