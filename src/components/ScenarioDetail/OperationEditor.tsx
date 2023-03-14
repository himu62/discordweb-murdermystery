import {
  Control,
  Controller,
  useFieldArray,
  UseFormRegister,
  useWatch,
} from "react-hook-form";
import { Scenario } from "@/src/store";
import { FC } from "react";
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
import { v4 } from "uuid";

type Props = {
  control: Control<Scenario>;
  register: UseFormRegister<Scenario>;
  onSave: () => void;
  sceneIndex: number;
};

const OperationEditor: FC<Props> = ({
  control,
  register,
  onSave,
  sceneIndex,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `scenes.${sceneIndex}.operations`,
  });
  const operations = useWatch({
    control,
    name: `scenes.${sceneIndex}.operations`,
  });
  const textChannels = useWatch({ control, name: "textChannels" });
  const voiceChannels = useWatch({ control, name: "voiceChannels" });

  const onAppend = () => {
    append({ id: v4(), type: "send" });
    onSave();
  };

  const onRemove = (index: number) => () => {
    remove(index);
    onSave();
  };

  return (
    <Box>
      {fields.map((o, index) => (
        <Box key={o.id} sx={{ m: 1, p: 2, border: 1, borderRadius: 1 }}>
          <Box sx={{ display: "flex" }}>
            <FormControl size="small" sx={{ flexGrow: 1, mr: 1 }}>
              <InputLabel htmlFor={`select-operation-${sceneIndex}-${index}`}>
                オペレーション
              </InputLabel>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select
                    id={`select-operation-${sceneIndex}-${index}`}
                    label="オペレーション"
                    value={value}
                    onChange={(e) => {
                      onChange(e.target.value);
                      onSave();
                    }}
                  >
                    <MenuItem value="send">メッセージ・ファイルの送信</MenuItem>
                    <MenuItem value="permission">チャンネルの権限変更</MenuItem>
                    <MenuItem value="playersToAudience">
                      PLに観戦ロール付与
                    </MenuItem>
                  </Select>
                )}
                name={`scenes.${sceneIndex}.operations.${index}.type`}
              />
            </FormControl>

            <Button
              size="small"
              startIcon={<Icon>delete</Icon>}
              color="error"
              onClick={onRemove(index)}
            >
              削除
            </Button>
          </Box>

          {operations[index]?.type === "send" && (
            <Box sx={{ mx: 1, mt: 2, mb: 0 }}>
              <FormControl size="small" fullWidth sx={{ mb: 2 }}>
                <InputLabel
                  htmlFor={`select-operation-send-${sceneIndex}-${index}`}
                >
                  送信先のチャンネル
                </InputLabel>
                <Select
                  id={`select-operation-send-${sceneIndex}-${index}`}
                  label="送信先のチャンネル"
                  fullWidth
                  value={""}
                >
                  {textChannels.map((c) => (
                    <MenuItem key={c.id} value={c.id}>
                      {c.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="送信するテキスト"
                multiline
                size="small"
                fullWidth
                minRows={2}
                maxRows={10}
                sx={{ mb: 2 }}
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
          )}

          {operations[index]?.type === "permission" && <Box></Box>}

          {operations[index]?.type === "playersToAudience" && <Box></Box>}
        </Box>
      ))}
      <Box>
        <Button size="small" startIcon={<Icon>add</Icon>} onClick={onAppend}>
          オペレーションを追加する
        </Button>
      </Box>
    </Box>
  );
};
export default OperationEditor;
