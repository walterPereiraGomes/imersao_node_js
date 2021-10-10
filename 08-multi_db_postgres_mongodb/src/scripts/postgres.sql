CREATE TABLE heroes (
    ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    `name` TEXT NOT NULL,
    `skill` TEXT NOT NULL
)

insert into herois (NOME, PODER) VALUES
    ('Bakugou katsuki', 'katsu'),
    ('Todoroki Shoto', 'ice and fire'),
    ('Midoriya Izuku', 'On for all')