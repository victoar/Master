import psycopg2 as psycopg2
from flask import Flask,jsonify
from flask_cors import CORS
import psycopg2
import json
from sqlalchemy import create_engine
from sqlalchemy.orm import Session

app = Flask(__name__)
# app.json_encoder = CustomJSONEncoder

CORS(app)

# Database connection parameters
conn = psycopg2.connect(
    host='localhost',
    port='5432',
    database='victor_cv',
    user='postgres',
    password= 'postgres'
)
# for creating connection string
# Create a SQLAlchemy engine to connect to the database
# engine = create_engine(f'postgresql+psycopg2://{db_params["user"]}:{db_params["password"]}@{db_params["host"]}:{db_params["port"]}/{db_params["database"]}')

cur = conn.cursor()

# cur.execute("""
#     CREATE TABLE IF NOT EXISTS HomePage (
#         DESCRIPTION TEXT
#     )
# """)
# cur.execute("""
#     CREATE TABLE IF NOT EXISTS Education (
#         TITLE TEXT,
#         SUBTITLE TEXT,
#         DESCRIPTION TEXT[]
#     )
# """)

# cur.execute("""
#     CREATE TABLE IF NOT EXISTS WorkExperience (
#         TITLE TEXT,
#         SUBTITLE TEXT,
#         DESCRIPTION TEXT[]
#     )
# """)

# cur.execute("""
#     CREATE TABLE IF NOT EXISTS Projects (
#         TITLE TEXT,
#         SUBTITLE TEXT,
#         DESCRIPTION TEXT[],
#         URL TEXT
#     )
# """)
# cur.execute("""
#     CREATE TABLE IF NOT EXISTS HobbiesPage (
#         TITLE TEXT,
#         DESCRIPTION TEXT,
#         IMG_LIST TEXT[]
#     )
# """)

# with open('data.json') as f:
#     data = json.load(f)
#
#
# personal_info_data = data['PERSONAL_INFO']
# education = personal_info_data['EDUCATION']
# for key, value in education.items():
#     print(key)
#     print(value)
#     cur.execute("""
#         INSERT INTO Education (TITLE, SUBTITLE, DESCRIPTION)
#         VALUES (%s, %s, %s)
#     """, (value['TITLE'], value['SUBTITLE'], value['DESCRIPTION']))
#
# for key, value in personal_info_data['WORK_EXPERIENCE'].items():
#     cur.execute("""
#         INSERT INTO WorkExperience (TITLE, SUBTITLE, DESCRIPTION)
#         VALUES (%s, %s, %s)
#     """, (value['TITLE'], value['SUBTITLE'], value['DESCRIPTION']))
#
# for key, value in personal_info_data['PROJECTS'].items():
#     cur.execute("""
#         INSERT INTO Projects (TITLE, SUBTITLE, DESCRIPTION, URL)
#         VALUES (%s, %s, %s, %s)
#     """, (value['TITLE'], value['SUBTITLE'], value['DESCRIPTION'], value['URL']))

# # HobbiesPage data insertion
# hobbies_data = data['HOBBIES']
# for key, value in hobbies_data.items():
#     cur.execute("""
#         INSERT INTO HobbiesPage (TITLE, DESCRIPTION, IMG_LIST)
#         VALUES (%s, %s, %s)
#     """, (value['TITLE'], value['DESCRIPTION'], value['IMG_LIST']))


# conn.commit()

#Define routes
@app.route('/home')
def home():
    cur.execute("SELECT * FROM HomePage")
    data = cur.fetchall()
    title = ''
    paragraphs = []
    ok = 0
    for row in data:
        if ok == 0:
            title = row
            ok = 1
        else:
            paragraphs.append(row)
    return jsonify(
        {
            'title': title,
            'paragraphs': paragraphs
        }
    )

@app.route('/personal-info')
def personal_info():
    cur.execute("SELECT * FROM Education")
    data_education = cur.fetchall()

    cur.execute("SELECT * FROM WorkExperience")
    data_work_experience = cur.fetchall()

    cur.execute("SELECT * FROM Projects")
    data_projects = cur.fetchall()

    education_list = []
    for row in data_education:
        education = {
            'title': row[0],
            'subtitle': row[1],
            'description': row[2]
        }
        education_list.append(education)

    work_experience_list = []
    for row in data_work_experience:
        work_experience = {
            'title': row[0],
            'subtitle': row[1],
            'description': row[2]
        }
        work_experience_list.append(work_experience)

    projects_list = []
    for row in data_projects:
        project = {
            'title': row[0],
            'subtitle': row[1],
            'description': row[2],
            'url': row[3]
        }
        projects_list.append(project)

    return jsonify(
        {'education': education_list,
         'work_experience': work_experience_list,
         'projects': projects_list}
    )

@app.route('/hobbies')
def hobbies():
    cur.execute("SELECT * FROM HobbiesPage")
    data = cur.fetchall()
    hobbies_list = []
    for row in data:
        hobby = {
            'title': row[0],
            'description': row[1],
            'img_list': row[2]
        }
        hobbies_list.append(hobby)
    return jsonify(hobbies_list)

if __name__ == '__main__':
    app.run(debug=True)