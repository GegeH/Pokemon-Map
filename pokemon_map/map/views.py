import logging
import json

from django.shortcuts import render
from django.http import HttpResponse

def pokemons(request):
    return HttpResponse("Charmander")
