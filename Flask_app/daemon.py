import pymysql.cursors
import pandas as pd
import numpy as np
import re
import math
from chord_functions import *
from db_connect import *
from flask import Flask, request, jsonify
from datetime import datetime
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

main_query = "SELECT Chords.id, Song, Artist, Tonality, Capo, Chords, num_hits, votes, rating FROM Chords INNER JOIN Hits ON Chords.id = Hits.id"
Chords = pd.DataFrame(list(exe_query(main_query)), columns=['Id', 'Song', 'Artist', 'Key', 'Capo', 'Chords', 'Num_hits', 'Votes', 'Rating'])
Clean_Chords = pd.DataFrame(list(get_table('Clean_Chords')), columns=['Id','Orig_key', 'Chords'])
states = get_table('States')[0][0].split(',')

@app.route('/', methods=['POST', 'GET'])
def index():
	if request.method == 'GET':
		query = request.args.get("q")
		try:
			return (Chords.to_json(orient='records'))
		except:
			return "Error ocuured!"

@app.route('/sim-by-song/<song_id>', methods=['POST','GET'])
def get_similar_song(song_id):
	if request.method == 'GET':
		query = request.args.get("q")
		try:
			sim_df = get_similar_songs(states, int(song_id), Clean_Chords, Chords)
			return (sim_df.to_json(orient='records'))
		except:
			return "Error occurred!"

@app.route('/sim-by-prog/<chords>', methods=['POST','GET'])
def get_similar_chords(chords):
	if request.method == 'GET':
		query = request.args.get("q")
		try:
			sim_df = get_similar_songs2(states, chords, Clean_Chords, Chords)
			sim_df = sim_df.to_json(orient='records')
			# sim_df[len(sim_df)] = chords
			return (sim_df)
		except:
			return "Error occurred!"

if __name__ == '__main__':
  app.run( 
	host="0.0.0.0",
	port=int("5000"),
        threaded=True
  )
