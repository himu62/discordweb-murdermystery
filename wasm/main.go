package main

import (
	"fmt"
	"syscall/js"

	"github.com/himu62/discordweb-murdermystery/wasm/function"
)

func ping(this js.Value, inputs []js.Value) any {
	fmt.Println("pong")
	return nil
}

func main() {
	js.Global().Set("add", js.FuncOf(ping))
	js.Global().Set("start", js.FuncOf(function.Start))
	select {}
}
