from pymongo import MongoClient

# Connect to MongoDB (default localhost and port)
client = MongoClient("mongodb://localhost:27017/")

# Create or access a database
db = client["auth_db"]

# Create or access a collection
collection = db["users"]
