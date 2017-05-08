defmodule Users.Repo.Migrations.CreatePeople do
  use Ecto.Migration

  def change do
    create table(:people) do
      add :email, :string
      add :auth_provider, :string
      add :name, :string
      add :uid, :string
      add :avatar, :string
    end
  end
end
