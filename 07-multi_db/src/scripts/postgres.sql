CREATE TABLE herois (
    ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    NOME TEXT NOT NULL,
    PODER TEXT NOT NULL
)

insert into herois (NOME, PODER) VALUES
    ('Bakugou katsuki', 'katsu'),
    ('Todoroki Shoto', 'ice and fire'),
    ('Midoriya Izuku', 'On for all')