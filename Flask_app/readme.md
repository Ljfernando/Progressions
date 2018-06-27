#Indexing and Searching using ElasticSearch and Redis
The sample project describes the use of ElasticSearch and Redis db server to index and search key value pair.
<br>
A simple frontend is also developed using Bootstrap3 and Jquery. 
<br>
The request sent from the HTML is listened by a Python script running in background which is implemented using Flask.
<br>
It identifies the route and executes the respective function and sends the response back to HTML in string or JSON format depending on POST and GET method repectively.

For executing this project you need
<ul>
<li> ElasticSearch installed and running on port 9200
<li> Redis installed and running on port 6379
<li> sudo -E pip install -r requirements.txt
</ul>

Steps to run
<ul>
<li> Execute python daemon
<li> Run index.html on a bootstrap supported browser
</ul>
