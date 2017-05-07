defmodule Chatty.User do
  use Chatty.Web, :model

  schema "users" do
    field :email, :string
    field :auth_provider, :string
    field :name, :string
    field :uid, :string
    field :avatar, :string

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:"email,", :"auth_provider,", :"first_name,", :"last_name,", :avatar])
    |> validate_required([:"email,", :"auth_provider,", :"first_name,", :"last_name,", :avatar])
  end
end
