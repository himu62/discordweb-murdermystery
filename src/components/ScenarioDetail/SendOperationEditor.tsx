import { FC } from "react";
import { Control, Controller, useFieldArray, useWatch } from "react-hook-form";
import { Scenario } from "@/src/store";
import {
  Box,
  Button,
  FormControl,
  Icon,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { saveFile } from "@/src/file";
import { v4 } from "uuid";

type Props = {
  control: Control<Scenario>;
  sceneIndex: number;
  opsIndex: number;
};

const SendOperationEditor: FC<Props> = ({ control, sceneIndex, opsIndex }) => {
  const textChannels = useWatch({ control, name: "textChannels" });
  const {
    fields: files,
    append,
    remove,
  } = useFieldArray({
    control,
    name: `scenes.${sceneIndex}.operations.${opsIndex}.sendOperation.files`,
  });

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
      {files?.map((f, i) => (
        <Box key={f.id}>
          id: {f.id}
          <br />
          name: {f.name}
          <br />
          <Button
            size="small"
            startIcon={<Icon>delete</Icon>}
            color="error"
            onClick={() => remove(i)}
          >
            削除
          </Button>
        </Box>
      ))}
      <Button
        component="label"
        size="small"
        startIcon={<Icon>attach_file</Icon>}
      >
        ファイルを追加する
        <input
          type="file"
          hidden
          onChange={(e) => {
            if (e.target.files) {
              saveFile("hogepiyo", e.target.files[0]);
              append({
                id: v4(),
                name: `${e.target.files[0].name} size:${
                  e.target.files[0].size / 1024
                }KB`,
              });
            }
          }}
        />
      </Button>
    </Box>
  );
};
export default SendOperationEditor;
