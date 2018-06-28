import pymysql.cursors

def connect_to_database(db="UltimateGuitarTabs"):
    """
    Connects to MySQL database and 
    returns the connection"""
    db = pymysql.connect(host="localhost",  # your host 
                         user="root",       # username
                         passwd="",     # password
                         db=db)   # name of the database
    return db

def print_table(tableName):
    """
    Prints database table
    """
    db = connect_to_database()
    cur = db.cursor()

    # Select data from table using SQL query.
    cur.execute("SELECT * FROM "+tableName)
    # print the first and second columns      
    for row in cur.fetchall() :
        print(row)
        
def get_table(tableName):
    db = connect_to_database()
    cur = db.cursor()

    # Select data from table using SQL query.
    cur.execute("SELECT * FROM "+tableName)
    
    return(cur.fetchall())

def exe_query(query):
    db = connect_to_database()
    cur = db.cursor()

    cur.execute(query)

    return(cur.fetchall())
