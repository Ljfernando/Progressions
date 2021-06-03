import pandas as pd
import numpy as np
import re
import math
from helper_funcs import *
from flask import Flask, request, jsonify
from datetime import datetime
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

# Create connector to sqlite db
con, cur = create_sqlite_connector()

# Pull main dataframe tables
main_query = """
    SELECT Chords.id
    , Song
    , Artist
    , Tonality
    , Capo
    , Chords
    , num_hits
    , votes
    , rating 
    FROM Chords 
    INNER JOIN Hits ON Chords.id = Hits.id
""" 
Chords = pd.DataFrame(list(exe_query(cur, main_query)),
	columns=['Id', 'Song', 'Artist', 'Key', 'Capo', 'Chords', 'Num_hits', 'Votes', 'Rating'])
Clean_Chords = pd.DataFrame(list(get_table(cur, 'Clean_Chords')),
	columns=['Id','Orig_key', 'Chords'])
Tabs_data = pd.DataFrame(list(get_table(cur, 'Tab_data')),
	columns=['Id', 'Song', 'Artist', 'Is_acoustic', 'Tab_url'])
states = set(([s[0] for s in get_table(cur, 'States')]))
    
@app.route('/', methods=['POST', 'GET'])
def index():
	if request.method == 'GET':
		query = request.args.get("q")
		try:
			return (Chords.to_json(orient='records'))
		except:
			return "Error occurred!"

@app.route('/sim-by-song', methods=['POST','GET'])
def get_similar_song():
	if request.method == 'GET':
		song_id = request.args.get("songid")
		try:
			sim_df = get_similar_songs(states, int(song_id), Clean_Chords, Chords)
			links = get_song_links(song_id, Chords, Tabs_data)

			blob = '{{"dataset":{0},"links":{1}}}'.format(sim_df, links)
			return(blob)
		except:
			return "Error occurred!"

@app.route('/sim-by-prog', methods=['POST','GET'])
def get_similar_chords():
	if request.method == 'GET':
		chords = request.args.get("chords")
		try:
			sim_df, comp_key = get_similar_songs_user_entry(states, chords, Clean_Chords, Chords)

			blob = '{{"dataset":{0},"comp_key":"{1}"}}'.format(sim_df, comp_key)
			return (blob)
		except:
			return "Error occurred!"

if __name__ == '__main__':
  app.run( 
	host="0.0.0.0",
	port=int("5000"),
        threaded=True
  )
