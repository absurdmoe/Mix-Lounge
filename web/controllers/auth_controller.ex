defmodule Chatty.AuthController do
  use Chatty.Web, :controller
  plug Ueberauth

  alias Ueberauth.Strategy.Helpers

  def delete(conn, _params) do
    conn
    |> put_flash(:info, "You have been logged out!")
    |> configure_session(drop: true)
    |> redirect(to: "/")
  end

  def callback(%{assigns: %{ueberauth_failure: _fails}} = conn, _params) do
    conn
    |> put_flash(:error, "Failed to authenticate.")
    |> redirect(to: "/")
  end

  def callback(%{assigns: %{ueberauth_auth: auth}} = conn, params) do

        conn
        |> put_flash(:info, "Successfully authenticated.")
        |> redirect(to: "/#{auth.info.name}")

        IO.inspect auth.info.name
        IO.inspect auth.info.image
        IO.inspect auth.info.email
        IO.puts "foobar"

  end
end
