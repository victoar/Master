from flask_cors import CORS
from flask import Flask, request, render_template, jsonify
import pandas as pd
from sklearn.preprocessing import OrdinalEncoder
from sklearn.linear_model import LinearRegression, LogisticRegression
from sklearn.cluster import KMeans


app = Flask(__name__)

CORS(app)

df = None
models = {}

@app.route('/api/upload', methods=['POST'])
def upload_file():
    global df, models
    models = {}
    file = request.files['file']
    df = pd.read_csv(file)
    rows, columns = df.shape
    headers = df.columns.tolist()
    return jsonify({'rows': rows, 'columns': columns, 'headers': headers})

@app.route('/api/columns', methods=['GET'])
def get_columns():
    # Get the column names and their data types
    global df
    columns_info = df.dtypes.reset_index()
    columns_info.columns = ['column_name', 'data_type']
    columns_info['data_type'] = columns_info['data_type'].astype(str)
    columns_dict = columns_info.to_dict(orient='records')
    return jsonify(columns_dict)

@app.route('/api/first/<int:num_rows>', methods=['GET'])
def get_first_rows(num_rows):
    global df
    # Get the first N rows of the dataset
    rows = df.head(num_rows).to_dict(orient='records')
    return jsonify({'data': rows})

@app.route('/api/last/<int:num_rows>', methods=['GET'])
def get_last_rows(num_rows):
    global df
    # Get the first N rows of the dataset
    rows = df.tail(num_rows).to_dict(orient='records')
    return jsonify({'data': rows})

@app.route('/api/describe', methods=['GET'])
def get_describe():
    global df
    # Get basic statistics of the dataset
    describe_data = df.describe().reset_index()
    headers = describe_data.columns.to_list()
    describe_dict = describe_data.to_dict(orient='records')
    return jsonify({'headers': headers, 'data': describe_dict})

@app.route('/api/cleaning', methods=['GET'])
def drop_na():
    global df
    df.dropna(inplace=True)
    rows, columns = df.shape
    return jsonify({'rows': rows, 'columns': columns})

@app.route('/api/transform', methods=['POST'])
def transform():
    global df
    if df is not None:
        df = pd.get_dummies(df)

    categorical_columns = request.json['categorical_columns']
    encoder = OrdinalEncoder()
    df[categorical_columns] = encoder.fit_transform(df[categorical_columns])
    return jsonify({'message': 'Data normalized successfully'})


@app.route('/api/train', methods=['POST'])
def train_model():
    global df, models
    model_type = request.json['model_type']
    features = request.json['features']
    target = request.json['target']
    X = df[features]

    if model_type == 'regression':
        y = df[target]
        model = LinearRegression()
        model.fit(X, y)
    elif model_type == 'classification':
        y = df[target]
        model = LogisticRegression()
        model.fit(X, y)
    elif model_type == 'clustering':
        model = KMeans(n_clusters=int(target), init="k-means++")
        X['category'] = model.fit_predict(X)
    else:
        return jsonify({'error': 'Invalid model type'})

    models[model_type] = model
    return jsonify({'message': 'Model trained successfully'})

@app.route('/api/predict', methods=['POST'])
def get_prediction():
    # Get basic statistics of the dataset
    model_type = request.json['model_type']
    try:
        model = models[model_type]
    except KeyError:
        return jsonify({'predicted_value': 'Model not trained'})
    features = request.json['features']
    print(features)
    X_new = pd.DataFrame([features])
    print(X_new)
    predicted_value = model.predict(X_new)
    print(predicted_value)
    if(model_type == 'clustering'):
        return jsonify({'predicted_value': str(predicted_value[0])})
    return jsonify({'predicted_value': predicted_value[0]})

if __name__ == '__main__':
    app.run(debug=True)
