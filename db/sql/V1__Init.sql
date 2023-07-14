CREATE TABLE profile (
    id SERIAL PRIMARY KEY,
    token TEXT NOT NULL CHECK (token <> ''),
    client_id TEXT NOT NULL CHECK (client_id <> ''),
    guild_id TEXT NOT NULL CHECK (guild_id <> ''),
    gm_user_id TEXT NOT NULL CHECK (gm_user_id <> ''),
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMP NOT NULL
);

CREATE FUNCTION updated_stamp() RETURNS trigger AS $$
    BEGIN
        NEW.updated := NOW;
        RETURN NEW;
    END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profile_stamp BEFORE INSERT OR UPDATE ON profile
    FOR EACH ROW EXECUTE FUNCTION updated_stamp();

CREATE TABLE scenario (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL CHECK (name <> ''),
    member_exact INTEGER,
    member_min INTEGER,
    member_max INTEGER,
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMP NOT NULL
);

CREATE TRIGGER scenario_stamp BEFORE INSERT OR UPDATE ON scenario
    FOR EACH ROW EXECUTE FUNCTION updated_stamp();

CREATE TABLE character (
    id SERIAL PRIMARY KEY,
    scenario_id INTEGER NOT NULL REFERENCES scenario(id),
    name TEXT NOT NULL CHECK (name <> ''),
    optional BOOLEAN NOT NULL DEFAULT false,
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMP NOT NULL
);

CREATE TRIGGER character_stamp BEFORE INSERT OR UPDATE ON character
    FOR EACH ROW EXECUTE FUNCTION updated_stamp();

CREATE TABLE scene (
    id SERIAL PRIMARY KEY,
    scenario_id INTEGER NOT NULL REFERENCES scenario(id),
    name TEXT NOT NULL CHECK (name <> ''),
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMP NOT NULL
);

CREATE TRIGGER scene_stamp BEFORE INSERT OR UPDATE ON scene
    FOR EACH ROW EXECUTE FUNCTION updated_stamp();

CREATE TABLE scene_flow (
    scene_id INTEGER NOT NULL REFERENCES scene(id),
    name TEXT NOT NULL CHECK (name <> ''),
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMP NOT NULL
);