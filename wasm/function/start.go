package function

import (
	"syscall/js"

	"github.com/bwmarrin/discordgo"
)

var session *discordgo.Session

func Start(this js.Value, inputs []js.Value) any {
	if len(inputs) != 1 {
		return jsError("invalid parameters: need to call with (token string)")
	}
	if inputs[0].String() == "" {
		return jsError("token required")
	}

	if session != nil {
		if err := session.Close(); err != nil {
			return jsError("session.Close() failed:", err)
		}
	}

	d, err := discordgo.New("Bot " + "token")
	if err != nil {
		return jsError("discordgo.New() failed:", err)
	}
	session = d

	session.Client
	session.Identify.Properties.OS = "linux"
	session.Identify.Properties.Browser = "disco"
	session.Identify.Properties.Device = "disco"
	session.Identify.Intents = discordgo.IntentGuilds | discordgo.IntentGuildPresences | discordgo.IntentGuildVoiceStates

	c := make(chan map[string]any, 1)
	session.AddHandlerOnce(func(s *discordgo.Session, r *discordgo.Ready) {
		guilds := make([]map[string]string, 0, 5)
		for _, g := range r.Guilds {
			guilds = append(guilds, map[string]string{
				"id":   g.ID,
				"name": g.Name,
			})
		}
		c <- map[string]any{
			"userName": r.Application.Name,
			"guilds":   guilds,
		}
	})
	if err := session.Open(); err != nil {
		return jsError("session.Open() failed:", err)
	}
	return <-c
}
