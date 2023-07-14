import { FC, useEffect, useState } from "react";
import { Control, Controller, useFieldArray, useWatch } from "react-hook-form";
import { Scenario } from "@/src/store";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Icon,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { saveFile } from "@/src/file";
import { v4 } from "uuid";

type Props = {
  control: Control<Scenario>;
  sceneIndex: number;
  opsIndex: number;
};

const SendOperationEditor: FC<Props> = ({ control, sceneIndex, opsIndex }) => {
  const scenarioId = useWatch({ control, name: "id" });
  const textChannels = useWatch({ control, name: "textChannels" });
  const {
    fields: variables,
    append: appendVariable,
    remove: removeVariable,
  } = useFieldArray({
    control,
    name: `scenes.${sceneIndex}.operations.${opsIndex}.sendOperation.variables`,
  });
  const {
    fields: files,
    append: appendFile,
    remove: removeFile,
  } = useFieldArray({
    control,
    name: `scenes.${sceneIndex}.operations.${opsIndex}.sendOperation.files`,
  });
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<{
    rows?: number;
    minRows?: number;
    maxRows?: number;
  }>({ rows: 2 });

  useEffect(() => {
    setRows({ minRows: 2, maxRows: 10 });
  }, []);

  const parseVariables = (text: string): string[] => {
    const m = text.match(/(?<=\{\{)(\w+)(?=}})/gm) ?? [];
    return m.filter((v, i, a) => a.indexOf(v) === i);
  };

  return (
    <Box sx={{ mx: 1, mt: 2, mb: 0 }}>
      <FormControl size="small" fullWidth sx={{ mb: 2 }}>
        <InputLabel htmlFor={`select-operation-send-${sceneIndex}-${opsIndex}`}>
          送信先のチャンネル（複数選択可）
        </InputLabel>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              id={`select-operation-send-${sceneIndex}-${opsIndex}`}
              label="送信先のチャンネル（複数選択可）"
              fullWidth
              value={value ?? []}
              multiple
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

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
            label="送信するテキスト"
            multiline
            size="small"
            fullWidth
            {...rows}
            value={value}
            onChange={(e) => {
              const m = e.target.value.match(/(?<=\{\{)(\w+)(?=}})/gm) ?? [];
              const keys = m.filter((v, i, a) => a.indexOf(v) === i);

              variables.forEach((v, i) => {
                if (!keys.includes(v.key)) {
                  removeVariable(i);
                }
              });

              keys.forEach((v) => {
                if (!variables.map((o) => o.key).includes(v)) {
                  appendVariable({ id: v4(), key: v });
                }
              });

              onChange(e.target.value);
            }}
          />
        )}
        name={`scenes.${sceneIndex}.operations.${opsIndex}.sendOperation.text`}
      />

      {variables && variables.length > 0 && (
        <Typography>
          パラメータ：{variables?.map((v) => v.key).join(", ")}
        </Typography>
      )}

      <Box sx={{ mt: 1 }}>
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
              onClick={() => removeFile(i)}
            >
              削除
            </Button>
          </Box>
        ))}
        <Button
          component="label"
          size="small"
          disabled={loading}
          startIcon={<Icon>attach_file</Icon>}
        >
          ファイルを追加する
          <input
            type="file"
            hidden
            onChange={async (e) => {
              if (e.target.files) {
                setLoading(true);
                const fileKey = v4();
                const file = e.target.files[0];
                const sizeStr = (file.size / 1024).toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                });
                await saveFile(`${scenarioId}/${fileKey}`, file);
                setLoading(false);
                appendFile({
                  id: fileKey,
                  name: `${file.name} size:${sizeStr}KB`,
                });
              }
            }}
          />
        </Button>
        {loading && <CircularProgress />}
      </Box>
    </Box>
  );
};
export default SendOperationEditor;
