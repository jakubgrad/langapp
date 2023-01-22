import os
import PyPDF2
from read_pdf import pdftojson
from fetch_word import give_definition
from flask import *
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy




file_path = os.path.abspath(os.getcwd())+"\database.db"
 
app = Flask(__name__)


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///'+file_path
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy()
db.init_app(app)

@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  response.headers.add('Access-Control-Allow-Credentials', 'true')
  return response

class ContactModel(db.Model):
    __tablename__ = "table234"
 
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), unique=True)
    word = db.Column(db.String(), unique=False)
 
    def __init__(self, name, word):
        
        self.name = give_definition(name)
        self.word = word
        

    def __repr__(self):
        return f"{self.name}"


@app.route('/ping')
def ping():
    return ('{batchcomplete: "",query: {pages: {264850: {pageid: 264850,ns: 0,title: "muki"}}}}')


@app.route('/data.json')
def data():
    return pdftojson(), 201
    #return jsonify(str(pdftojson()).replace("'",'"')), 201


@app.before_first_request
def create_table():
    db.create_all()

@app.route('/data/create' , methods = ['GET','POST'])
def create():
    if request.method == 'GET':
        return jsonify({"success": True, "message": "this is the create endpoint"}), 201
 
    if request.method == 'POST':
        #try
        request_data = json.loads(request.data)
        name = request_data['name']
        word = request_data['word']
        contact = ContactModel(name=name, word=word)
        db.session.add(contact)
        db.session.commit()
        return jsonify({"success": True, "message": "contact added successfully"}), 201 
        #except: 
        #    return jsonify({"success": True, "message": "already in database"}), 201 
        

        

def contact_serializer(contact):
    return {'name': contact.name, 'word': contact.word}

@app.route('/data')
def retrieveDataList():
    return jsonify([*map(contact_serializer, ContactModel.query.all())])


@app.route('/data/delete', methods=['GET','POST'])
def delete():
    request_data = json.loads(request.data)
    name = request_data['name']
    contact = ContactModel.query.filter_by(name=name).first()
    if request.method == 'POST':
        if contact:
            db.session.delete(contact)
            db.session.commit()
            return jsonify({"success": True, "message": "Contact deleted successfully"}), 201
        abort(404)
 
    return jsonify({"success": True}), 201


if __name__ == '__main__':
    app.run()