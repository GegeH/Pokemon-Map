import logging
import json

from django.shortcuts import render
from django.http import HttpResponse
from db_accessor import get_pokemons_from_db

def pokemons(request):
    # 1. Get longitude latitude info
    north = request.GET["north"]
    south = request.GET["south"]
    west = request.GET["west"]
    east = request.GET["east"]

    # 2. Query database
    result = get_pokemons_from_db(north, south, west, east)

    # 3. Publish crawl job

    return HttpResponse(json.dumps(result))
