package function

import "fmt"

func jsError(s ...any) map[string]any {
	return map[string]any{"error": fmt.Sprint(s...)}
}
