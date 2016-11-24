import time
import psycopg2


def get_pokemons_from_db(north, south, west, east):
	# 1. Open connection
    conn = psycopg2.connect(host = "pokemondb.cmbjwgmj5nhq.us-west-2.rds.amazonaws.com",
							port = 5432,
							user = "pokemondb",
							password = "pokemondb",
							database = "pokemondb")

	# 2. Execute SQL
    with conn.cursor() as cur:
        cur.execute("SELECT expire, pokemon_id, latitude, longitude" + 
                    " FROM pokemon_map " + 
                    " WHERE longitude > %s" +
                    " AND longitude < %s" +
                    " AND latitude > %s" +
                    " AND latitude < %s" +
                    " AND expire > %s" +
                    " LIMIT 100", 
                    (west, east, south, north, time.time() * 1000))
        rows = cur.fetchall()
        result = []
        for row in rows:
            print row
            result.append({
                            "expire" : row[0],
                            "pokemon_id" : row[1],
                            "latitude" : row[2],
                            "longitude" : row[3]
                          })


	# 3. Connection  commit
	conn.commit()
    return result
