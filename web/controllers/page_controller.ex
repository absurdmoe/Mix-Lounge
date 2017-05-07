defmodule Chatty.PageController do
  use Chatty.Web, :controller

<<<<<<< HEAD
  def index(conn, params) do
=======
  plug Ueberauth

  def index(conn, _params) do
>>>>>>> dafdd89c5bdb07e9a59ea5326a2a51ebc7aee7e1
    render conn, "index.html"
  end

end
