from flask import Flask, jsonify, request
import os
from google.cloud import vision_v1
from google.cloud.vision import types

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'eighth-azimuth-379620-8d1a7185a1be.json'
