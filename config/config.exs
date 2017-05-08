# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

config :chatty, Users.Repo,
  adapter: Ecto.Adapters.Postgres,
  database: "chatty_repo",

  username: "minimoe",
  password: "",
  hostname: "localhost"


# General application configuration
config :chatty,
  ecto_repos: [Chatty.Repo]

config :chatty,
    ecto_repos: [Users.Repo]

config :ueberauth, Ueberauth,
  providers: [
    facebook: {Ueberauth.Strategy.Facebook, []}
  ]

config :ueberauth, Ueberauth.Strategy.Facebook.OAuth,
  client_id: System.get_env("FACEBOOK_CLIENT_ID"),
  client_secret: System.get_env("FACEBOOK_CLIENT_SECRET")

# Configures the endpoint
config :chatty, Chatty.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "ZqgsLouhUZLQjIUfb3yPEEePhYi6Rh7DFoq5AY+gMY5kc7nNYe4e9f5rP1VAV2oe",
  render_errors: [view: Chatty.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Chatty.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
