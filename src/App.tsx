import { Box, Card, Tab, Tabs, ThemeProvider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { DK64Item, DKBBanana, GameOptions } from "./classes";
import { DK64Game, DKBGame, GameConfig } from "./components";
import { DKButton, DKRoomDialog } from "./inputs";
import { socket } from "./server/socket";
import { theme } from "./utils/theme";
import { type GameType, type LastGot } from "./utils/types";

const App = () => {
  const [roomCreateOpen, setRoomCreateOpen] = useState(true);
  const [playerName, setPlayerName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastGot, setLastGot] = useState<LastGot | null>(null);

  const [game, setGame] = useState<GameType>("DKB");
  const [gameOptions, setGameOptions] = useState<GameOptions | null>(null);
  const [goLabel, setGoLabel] = useState("");
  const [start, setStart] = useState(false);

  const setupAction = () => {
    socket.emit("join_room", roomName);
  };

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    const updateLastItem = (
      item: DK64Item | DKBBanana,
      index: number,
      playerId: string
    ) => {
      setLastGot({
        item,
        index,
        playerId
      });
    };

    const goEvent = () => {
      setStart(true);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("item_got", updateLastItem);
    socket.on("go", goEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("item_got", updateLastItem);
      socket.off("go", goEvent);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Card>
        <img src="./img/squawks.png" height={50} width={50} />
        <Typography color="textPrimary" variant="h1">
          Squawksatoo
        </Typography>
        <img
          src="./img/squawks.png"
          height={50}
          width={50}
          style={{ transform: "scaleX(-1)" }}
        />
      </Card>

      {!start && (
        <>
          <DKRoomDialog
            open={roomCreateOpen}
            setOpen={setRoomCreateOpen}
            playerName={playerName}
            setPlayerName={setPlayerName}
            roomName={roomName}
            setRoomName={setRoomName}
            setupAction={setupAction}
          />

          {playerName && roomName && (
            <span style={{ position: "absolute", top: "5rem", left: "10px" }}>
              <Typography color="textPrimary" variant="h2">
                Player: {playerName}
              </Typography>
              <Typography color="textPrimary" variant="h2">
                Room: {roomName}
              </Typography>
            </span>
          )}

          <Tabs
            centered
            value={game}
            onChange={(_, newValue) => setGame(newValue)}
          >
            <Tab label="DKB" value="DKB" />
            <Tab label="DK64" value="DK64" />
          </Tabs>

          <GameConfig
            currentGame={game}
            setOptions={setGameOptions}
            setGoLabel={setGoLabel}
          />

          <Box sx={{ textAlign: "center" }}>
            <DKButton
              label={goLabel}
              handleClick={() => {
                socket.emit("start", roomName);
                setStart(true);
              }}
            />
          </Box>
        </>
      )}
      {start && gameOptions && (
        <>
          {game === "DKB" && gameOptions.bananas.length > 0 && (
            <DKBGame
              options={gameOptions}
              setOptions={setGameOptions}
              setStart={setStart}
            />
          )}
          {game === "DK64" && gameOptions.items.length > 0 && (
            <DK64Game
              options={gameOptions}
              setOptions={setGameOptions}
              setStart={setStart}
              isConnected={isConnected}
              socket={socket}
              lastGot={lastGot}
              playerName={playerName}
              roomName={roomName}
            />
          )}
        </>
      )}
    </ThemeProvider>
  );
};

export default App;
