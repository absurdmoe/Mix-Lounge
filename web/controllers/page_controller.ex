defmodule Chatty.PageController do
  use Chatty.Web, :controller

  plug Ueberauth

  def index(conn, _params) do
    render conn, "index.html"
  end
  def login(conn, _params) do
    render conn, "login.html"
  end
end
