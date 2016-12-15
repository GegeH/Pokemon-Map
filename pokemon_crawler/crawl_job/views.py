import logging

from django.shortcuts import render
from django.http import HttpResponse

logger = logging.getLogger("worker")


# Create your views here.

def add_crawl_point(request):
    logger.info("Im in add_crawl_point")
    return HttpResponse("Result")
