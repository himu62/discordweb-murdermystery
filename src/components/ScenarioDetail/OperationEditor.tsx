import { Control, Controller, useFieldArray, useWatch } from "react-hook-form";
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
} from "@mui/material";
import { v4 } from "uuid";
import SendOperationEditor from "@/src/components/ScenarioDetail/SendOperationEditor";

type Props = {
  control: Control<Scenario>;
  onSave: () => void;
  sceneIndex: number;
};

const OperationEditor: FC<Props> = ({ control, onSave, sceneIndex }) => {
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
            <SendOperationEditor
              control={control}
              sceneIndex={sceneIndex}
              opsIndex={index}
            />
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
