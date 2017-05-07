defmodule Chatty.Repo.Migrations.CreateUser do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :email, :string
      add :auth_provider, :string
      add :name, :string
      add :uid, :string
      add :avatar, :string

      timestamps()
    end

  end
end
