# UltimateGuitarTabs Analysis
In this notebook we scrape the top 1000 most popular tabs posting on https://www.ultimate-guitar.com/

We then analyze the chord progressions to find similar songs.

The scraped data is stored into a MySQL database ('UltimateGuitarTabs') with the following tables:
1. Tab_Data (id, song, artist, is_acoustic, tab_url)
    - id: Unique tab ID 
    - song: Name of song
    - artist: Name of artist
    - is_acoustic: Song is played acoustically (1), otherwise (0)
    - tab_url: URL to tab
2. Artists (name, url)
    - name: Name of artist
    - url: URL to artist profile
3. Hits (id, num_hits, votes, rating)
    - id: Unique tab ID
    - num_hits: # of times tab visited
    - votes: # number of votes received
    - rating: Avg rating out of 5
4. Chords (song, artist, tonality, capo, chords)
    - song: Name of song
    - artist: Name of artist
    - tonality: Original of song
    - capo: Fret to place capo
    - chords: String of full chord progression
    
Scraped on June 5, 2018
