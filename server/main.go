package main

import (
	"github.com/bwmarrin/discordgo"
	"golang.org/x/tools/go/analysis/passes/slog"
)

func openWS() error {
	s, err := discordgo.New("Bot " + "token")
	if err != nil {
		return err
	}

	s.Identify.Intents |= discordgo.IntentGuilds
	s.Identify.Intents |= discordgo.IntentGuildPresences
	s.Identify.Intents |= discordgo.IntentGuildVoiceStates

	return s.Open()
}

func main() {
	if err := openWS(); err != nil {
		slog.Error(err)
	}
}
