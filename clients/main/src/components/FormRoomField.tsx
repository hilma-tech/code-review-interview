import { ErrorMsg, useField } from "@hilma/forms";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { produce } from "immer";
import { IconButton, Typography } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddIcon from "@mui/icons-material/Add";

import { type DepartmentPageFormValues } from "../pages/DepartmentPage";
import { HEBREW } from "../hebrew";

import { StyledInput } from "./StyledInput";

interface RoomItemProps {
  room: DepartmentPageFormValues["rooms"][number];
  onNameChange: (value: string) => void;
  onCodeChange: (value: string) => void;
  canRemove: boolean;
  onRemove: () => void;
  nameError: string | undefined;
}

function RoomItem({
  room,
  onNameChange,
  onCodeChange,
  canRemove,
  onRemove: handleRemove,
  nameError,
}: RoomItemProps) {
  return (
    <Stack gap="1rem" direction="row">
      <Stack>
        <StyledInput
          value={room.name}
          placeholder={HEBREW.roomName}
          onChange={(e) => onNameChange(e.target.value)}
          error={!!nameError}
        />

        {!!nameError && <ErrorMsg error={nameError} />}
      </Stack>

      <StyledInput
        value={room.roomCode ?? ""}
        placeholder={HEBREW.roomCode}
        onChange={(e) => onCodeChange(e.target.value)}
      />

      <IconButton
        sx={{ alignSelf: "start" }}
        color="primary"
        disabled={!canRemove}
        onClick={handleRemove}
      >
        <RemoveCircleOutlineIcon />
      </IconButton>
    </Stack>
  );
}

interface FormRoomFieldProps {
  name: string;
}

export function FormRoomField({ name }: FormRoomFieldProps) {
  const [field, meta, helpers] =
    useField<DepartmentPageFormValues["rooms"]>(name);

  function handleKeyChange(i: number, key: "name" | "roomCode") {
    return function (value: string) {
      void helpers.setValue(
        produce(field.value, (draft) => {
          draft[i][key] = value;
        }),
      );
    };
  }

  function handleRemove(i: number) {
    return function () {
      void helpers.setValue(
        produce(field.value, (draft) => {
          draft.splice(i, 1);
        }),
      );
    };
  }

  function handleAddRoomClick() {
    void helpers.setValue(
      produce(field.value, (draft) => {
        draft.push({ name: "" });
      }),
    );
  }

  return (
    <Stack gap="1rem" width="100%">
      <Typography color="primary">{HEBREW.rooms}</Typography>

      {field.value.map((room, i) => (
        <RoomItem
          key={i}
          room={room}
          canRemove={field.value.length > 1}
          onNameChange={handleKeyChange(i, "name")}
          onCodeChange={handleKeyChange(i, "roomCode")}
          onRemove={handleRemove(i)}
          nameError={
            meta.error &&
            (meta.touched || undefined) &&
            (meta.error as unknown as { name: string }[])[i]?.name
          }
        />
      ))}

      <Button
        variant="contained"
        sx={{ alignSelf: "start" }}
        onClick={handleAddRoomClick}
        startIcon={<AddIcon />}
      >
        {HEBREW.addRoom}
      </Button>
    </Stack>
  );
}
