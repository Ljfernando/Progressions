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
Chords = pd.DataFrame(list(exe_query(main_query)), columns=['id', 'Song', 'Artist', 'Key', 'Capo', 'Chords', 'num_hits', 'votes', 'rating'])
print(Chords.dtypes)
@app.route('/', methods=['POST', 'GET'])
def index():
	if request.method == 'GET':
		query = request.args.get("q")
		try:
			return (Chords.to_json(orient='records'))
		except:
			return "Error ocuured!"

@app.route('/similar-songs/<song_id>', methods=['POST','GET'])
def get_similar(song_id):
	if request.method == 'GET':
		query = request.args.get("q")
		try:
			print(song_id)
			return (Chords.to_json(orient='records'))
		except:
			return "Error ocuured!"
if __name__ == '__main__':
  app.run( 
	host="0.0.0.0",
	port=int("5000"),
        threaded=True
  )
