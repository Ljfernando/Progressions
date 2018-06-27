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

Chords = pd.DataFrame(list(get_table('Chords')), columns=['Song', 'Artist', 'Key', 'Capo', 'Chords'])
Chords['idx'] = Chords.index
@app.route('/', methods=['POST', 'GET'])
def index():
	if request.method == 'GET':
		query = request.args.get("q")
		try:
			return (Chords.to_json(orient='records'))
		except:
			return "Error ocuured!"


if __name__ == '__main__':
  app.run( 
	host="0.0.0.0",
	port=int("5000"),
        threaded=True
  )
