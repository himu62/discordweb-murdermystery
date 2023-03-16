import { FC } from "react";
import { Control, Controller, useWatch } from "react-hook-form";
import { Scenario } from "@/src/store";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

type Props = {
  control: Control<Scenario>;
  sceneIndex: number;
  opsIndex: number;
};

const SendOperationEditor: FC<Props> = ({ control, sceneIndex, opsIndex }) => {
  const textChannels = useWatch({ control, name: "textChannels" });

  return (
    <Box sx={{ mx: 1, mt: 2, mb: 0 }}>
      <FormControl size="small" fullWidth sx={{ mb: 2 }}>
        <InputLabel htmlFor={`select-operation-send-${sceneIndex}-${opsIndex}`}>
          送信先のチャンネル
        </InputLabel>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              id={`select-operation-send-${sceneIndex}-${opsIndex}`}
              label="送信先のチャンネル"
              fullWidth
              value={value}
              onChange={(e) => onChange(e.target.value)}
            >
              {textChannels.map((c) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.name}
                </MenuItem>
              ))}
            </Select>
          )}
          name={`scenes.${sceneIndex}.operations.${opsIndex}.sendOperation.destination`}
        />
      </FormControl>

      <TextField
        label="送信するテキスト"
        multiline
        size="small"
        fullWidth
        minRows={2}
        maxRows={10}
        sx={{ mb: 2 }}
        {...control.register(
          `scenes.${sceneIndex}.operations.${opsIndex}.sendOperation.text`
        )}
      />

      {/* セキュリティの観点からファイルのパスは取得できない。BlobデータをそのままLocalStorageに取り込むか？5MBまでなら、、 */}
      {/* ファイル一覧のUI 削除もできるとよし */}
      <Button component="label">
        ファイルを追加する
        <input
          type="file"
          hidden
          onChange={(e) => {
            console.log(e);
            console.log(e.target.value);
          }}
        />
      </Button>
    </Box>
  );
};
export default SendOperationEditor;
