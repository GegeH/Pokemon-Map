import psycopg2

def add_pokemon_to_db(encounter_id, expire, pokemon_id, latitude, longitude):
	# 1. Open connection
    conn = psycopg2.connect(host = "pokemondb.cmbjwgmj5nhq.us-west-2.rds.amazonaws.com",
							port = 5432,
							user = "pokemondb",
							password = "pokemondb",
							database = "pokemondb")

	# 2. Execute SQL
	with conn.cursor() as cur:
		cur.execute("INSERT INTO pokemon_map (encounter_id, expire, pokemon_id, latitude, longitude)" + 
					" VALUES (%s, %s, %s, %s, %s)" +
					" ON CONFLICT (encounter_id) DO NOTHING", (encounter_id, expire, pokemon_id, latitude, longitude))

	# 3. Connection  commit
	conn.commit()
	return
