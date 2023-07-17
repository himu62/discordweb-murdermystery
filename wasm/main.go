package main

import (
	"fmt"
	"syscall/js"
)

var hoge int

func add(this js.Value, inputs []js.Value) any {
	if len(inputs) != 1 {
		return 0
	}

	fmt.Println("hello!")

	hoge = hoge + inputs[0].Int()
	return hoge
}

func main() {
	js.Global().Set("add", js.FuncOf(add))
	select {}
}
