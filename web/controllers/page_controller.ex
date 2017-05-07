defmodule Chatty.PageController do
  use Chatty.Web, :controller

  def index(conn, params) do
    render conn, "index.html"
  end

end
